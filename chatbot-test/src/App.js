import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ChatGptAPI from "./ChatGptAPI";

function App() {
  const [query, setQuery] = useState("");
  const [benefits, setBenefits] = useState('');
  const [answer, setAnswer] = useState([]);
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
    setBenefits('');
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
            // filter: {
            //   document_id: "7be70c9c-14a1-445b-8ca4-4329a96db23d",
            // },
            top_k: 15,
          },
        ],
      })
      .then((response) => {
        console.log(response);
        // 배열 데이터를 하나의 문자열로 변환
        let answerString = "";
        for (let i = 0; i < response.data.results[0].results.length; i++) {
          let newline = response.data.results[0].results[i].text;
          answerString += newline;
          if (i !== response.data.results[0].results.length - 1) {
            answerString += "\n";
          }
        }
        setBenefits(answerString);
        console.log(answerString);
      });
  };

  useEffect(() => {
    if (benefits === '' || !isGptAPI) return;
    console.log('챗지피티 API 요청')
    ChatGptAPI(query, benefits, category).then((response) => {
      setAnswer(response);
      console.log(response);
      answerTimer.current && clearInterval(answerTimer.current);
    });
  }, [benefits]);

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
      <pre>
        {benefits}
      </pre>
      <hr/>
      {isGptAPI && <div>
        <h1>챗지피티 답변</h1>
        <p>요청 시간: {answerTime}</p>
        <p>{answer}</p>
      </div>}
    </div>
  );
}

export default App;
