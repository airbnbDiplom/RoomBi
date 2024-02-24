"use client";
import React from "react";
import style from "./catdList.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "react-bootstrap";
import { CardBi } from "@/app/components/card/CardBi";
import { ButtonShowMore } from "@/app/ui/buttonShowMore/ButtonShowMore";
import { useAppSelector } from "@/app/redux/hook";
import Loading from "@/app/[locale]/loading";

const CatdList: React.FC = () => {
  const apartments = useAppSelector(
    (state) => state.apartmentsReducer.apartments
  );

  if (apartments) {
    return (
      <div className={`${style.container} `}>
        {/* <FileTest /> */}
        <Row>
          {apartments.map((item) => {
            return (
              <Col
                key={item.id + item.bookingFree + item.ingMap}
                xs={{ span: 12 }}
                sm={{ span: 6 }}
                md={{ span: 4 }}
                lg={{ span: 3 }}
                xl={{ span: 2 }}
              >
                <CardBi {...item} />
              </Col>
            );
          })}
        </Row>
        <ButtonShowMore />
      </div>
    );
  }
  return (
    <div>
      <Loading />
    </div>
  );
};

export { CatdList };
