"use client";
import { Button } from "react-bootstrap";
import style from "./buttonShowMore.module.css";

const ButtonShowMore: React.FC = () => {
  const handleClickShowMore = () => {
    console.log("handleClickShowMore");
  };
  return (
    <div className={style.container}>
      <Button variant="dark" onClick={handleClickShowMore}>
        Показати більше
      </Button>
    </div>
  );
};
export { ButtonShowMore };
