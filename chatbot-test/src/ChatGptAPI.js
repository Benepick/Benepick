import axios from "axios";

export const generate = async (query, benefits, category) => {

  const API_URL = "https://api.openai.com/v1/chat/completions";
  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  const conversation = [
    // { role: 'system', content: '주어진 정보를 바탕으로 카드 혜택 정보를 항목별로 요약해줘'},
    { role: 'system', content: '아래 정보를 바탕으로 질문에 정해진 양식으로 답변해줘'},
    { role: 'user', content: '카드 혜택 정보:\n' + benefits},
    { role: 'user', content: '양식: ' + '카드이름\n  1. 카드혜택 1\n  2. 카드혜택 2'},
    { role: "user", content: '\n\n' + category + ' ' + '질문: ' + query},
  ];

  
  try {
    // Fetch the response from the OpenAI API with the signal from AbortController
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        messages: conversation,
        max_tokens: 100,
        temperature: 0.1,
        model: "gpt-3.5-turbo-0613",
        stream: true,
      }),
    });
    
    // Read the response as a stream of data
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    // resultText.innerText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      // Massage and parse the chunk of data
      const chunk = decoder.decode(value);
      const lines = chunk.split("\\n");
      console.log(lines);
      const parsedLines = lines[0]
        .map((line) => {
          console.log(JSON.parse(line.replace(/^data: /, "").trim()));
          JSON.parse(line.replace(/^data: /, "").trim())
        }) // Remove the "data: " prefix
        .filter((line) => line !== "" && line !== "[DONE]") // Remove empty lines and "[DONE]"
        .map((line) => JSON.parse(line)); // Parse the JSON string

      for (const parsedLine of parsedLines) {
        const { choices } = parsedLine;
        const { delta } = choices[0];
        const { content } = delta;
        // Update the UI with the new content
        if (content) {
          // resultText.innerText += content;
          console.log(content);
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
  //   // Handle fetch request errors
  //   if (signal.aborted) {
  //     resultText.innerText = "Request aborted.";
  //   } else {
  //     console.error("Error:", error);
  //     resultText.innerText = "Error occurred while generating.";
  //   }
  // } finally {
  //   // Enable the generate button and disable the stop button
  //   generateBtn.disabled = false;
  //   stopBtn.disabled = true;
  //   controller = null; // Reset the AbortController instance
  }
};

export default async function ChatGptAPI(query, benefits, category) {

  // // benefit 배열을 단일문자열로 변환
  // let benefitString = "";
  // for (let i = 0; i < benefits.length; i++) {
  //   benefitString += benefits[i];
  //   if (i !== benefits.length - 1) {
  //     benefitString += ", ";
  //   }
  // }

  const conversation = [
    // { role: 'system', content: '주어진 정보를 바탕으로 카드 혜택 정보를 항목별로 요약해줘'},
    { role: 'system', content: '아래 정보를 바탕으로 질문에 정해진 양식으로 답변해줘'},
    { role: 'user', content: '카드 혜택 정보:\n' + benefits},
    { role: 'user', content: '양식: ' + '카드이름\n  1. 카드혜택 1\n  2. 카드혜택 2'},
    { role: "user", content: '\n\n' + category + ' ' + '질문: ' + query},
  ];

  const requestBody = {
    messages: conversation,
    max_tokens: 100,
    temperature: 0.1,
    model: "gpt-3.5-turbo-0613",
    stream: true,
  };

  const response = await axios.post("https://api.openai.com/v1/chat/completions", requestBody, {
    headers: {
      Authorization: "Bearer " + process.env.REACT_APP_OPENAI_API_KEY,
      "Content-Type": "application/json"
    },
    responseType: 'stream'
  });

  const stream = response.data;

  stream.on('data', data => { 
    data = data.toString()
    console.log(data) 
  })

  stream.on('error', error => { 
    console.log(error);
  })

  stream.on('end', () => {
    console.log('end');
  })

  if (response.status !== 200) {
    console.log("Error: ", response.data.error);
    return "Error: ", response.data.error;
  }
  
  return response.data.choices[0].message.content;
}
