import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";
import style from "./carouselBi.module.css";
import { CarouselBiProps } from "../../../type/type";

const CarouselBi: React.FC<CarouselBiProps> = ({ src, handleClick }) => {
  return (
    <Carousel
      data-bs-theme="dark"
      interval={null}
      nextIcon={
        <div className={style.nextBtn}>
          <Image
            src="/filter/rightArrow.svg"
            width={15}
            height={15}
            alt="next"
          />
        </div>
      }
      prevIcon={
        <div className={style.prevBtn}>
          <Image
            src="/filter/leftArrow.svg"
            width={15}
            height={15}
            alt="prevBtn"
          />
        </div>
      }
    >
      {src.map((item, index) => {
        return (
          <Carousel.Item
            key={index}
            className={style.carouseliItem}
            onClick={handleClick}
          >
            <Image
              className={style.border}
              src={item}
              fill={true}
              alt="Picture of the author"
              priority={true}
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
              loading="eager"
            />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export { CarouselBi };
