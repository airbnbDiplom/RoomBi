import { Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <div
      style={{
        marginTop: "30vh",
        display: "flex",
        marginLeft: "30vw",
        width: "20vw",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <h1 style={{ marginRight: "12px" }}>Loading... </h1>
      <Spinner animation="border" variant="primary" />
    </div>
  );
}
