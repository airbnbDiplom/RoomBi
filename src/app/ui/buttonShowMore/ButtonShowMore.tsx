"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { pushPushOnePage } from "@/app/redux/apartmentsState/apartmentsSlice";
import { Button } from "react-bootstrap";
import style from "./buttonShowMore.module.css";
import { useTranslation } from "next-i18next";
const ButtonShowMore: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const handleClickShowMore = () => {
    console.log("handleClickShowMore");
    dispatch(pushPushOnePage());
  };
  return (
    <div className={style.container}>
      <Button variant="dark" onClick={handleClickShowMore}>
        {t("showMoreBtn")}
      </Button>
    </div>
  );
};
export { ButtonShowMore };
