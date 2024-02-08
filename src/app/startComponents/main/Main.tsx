"use client";
import { CardBiProps } from "@/app/type/type";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setApartments } from "../../redux/apartmentsState/apartmentsSlice";
import { CatdList } from "@/app/components/card-list-main/CatdList";
import { useEffect, useMemo } from "react";
import dynamic from "next/dynamic";

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

  const Map = useMemo(
    () =>
      dynamic(
        () =>
          import("@/app/components/map-main/MapMain").then(
            (mod) => mod.MapMain
          ),
        {
          loading: () => <p>A map is loading</p>,
          ssr: false,
        }
      ),
    []
  );

  if (!isShowMap) {
    return <CatdList />;
  }
  return <Map />;
};
export { Main };
