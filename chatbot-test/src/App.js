import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import generate, {summary} from "./ChatGptAPI";
// import MarkdownRenderer from './MarkdownRenderer';

function App() {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState([]);
  const [answer, setAnswer] = useState([]);
  const answers = useRef([]);
  const [answerTime, setAnswerTime] = useState(0);
  const answerTimer = useRef(null);
  const [isGptAPI, setIsGptAPI] = useState(false);
  const [category, setCategory] = useState('카드');

  const onChangeGptAPI = (e) => {
    setIsGptAPI(e.target.checked);
  };

  const onChangeQuery = (e) => {
    setQuery(e.target.value);
  };

  const onClickRequest = () => {
    setCards('');
    setAnswer([]);
    setAnswerTime(0);
    if (isGptAPI) {
      answerTimer.current = setInterval(() => {
        setAnswerTime((prev) => prev + 1);
      }, 1000);
    }
    axios
      .post("http://localhost:3333/query", {
        queries: [
          {
            query: query,
            filter: {
              source_id:"cardname"
            },
            top_k: 1,
          },
        ],
      })
      .then((response) => {
        console.log(response);
        answers.current = [];
        for (let i = 0; i < response.data.results[0].results.length; i++) {
          let newAnswer = [];
          let cardname = response.data.results[0].results[i].text;
          newAnswer.push(cardname);
          answers.current.push(newAnswer);
        }
        setCards(Array.from(answers.current, (x) => x[0]));
        console.log(answers);
      });
  };

  useEffect(() => {
    if (cards === '' || !isGptAPI) return;

    if (category === '카드') {
      const getCardBenefits = async () => {
        for (let i = 0; i < cards.length; i++) {
          console.log(cards[i]);
          answers.current[i].push( await retrieveCardBenefits(cards[i]));
          answers.current[i].push( Array.from({ length: answers.current[i][1].length }, () => '') );
          console.log(Array.from(answers.current, (x) => x));
          setAnswer(Array.from(answers.current, (x) => x));
        }
      }

      getCardBenefits();
    }
    else {
      generate(query, cards, category, setAnswer).then((response) => {
        console.log(response);
      });
    }
    
    answerTimer.current && clearInterval(answerTimer.current);
  }, [cards]);

  const retrieveCardBenefits = async (cardname) => {
    const response = await axios
      .post("http://localhost:3333/query", {
        queries: [
          {
            query: cardname,
            filter: {
              source_id: cardname,
              author: "benefit"
            },
            top_k: 10,
          },
        ],
      });
    
    console.log(response);
    let newlines = [];
    for (let i = 0; i < response.data.results[0].results.length; i++) {
      newlines.push(response.data.results[0].results[i].text + '\n');
    }
    console.log(newlines);
    return newlines;
  }

  const handleClickCardName = (e) => {
    console.log(e.target.innerText);
    let cardname = e.target.innerText;
    retrieveCardBenefits(cardname);
  }

  const retrieveCardDetails = async (benefits, idx) => {
    const cardname = benefits[0];
    const response = await axios
      .get("http://localhost:3333/cardBenefits/summary/"+ cardname + "/" + idx);

    console.log(response);
    let results = '';

    if (response.data.length !== 0) {
      results = response.data;
    }

    else {
      console.log("요약 없음");
      const response2 =  await axios.get("http://localhost:3333/cardBenefits/" + cardname + "/" + idx);
      console.log(response2);
      if (response2.status !== 200) {
        console.log("Error: ", response2.data.error);
        return "";
      }

      // 요약해서 저장
      const response3 = await summary(response2.data);
      console.log(response3);
      results = response3;

      axios.post("http://localhost:3333/cardBenefits/summary/", {
        cardName: cardname,
        idx: idx,
        content: results
      }).then((response) => {
        console.log(response);
      });
    }

    benefits[2][idx] = results;
    setAnswer(Array.from(answers.current, (x) => x));

    return results;
  }

  return (
    <div className="App">
      <div>
        <input onChange={onChangeQuery} value={query} />
        <button onClick={onClickRequest}>요청</button> <br/>
        <label>챗지피티 API 사용<input type="checkbox" value={isGptAPI} onChange={onChangeGptAPI} /></label>
        {isGptAPI && <div>
          <label><input type="radio" name="category" value="카드" onChange={(e) => setCategory(e.target.value)} checked={category === '카드'}/>카드</label>
          <label><input type="radio" name="category" value="장소" onChange={(e) => setCategory(e.target.value)} checked={category === '장소'}/>장소</label>
        </div>}
      </div>
      {cards && cards.map((benefit, index) => {
        return <li key={index}><a onClick={handleClickCardName}>{benefit}</a></li>;
      })}
      <hr/>
      {isGptAPI && <div>
        <h1>챗지피티 답변</h1>
        <p>요청 시간: {answerTime}</p>
        {answer && answer.map((benefits, index) => {
          return (
            <div key={index}>
              <h2>{benefits[0]}</h2>
              {/* {benefits[1].map((benefit, index) => {
                return <li key={index}>{benefit}</li>;
              })} */}
              {benefits[1] && benefits[1].map((benefit, index) => {
                return <li onClick={() => retrieveCardDetails(benefits, index)} key={index}>{benefit}</li>;
              })}
              <hr></hr>
              {benefits[2] && benefits[2].map((detail, index) => {
                return <p>{detail}</p>;
              })}
            </div>
          );
        })}
      </div>}
    </div>
  );
}

export default App;
