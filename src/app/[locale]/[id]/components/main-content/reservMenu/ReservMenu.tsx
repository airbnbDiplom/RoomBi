import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/redux/hook";
import style from "./reservMenu.module.css";
import { ReservDate } from "./reserv-date/ReservDate";
import { ReservSelect } from "./reserv-select/ReservSelect";

const ReservMenu: React.FC = () => {
  const date = useAppSelector((state) => state.reservReducer.date);
  const [ifDateEnd, setIfDateEnd] = useState(false);
  useEffect(() => {
    if (
      date?.start.day === date?.end.day &&
      date?.start.month === date?.end.month &&
      date?.start.year === date?.end.year
    ) {
      setIfDateEnd(false);
    } else {
      setIfDateEnd(true);
    }
  }, [date]);
  return (
    <div className={style.container}>
      <div className={style.form}>
        <ReservDate />
        <ReservSelect />
      </div>
    </div>
  );
};

export { ReservMenu };
