import { Benefit, BenefitResult, Message, RequestBody } from '@interfaces/chatBot';
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
  const response = await axios.get(`${ROOT}cardBenefits/summary/${cardname}/${benefitId}`);

  if (response.data.length !== 0) {
    return `${cardname}\n${response.data}`;
  } else {
    const response2 = await axios.get(`${ROOT}cardBenefits/${cardname}/${benefitId}`);
    const summarizedData = await summary(response2.data);
    await axios.post(`${ROOT}cardBenefits/summary/`, {
      cardName: cardname,
      benefitId,
      content: summarizedData,
    });

    return `${cardname}\n${summarizedData}`;
  }
};

// 카드 혜택 정보 요청
export const retrieveCardBenefits = async (cardname: string) => {
  const response = await axios.post('https://benepick.shop/query', {
    queries: [
      {
        query: cardname,
        filter: {
          source_id: cardname,
          author: 'benefit',
        },
        top_k: 10,
      },
    ],
  });

  const benefits = response.data.results[0].results.map((result: BenefitResult) => result.text);

  const benefitString = benefits.join('\n- ');

  const finalString = `${cardname}\n- ${benefitString}`;

  return finalString;
};
