import { ImageSourcePropType } from 'react-native';

export interface BenfitCardProps {
  cardCompanyName: string;
  cardName: string;
  cardImgUrl: string;
  category: string;
  discountPercent: number;
  discountTarget: string;
  remainedBenefit?: number;
  benefitLimit?: number;
}
