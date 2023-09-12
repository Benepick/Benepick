import React, { Dispatch, SetStateAction } from 'react';
import { ImageSourcePropType, TouchableHighlightProps } from 'react-native';

export interface CreditCardItemProps extends TouchableHighlightProps {
  cardName: string;
  cardType: string;
  image: ImageSourcePropType;
  benefitAmount: string;
  usedAmount: string;
  nextSection: string;
}

export interface CardIdProps {
  cardId: number;
}

export interface SelectedDate {
  month: number;
  year: number;
}

export interface DateOptionProps {
  selectedDate: SelectedDate;
  setSelectedDate: Dispatch<SetStateAction<SelectedDate>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  selectDate: (month: number, year: number) => void;
}

export interface MonthButtonProps {
  month: number;
  isSelected: boolean;
  isDisabled?: boolean;
  onSelect: () => void;
}

export interface CardConsumptionItemProps {
  item: string;
  price: string;
  benefit: string;
}

export interface CautionModalProps {
  showCautionModal: boolean;
  setShowCautionModal: Dispatch<SetStateAction<boolean>>;
}
