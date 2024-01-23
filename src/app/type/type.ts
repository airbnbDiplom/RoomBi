export interface CardBiProps {
  id: number;
  title: string;
  country: string;
  date: string;
  src: string[];
  price: number;
  rating: number;
  choiceGuests: boolean;
}
export interface CarouselBiProps {
  src: string[];
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export interface FilterObj {
  id: number;
  label: string;
  name: string;
  src: string;
  type: string;
}
