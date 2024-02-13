"use client";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { isMap } from "@/app/redux/appState/appSlice";
import { setApartmentsMap } from "@/app/redux/apartmentsState/apartmentsSlice";
import style from "./showMapBtn.module.css";
import { getAllMarkers } from "@/app/services/markerServices";
import { useTranslation } from "next-i18next";
const ShowMapBtn: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const isShowMap = useAppSelector((state) => state.appReducer.isMapPage);
  const length = useAppSelector(
    (state) => state.apartmentsReducer.apartmentsMap.length
  );
  console.log("length", length);
  const click = async () => {
    if (!isShowMap && length === 0) {
      const marcerData = await getAllMarkers();
      dispatch(setApartmentsMap(marcerData));
    }

    dispatch(isMap(!isShowMap));
  };
  return (
    <button onClick={click} className={style.btnStyle}>
      <Image
        priority
        src="./icon/map.svg"
        width={20}
        height={20}
        alt="List icon"
      />
      <p className={style.p}>{t("showMap")}</p>
    </button>
  );
};

export { ShowMapBtn };
