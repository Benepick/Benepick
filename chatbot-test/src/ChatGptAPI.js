import axios from "axios";

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
    { role: 'system', content: '주어진 정보를 바탕으로 카드 혜택 정보를 항목별로 요약해줘'},
    { role: 'user', content: '카드 혜택 정보:\n' + benefits},
    { role: 'user', content: '아래 양식으로 답변해줘\n' + '[카드이름]\n  1. [카드혜택 1]\n  2. [카드혜택 2]'},
    { role: "user", content: '위 내용에 한해서 답변해줘'
    + '\n\n' + category + ' ' + '질문: ' + query},
  ];

  const requestBody = {
    messages: conversation,
    max_tokens: 512,
    temperature: 0.1,
    model: "gpt-3.5-turbo-0613",
  };

  const response = await axios.post("https://api.openai.com/v1/chat/completions", requestBody, {
    headers: {
      Authorization: "Bearer " + process.env.REACT_APP_OPENAI_API_KEY,
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    console.log("Error: ", response.data.error);
    return "Error: ", response.data.error;
  }
  
  return response.data.choices[0].message.content;
}
