export interface ConnectedCompanyProps {
  image: string;
  name: string;
  cardId: number;
}

export interface CompanyBoxProps {
  id: number;
  name: string;
  state: 'add' | 'linked' | 'selected';
  selected: boolean;
  img: string;
}
