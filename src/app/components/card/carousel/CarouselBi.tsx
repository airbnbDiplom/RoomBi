import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";
import style from "./carouselBi.module.css";
import { CarouselBiProps } from "../../../type/type";

const CarouselBi: React.FC<CarouselBiProps> = ({ src, handleClick }) => {
  return (
    <Carousel data-bs-theme="white" interval={null} className={style.border}>
      {src.map((item, index) => {
        return (
          <Carousel.Item
            key={index}
            className={style.carouseliItem}
            onClick={handleClick}
          >
            <Image
              className={style.carouseImage}
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
