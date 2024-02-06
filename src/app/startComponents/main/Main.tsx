"use client";
import { CardBiProps } from "@/app/type/type";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setApartments } from "../../redux/apartmentsState/apartmentsSlice";
import { CatdList } from "@/app/components/card-list-main/CatdList";
import { useEffect } from "react";
import { MapMain } from "@/app/components/map-main/MapMain";

const Main: React.FC<{ cardData: CardBiProps[] }> = ({
  cardData,
}: {
  cardData: CardBiProps[];
}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setApartments(cardData));
  });
  const isShowMap = useAppSelector((state) => state.appReducer.isMapPage);

  if (!isShowMap) {
    return <CatdList />;
  }
  return <MapMain />;
};
export { Main };
