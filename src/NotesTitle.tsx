import React from "react";
import { Button, Col, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

interface NotesTitleOptionalProps<WithButtons> {
  title: string;
  withButtons?: WithButtons;
  linkTo?: string;
  button1?: string;
  button2?: string;
}

const NotesTitle = <WithButtons extends boolean>({
  title,
  linkTo,
  withButtons,
  button1,
  button2,
}: WithButtons extends true
  ? Required<NotesTitleOptionalProps<WithButtons>>
  : NotesTitleOptionalProps<WithButtons>) => {
  if (!withButtons) {
    return <h1 className="mb-4">{title}</h1>;
  }
  return (
    <Row>
      <Col>
        <h1 className="mb-4">{title}</h1>
      </Col>
      <Col xs="auto">
        <Stack gap={2} direction="horizontal">
          <Link to={linkTo}>
            <Button variant="primary">{button1}</Button>
          </Link>
          <Button variant="outline-secondary">{button2}</Button>
        </Stack>
      </Col>
    </Row>
  );
};

export default NotesTitle;
