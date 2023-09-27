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
  const [category, setCategory] = useState('카드');

  // 장소 검색
  const [prompt, setPrompt] = useState('');

  const onChangeQuery = (e) => {
    setQuery(e.target.value);
  };

  // 검색 요청
  const onClickRequest = async () => {
    setCards('');
    setAnswer([]);
    setAnswerTime(0);
    if (query.trim() === "") return;

    if (category === '카드') {
      axios
        .post("http://localhost:3333/query", {
          queries: [
            {
              query: query,
              filter: {
                author:"cardname"
              },
              top_k: 2,
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
            // 카드 이름 설정
            answers.current.push(newAnswer);
          }
          setCards(Array.from(answers.current, (x) => x[0]));
          console.log(answers);
        });
    }
    // 장소 검색
    else {
      // 타이머 시작
      answerTimer.current = setInterval(() => {
        setAnswerTime((prev) => prev + 1);
      }, 1000);

      let benefits = [];
      const response = await axios.post("http://localhost:3333/query", {
          queries: [
            {
              query: query,
              filter: {
                author:"benefit"
              },
              top_k: 10,
            },
          ],
        });

      for (let benefit of response.data.results[0].results) {
        benefits.push({
          cardname: benefit.metadata.source_id, 
          benefit: benefit.text,
          benefitId: benefit.metadata.document_id});
      }
      console.log(benefits)

      answers.current = benefits;
      setAnswer(Array.from(answers.current, (x) => x));

      // generate(query, benefits, category, setText);
      answerTimer.current && clearInterval(answerTimer.current);
    }
  };

  useEffect(() => {
    if (cards === '') return;

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
    answerTimer.current && clearInterval(answerTimer.current);
  }, [cards]);

  // 카드 혜택 정보 요청
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
      newlines.push({
        id: response.data.results[0].results[i].metadata.document_id, 
        text: response.data.results[0].results[i].text,
      });
    }
    console.log(newlines);
    return newlines;
  }

  // (사용 x) 카드 이름 클릭 시 카드 혜택 정보 요청
  const handleClickCardName = (e) => {
    console.log(e.target.innerText);
    let cardname = e.target.innerText;
    retrieveCardBenefits(cardname);
  }

  // 가맹점 정보 요청
  const searchBenefit = async (card) => {
    const detail = await retrieveCardDetails(card.cardname, card.benefitId);

    console.log(detail);
  }

  const onClickBenefit = async (benefits, idx) => {
    const cardname = benefits[0];
    const benefitId = benefits[1][idx].id;

    const results = await retrieveCardDetails(cardname, benefitId);

    benefits[2][idx] = results;
    setAnswer(Array.from(answers.current, (x) => x));
  }

  // 카드 혜택 상세 정보 요청
  const retrieveCardDetails = async (cardname, benefitId) => {

    // 카드 혜택 상세 (요약)정보 요청
    const response = await axios
      .get("http://localhost:3333/cardBenefits/summary/"+ cardname + "/" + benefitId);

    console.log(response);
    let results = '';

    if (response.data.length !== 0) {
      results = response.data;
    }

    else {
      console.log("요약 없음");
      const response2 =  await axios.get("http://localhost:3333/cardBenefits/" + cardname + "/" + benefitId);
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
        benefitId: benefitId,
        content: results
      }).then((response) => {
        console.log(response);
      });
    }

    return results;
  }

  return (
    <div className="App">
      <div>
        <input onChange={onChangeQuery} value={query} />
        <button onClick={onClickRequest}>요청</button> <br/>
        <div>
          <label><input type="radio" name="category" value="카드" onChange={(e) => {setAnswer([]); setCategory(e.target.value)}} checked={category === '카드'}/>카드</label>
          <label><input type="radio" name="category" value="장소" onChange={(e) => {setAnswer([]); setCategory(e.target.value)}} checked={category === '장소'}/>장소</label>
        </div>
      </div>
      {cards && cards.map((benefit, index) => {
        return <li key={index}><a onClick={handleClickCardName}>{benefit}</a></li>;
      })}
      <hr/>
      {category === '카드' ? 
      (<div>
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
                return <li onClick={() => onClickBenefit(benefits, index)} key={index}>{benefit.text}</li>;
              })}
              <hr></hr>
              {benefits[2] && benefits[2].map((detail, index) => {
                return <p key={index}>{detail}</p>;
              })}
            </div>
          );
        })}
      </div>)
      : // 장소 검색
      (<div>
        <div>
          <h1>챗지피티 답변</h1>
          <p>요청 시간: {answerTime}</p>
        </div>
        {/* gpt답변 */}
        <div>{prompt}</div>
        {answer && answer.map((card, index) => {
          return (
          <div key={index}>
            <h2>{card.cardname}</h2>
            <p>{card.benefit}</p>
            <button onClick={(e) => {searchBenefit(card)}}>상세보기</button>
            
          </div>);
        })}
      </div>)
      }
    </div>
  );
}

export default App;
