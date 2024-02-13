"use client";
import { Button } from "react-bootstrap";
import style from "./buttonShowMore.module.css";
import { useTranslation } from "next-i18next";
const ButtonShowMore: React.FC = () => {
  const { t } = useTranslation();
  const handleClickShowMore = () => {
    console.log("handleClickShowMore");
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
