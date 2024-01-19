"use client";
import Carousel from "react-bootstrap/Carousel";
import style from "./Naw.module.css";
import { filterData } from "./dataFilter/data";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CarouselItem } from "./carouselItem/CarouselItem";
import { FilterObj } from "@/app/type/type";

const numberOfObjects = (sizeWindow: number): number => {
  if (sizeWindow < 400) return 1;
  else if (sizeWindow > 400 && sizeWindow < 576) return 2;
  else if (sizeWindow > 576 && sizeWindow < 1000) return 4;
  else if (sizeWindow > 1000 && sizeWindow < 1200) return 6;
  else return 8;
};

const DataObjects = (data: FilterObj[], sizeWindow: number): FilterObj[][] => {
  let count: number;
  count = numberOfObjects(sizeWindow);
  let tempArray: FilterObj[] = [];
  let x = 0;
  return data.reduce((acum, item) => {
    if (x == count) {
      acum.push(tempArray);
      tempArray = [];
      x = 0;
    } else {
      tempArray.push(item);
      x++;
    }
    return acum;
  }, [] as FilterObj[][]);
};
const Naw: React.FC = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [dataObjects, setDataObjects] = useState<FilterObj[][] | never>([]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    setDataObjects(DataObjects(filterData, screenWidth));
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={style.container}>
      <div className={style.carousel}>
        <Carousel
          data-bs-theme="dark"
          interval={null}
          indicators={false}
          nextIcon={<div className={style.nextBtn}></div>}
          prevIcon={<div className={style.prevBtn}></div>}
        >
          {dataObjects.map((item, index) => {
            return (
              <Carousel.Item key={index}>
                <div className={style.itemCarousel}>
                  <CarouselItem filterData={item} />
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
      <div className={style.filterBtnContainer}>
        {" "}
        <button className={style.filterBtn}>
          {" "}
          <Image
            className={style.imgFilterBtn}
            src="/filter/filterBtn.svg"
            width={20}
            height={20}
            alt="filterBtn"
          />
          Фільтри
        </button>
      </div>
    </div>
  );
};

export { Naw };
