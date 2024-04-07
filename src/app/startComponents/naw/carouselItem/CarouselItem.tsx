"use client";
import { useEffect, useState } from "react";
import { FilterLngObj } from "../../../type/type";
import { ItemNaw } from "../itemNaw/ItemNaw";
import { useAppSelector } from "@/app/redux/hook";
export interface CarouselItemProps {
  filterData: FilterLngObj[];
}

const CarouselItem: React.FC<CarouselItemProps> = ({ filterData }) => {
  const len = useAppSelector((state) => state.appReducer.location);
  const [currentLen, setCurrentLen] = useState(len);

  useEffect(() => {
    setCurrentLen(len);
  }, [len]);

  return (
    <>
      {filterData.map((item, index) => {
        return (
          <ItemNaw
            key={item.id}
            id={len === "ua" ? 1 : 2}
            label={item.label}
            name={item.nameUa}
            name2={item.nameEn}
            src={item.src}
            type={item.type}
          />
        );
      })}
    </>
  );
};

export { CarouselItem };
