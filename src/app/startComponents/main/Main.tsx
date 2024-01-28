import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "react-bootstrap";
import { CardBi } from "../../components/card/CardBi";
import { ButtonShowMore } from "../../ui/buttonShowMore/ButtonShowMore";
import style from "./main.module.css";
import { CardBiProps } from "@/app/type/type";
import Loading from "../../loading";
const Main: React.FC<{ cardData: CardBiProps[] }> = ({
  cardData,
}: {
  cardData: CardBiProps[];
}) => {
  if (cardData) {
    return (
      <div
        className={`${style.container} ms-lg-5 me-lg-5 ms-sm-3 me-sm-3 ms-sx-3 me-sx-3`}
      >
        <Row>
          {cardData.map((item, index) => {
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
          {cardData.map((item, index) => {
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
          {cardData.map((item, index) => {
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
export { Main };
