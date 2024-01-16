"use client";
import { Container, Row, Col, Button } from "react-bootstrap";

const ButtonShowMore: React.FC = () => {
  const handleClickShowMore = () => {
    console.log("handleClickShowMore");
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs lg="2">
          <Button variant="dark" onClick={handleClickShowMore}>
            Показати більше
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export { ButtonShowMore };
