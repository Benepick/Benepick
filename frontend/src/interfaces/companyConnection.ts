export interface ConnectedCompanyProps {
  image: string;
  name: string;
  cardId: number;
  deleteCompany: (cardId: number) => void;
}

export interface CompanyBoxProps {
  id: number;
  name: string;
  isLinked: boolean;
  selected: boolean;
  img: string;
}
