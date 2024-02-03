"use client";
import { FilterObj } from "../../../type/type";
import { ItemNaw } from "../itemNaw/ItemNaw";

export interface CarouselItemProps {
  filterData: FilterObj[];
}
const CarouselItem: React.FC<CarouselItemProps> = ({ filterData }) => {
  return (
    <>
      {filterData.map((item, index) => {
        return (
          <ItemNaw
            key={item.id}
            id={item.id}
            label={item.label}
            name={item.name}
            src={item.src}
            type={item.type}
          />
        );
      })}
    </>
  );
};

export { CarouselItem };
