import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/redux/hook";
import style from "./reservDate.module.css";

const ReservDate: React.FC = () => {
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
    <div className={style.containerDate}>
      <div className={style.item}>
        {date?.start ? (
          <p>
            {date?.start.day}/{date?.start.month}/{date?.start.year}
          </p>
        ) : (
          <p>Додайте дату</p>
        )}
      </div>

      <div className={style.itemLeft}>
        {ifDateEnd ? (
          <p>
            {date?.end.day}/{date?.end.month}/{date?.end.year}
          </p>
        ) : (
          <p>Додайте дату</p>
        )}
      </div>
    </div>
  );
};

export { ReservDate };
