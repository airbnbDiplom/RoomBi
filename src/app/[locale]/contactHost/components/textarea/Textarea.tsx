"use client";
import { RentalApartmentDTO } from "@/app/type/type";
import style from "./textarea.module.css";
import { useTranslation } from "react-i18next";
import { Button, FloatingLabel, Form } from "react-bootstrap";

const Textarea: React.FC<{ data: RentalApartmentDTO }> = ({
  data,
}: {
  data: RentalApartmentDTO;
}) => {
  const { t } = useTranslation();

  return (
    <div className={style.container}>
      <FloatingLabel controlId="floatingTextarea" label={t("txt2CM")}>
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{
            height: "200px",
            minHeight: "200px",
            maxHeight: "200px",
            border: "1px solid black",
          }}
        />
      </FloatingLabel>
      <Button
        variant="light"
        style={{
          margin: "20px 0",
          border: "1px solid black",
          fontWeight: "700",
          width: "200px",
        }}
      >
        {t("txt3CM")}
      </Button>
    </div>
  );
};
export { Textarea };
