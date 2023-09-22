import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import generate from "./ChatGptAPI";

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
              // document_id: "7be70c9c-14a1-445b-8ca4-4329a96db23d",
              source_id:"cardname"
            },
            top_k: 5,
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
              source_id: cardname
            },
            top_k: 10,
          },
        ],
      });
    
    console.log(response);
    let newlines = '';
    for (let i = 0; i < response.data.results[0].results.length; i++) {
      newlines += response.data.results[0].results[i].text + '\n';
    }
    console.log(newlines);
    return newlines;
  }

  const handleClickCardName = (e) => {
    console.log(e.target.innerText);
    let cardname = e.target.innerText;
    retrieveCardBenefits(cardname);
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
              <pre>{benefits[1]}</pre>
            </div>
          );
        })}
      </div>}
    </div>
  );
}

export default App;
