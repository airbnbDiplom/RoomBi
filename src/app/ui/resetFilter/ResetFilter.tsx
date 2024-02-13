"use client";
import Image from "next/image";
import style from "./resetFilter.module.css";
import { getAllMarkers } from "@/app/services/markerServices";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import {
  setApartmentsMap,
  setApartments,
} from "@/app/redux/apartmentsState/apartmentsSlice";
import { getAllHouses } from "@/app/services/housesServices";
const ResetFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const isShowMap = useAppSelector((state) => state.appReducer.isMapPage);

  const onReset = async () => {
    if (!isShowMap) {
      const housesData = await getAllHouses();
      dispatch(setApartments(housesData));
      console.log("not isShowMap");
    } else {
      const marcerData = await getAllMarkers();
      dispatch(setApartmentsMap(marcerData));
      console.log("isShowMap");
    }
  };

  return (
    <button onClick={onReset} className={style.btnStyle}>
      <Image
        priority
        src="./filter/filterOff.svg"
        width={20}
        height={20}
        alt="List icon"
      />
    </button>
  );
};

export { ResetFilter };
