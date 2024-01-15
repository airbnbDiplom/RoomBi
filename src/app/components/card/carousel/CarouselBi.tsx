import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";
import style from "./carouselBi.module.css";

interface CarouselBiProps {
  src: string[];
}
const CarouselBi: React.FC<CarouselBiProps> = ({ src }) => {
  return (
    <Carousel data-bs-theme="white" interval={null}>
      {src.map((item, index) => {
        return (
          <Carousel.Item key={index} className={style.carouseliItem}>
            <Image
              src={item}
              fill={true}
              alt="Picture of the author"
              priority={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export { CarouselBi };
