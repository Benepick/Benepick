import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState([]);

  const onChangeQuery = (e) => {
    setQuery(e.target.value);
  };

  const onClickRequest = () => {
    axios
      .post("http://localhost:3333/query", {
        queries: [
          {
            query: query,
            top_k: 3,
          },
        ],
      })
      .then((response) => {
        console.log(response);
        setAnswer(response.data.results[0].results);
      });
  };

  return (
    <div className="App">
      <div>
        <input onChange={onChangeQuery} value={query} />
        <button onClick={onClickRequest}>요청</button>
      </div>
      <div>
        {answer.map((item, index) => (
          <li key={index}>
            {item.text} | {item.score}
          </li>
        ))}
      </div>
    </div>
  );
}

export default App;
