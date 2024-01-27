import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "react-bootstrap";
import { CardBi } from "../../components/card/CardBi";
import { cardData } from "../../tempData/data";
import { ButtonShowMore } from "../../ui/buttonShowMore/ButtonShowMore";
import style from "./main.module.css";

const Main: React.FC = () => {
  return (
    <div>
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
};
export { Main };
