"use client";
import { AuthenticationBtn } from "@/app/ui/authenticationBtn/AuthenticationBtn";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
//import planet from '../../../../public/icon/planet.svg'
import style from "./Header.module.css";
import SmallSearch from "./smallSearch/SmallSearch";
import Search from "./search/Search";
const Header: FC = () => {
  //данные с поиска
  const [searchData, setSearchData] = useState({
    whoObj: {
      gestsCount: 0,
      childrenCount: 0,
      babyCount: 0,
      animalsCount: 0,
    },
    whereObj: {
      // TODO: сделать объект по приходящим данным
      continent: "",
      country: "",
      city: "",
      district: "",
      street: "",
    },
  });
  //переключение между видами поика
  const [isSmallSearchOn, setSmallSearchOn] = useState(false);
  const [isBigSearchOn, setBigSearchOn] = useState(true);
  const [isBigSearchOnBySmall, setBigSearchOnBySmall] = useState(false);
  // переключатель кнопок на большом поиске
  const [isWhereDropOn, setWhereDrop] = useState(false);
  const [isWhenDropOn, setWhenDrop] = useState(false);
  const [isWhoDropOn, setWhoDrop] = useState(false);
  const [isWhenDDropOn, setWhenDDrop] = useState(false);
  const [isTeamBlack, setTeamBlack] = useState(false);
  useEffect(() => {
    setTeamBlack(
      isWhereDropOn || isWhenDropOn || isWhoDropOn || isWhenDDropOn
        ? true
        : false
    );
  }, [isWhereDropOn, isWhenDropOn, isWhoDropOn, isWhenDDropOn]);

  return (
    <Container
      fluid
      className={`pt-5 pb-3  ps-md-3 pe-md-3 ps-lg-3 pe-lg-3 sticky-top' ${
        style.header
      } ${isTeamBlack ? style.headerBlaCk : style.headerWhite} `}
    >
      <Row className={"d-flex align-items-center "} style={{ height: "75px" }}>
        <Col className={style.customTextCenter} md={2} lg={2} xl={2} xxl={3}>
          <Link
            href={"/"}
            className={isTeamBlack ? style.logoBlack : style.logo}
          >
            RoomBi
          </Link>
        </Col>
        {isSmallSearchOn && (
          <Col className={` ${style.customDisplayNone} ${style.flexCenter}`}>
            <SmallSearch
              propsBigSearch={{
                setWhereDrop,
                setWhenDrop,
                setWhoDrop,
              }}
              propsKindSwitch={{
                isSmallSearchOn,
                isBigSearchOn,
                isBigSearchOnBySmall,
                setSmallSearchOn,
                setBigSearchOn: setBigSearchOn,
                setBigSearchOnBySmall,
              }}
            />
          </Col>
        )}
        {isBigSearchOn && (
          <Col
            md={7}
            lg={7}
            xl={7}
            xxl={6}
            className={` ${
              isBigSearchOn ? style.Visibility : style.VisibilityNone
            } ${style.customDisplayNone} `}
          >
            <Search
              searchData={searchData}
              setSearchData={setSearchData}
              setTeamBlack={setTeamBlack}
              isTeamBlack={isTeamBlack}
              propsBigSearch={{
                isWhereDropOn,
                isWhenDropOn,
                isWhoDropOn,
                isWhenDDropOn,
                setWhereDrop,
                setWhenDrop,
                setWhoDrop,
                setWhenDDrop,
              }}
              propsKindSwitch={{
                isSmallSearchOn,
                isBigSearchOn,
                isBigSearchOnBySmall,
                setSmallSearchOn,
                setBigSearchOn: setBigSearchOn,
                setBigSearchOnBySmall,
              }}
            />
          </Col>
        )}
        <Col md={3} lg={3} xl={3}>
          <Row>
            <Col
              className={`ms-md-3 ms-xs-1 p-0 ${style.customText} d-flex justify-content-center align-item-center`}
            >
              <Link
                className={`${style.customText} ${style.link} ${
                  isTeamBlack && style.colorW
                } d-flex justify-content-center align-item-center`}
                href="/#"
              >
                Запропонувати помешкання на <strong>RoomBi</strong>
              </Link>
            </Col>
            <Col
              className={`${style.customTextCenter} ${style.customDisplayNone} d-flex justify-content-end`}
            >
              <AuthenticationBtn isTeamBlack={isTeamBlack} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export { Header };
