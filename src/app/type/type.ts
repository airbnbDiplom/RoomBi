export interface CardBiProps {
  id: number;
  title: string;
  name: string;
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
