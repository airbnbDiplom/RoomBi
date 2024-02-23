import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/redux/hook";
import style from "./reservSelect.module.css";
import Image from "next/image";

const ReservSelect: React.FC = () => {
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
        <p>Гості</p>
        <p>Додайте дату</p>
      </div>

      <div className={style.itemLeft}>
        <Image
          className={style.mainImage}
          src={"/userInfo/arrowDown.svg"}
          alt={"arrow"}
          width={35}
          height={35}
          priority
        />
      </div>
    </div>
  );
};

export { ReservSelect };

//arrowDown
//upArrow
