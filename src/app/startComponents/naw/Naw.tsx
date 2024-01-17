"use client";
import Carousel from "react-bootstrap/Carousel";
import style from "./Naw.module.css";
import { filterData } from "./dataFilter/data";
import Image from "next/image";

const Naw: React.FC = () => {
  return (
    // <Image
    //   src="/filter/Hostels.svg"
    //   alt="/filter/Hostels.svg"
    //   width={50}
    //   height={50}
    // />

    <Carousel className="col-md-6  " data-bs-theme="dark" indicators={false}>
      <Carousel.Item>
        <div className={style.test1}>
          {filterData.map((item, index) => {
            if (index < 6) {
              return (
                <div key={item.id} className={style.itemCarousel}>
                  <Image
                    src={item.src}
                    alt={item.label}
                    width={25}
                    height={25}
                  />
                  <p>{item.name}</p>
                </div>
              );
            }
          })}
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className={style.test1}>
          {filterData.map((item, index) => {
            if (index >= 6) {
              return (
                <div key={item.id} className="ms-1  me-1">
                  <Image
                    src={item.src}
                    alt={item.label}
                    width={30}
                    height={30}
                  />
                  <p>{item.name}</p>
                </div>
              );
            }
          })}
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className={style.test1}>
          <div className={style.test3}></div>
          <div className={style.test4}></div>
          <div className={style.test5}></div>
          <div className={style.test5}></div>
          <div className={style.test6}></div>
          <div className={style.test5}></div>
          <div className={style.test5}></div>
          <div className={style.test4}></div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export { Naw };
