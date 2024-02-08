"use client";
import React from "react";
import style from "./catdList.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "react-bootstrap";
import { CardBi } from "@/app/components/card/CardBi";
import Loading from "@/app/loading";
import { ButtonShowMore } from "@/app/ui/buttonShowMore/ButtonShowMore";

import { useAppSelector } from "@/app/redux/hook";

const CatdList: React.FC = () => {
  const apartments = useAppSelector(
    (state) => state.apartmentsReducer.apartments
  );

  if (apartments) {
    return (
      <div
        className={`${style.container} ms-lg-5 me-lg-5 ms-sm-3 me-sm-3 ms-sx-3 me-sx-3`}
      >
        {/* <FileTest /> */}
        <Row>
          {apartments.map((item) => {
            return (
              <Col
                key={item.id}
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
