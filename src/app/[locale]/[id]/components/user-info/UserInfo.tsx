"use client";
import { RentalApartmentDTO } from "@/app/type/type";
import style from "./userInfo.module.css";
import { Foto } from "../foto/Foto";
import { MainHeader } from "../main-header/MainHeader";
import { MainContent } from "../main-content/MainContent";
const UserInfo: React.FC<{ data: RentalApartmentDTO }> = ({
  data,
}: {
  data: RentalApartmentDTO;
}) => {
  console.log("getApartamentId", data);
  return (
    <div className={style.container}>
      <MainHeader data={data} />
      <Foto data={data.pictures} />
      <MainContent data={data} />
    </div>
  );
};
export { UserInfo };
