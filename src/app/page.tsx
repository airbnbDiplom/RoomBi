import Image from "next/image";
import Link from "next/link";
import { Test } from "./startComponents/testR/Test";
import { ObjCard } from "./components/card/ObjCard";
import { Col, Container, Row } from "reactstrap";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 style={{ color: "red", fontSize: "50px" }}>AIRBNB</h1>
      <Link href="/posts">Posts</Link>
      <ObjCard />
      <ObjCard />
      <ObjCard />
      <Container>
        <Row>
          <Col className="col-sm">
            <span>One of three columns</span>
          </Col>
          <Col className="col-sm">
            <span>One of three columns</span>
          </Col>
          <Col className="col-sm">
            <span>One of three columns</span>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
