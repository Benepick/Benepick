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
            // filter: {
            //   document_id: "7be70c9c-14a1-445b-8ca4-4329a96db23d",
            // },
            top_k: 10,
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
          <span>
            {item.text} <br></br>
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;
