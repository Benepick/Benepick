type ChatMessageType = 'request' | 'response';
export interface ChatLogProps {
  type: ChatMessageType;
  keyword?: string;
  message: string | { cardname: string; benefitId: string; benefit: string }[];
  onCardClick?: (cardname: string, benefitId: string) => void;
}

export interface Message {
  role: 'user' | 'system';
  content: string;
}

export interface RequestBody {
  max_tokens: number;
  temperature: number;
  model: string;
  messages?: Message[];
  stream?: boolean;
}

export interface Benefit {
  cardname: string;
  benefit: string;
  benefitId: string;
}
