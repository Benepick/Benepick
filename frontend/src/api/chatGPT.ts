import { Benefit, Message, RequestBody } from '@interfaces/chatBot';
import axios from 'axios';
import Config from 'react-native-config';

const ROOT = Config.REACT_APP_ROOT_URL;

const GPT_API_URL = Config.REACT_GPT_API_URL;
const API_KEY = Config.REACT_APP_OPENAI_API_KEY;

const requestBodyPrefix: RequestBody = {
  max_tokens: 1000,
  temperature: 0.1,
  model: 'gpt-3.5-turbo-16k-0613',
};

const headers = {
  headers: {
    Authorization: 'Bearer ' + API_KEY,
    'Content-Type': 'application/json',
  },
};

export async function summary(benefits: string): Promise<string> {
  if (!GPT_API_URL) {
    throw new Error('GPT_API_URL is not defined');
  }
  const conversation: Message[] = [{ role: 'user', content: '혜택 정보 요약해줘:\n\n' + benefits }];

  const requestBody: RequestBody = {
    ...requestBodyPrefix,
    messages: conversation,
  };

  const response = await axios.post(GPT_API_URL, requestBody, headers);

  if (response.status !== 200) {
    console.log('Error: ', response.data.error);
    return 'Error: ' + response.data.error;
  }

  return response.data.choices[0].message.content;
}

// 장소 검색 혜택 요청
export const queryBenefits = async (query: string): Promise<Benefit[]> => {
  const response = await axios.post(`${ROOT}query`, {
    queries: [
      {
        query,
        filter: {
          author: 'benefit',
        },
        top_k: 10,
      },
    ],
  });

  const benefits: Benefit[] = response.data.results[0].results.map((benefit: any) => ({
    cardname: benefit.metadata.source_id,
    benefit: benefit.text,
    benefitId: benefit.metadata.document_id,
  }));

  return benefits;
};

// 카드 혜택 상세 정보 요청
export const retrieveCardDetails = async (cardname: string, benefitId: string): Promise<string> => {
  console.log(`${ROOT}${cardname}/${benefitId}`);
  const response = await axios.get(`${ROOT}${cardname}/${benefitId}`);

  if (response.data.length !== 0) {
    return response.data;
  } else {
    const response2 = await axios.get(`${ROOT}${cardname}/${benefitId}`);
    const summarizedData = await summary(response2.data);
    await axios.post(`${ROOT}cardBenefits/summary/`, {
      cardName: cardname,
      benefitId,
      content: summarizedData,
    });
    return summarizedData;
  }
};

// export default async function generate(
//   query: string,
//   benefits: string,
//   category: string,
//   setText: (text: string) => void,
// ) {
//   if (!GPT_API_URL) {
//     throw new Error('GPT_API_URL is not defined');
//   }

//   const conversation: Message[] = [
//     {
//       role: 'user',
//       content:
//         '1. 주어진 정보에서 정확한 카드 이름을 찾아\n' +
//         '2. json 양식: {카드 이름 : [혜택정보]} 으로 답변해\n' +
//         '카드 혜택 정보:\n' +
//         benefits +
//         '\n\n' +
//         category +
//         ' 질문: ' +
//         query,
//     },
//   ];

//   try {
//     const response = await fetch(GPT_API_URL, {
//       method: 'POST',
//       ...headers,
//       body: JSON.stringify({
//         ...requestBodyPrefix,
//         messages: conversation,
//         stream: true,
//       }),
//     });

//     const reader = response.body.getReader();

//     const decoder = new TextDecoder('utf-8');
//     let resultText = '';

//     while (true) {
//       const { done, value } = await reader.read();
//       if (done) {
//         return resultText;
//       }

//       const chunk = decoder.decode(value);
//       const lines = chunk.split('\n');
//       const parsedLines = lines
//         .filter((line) => line !== '' && line !== 'data: [DONE]')
//         .map((line) => JSON.parse(line.replace(/^data: /, '').trim()));

//       for (const parsedLine of parsedLines) {
//         const { choices } = parsedLine as ResponseData;
//         const { delta } = choices[0];
//         const { content } = delta;

//         if (content) {
//           resultText += content;
//           setText(resultText);
//         }
//       }
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }
