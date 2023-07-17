import React, { forwardRef, Dispatch, SetStateAction } from "react";
import { Form, Row, Col } from "react-bootstrap";
import ReactSelect from "react-select";
import { NewNotesProps } from "./NewNotes";
import { Tag } from "./App";

type NoteInputProps = {
  selectedTags: Tag[];
  setSelectedTags: Dispatch<SetStateAction<Tag[]>>;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
} & Omit<NewNotesProps, "onSubmit" | "onAddTag">;

function NotesInputs({
  availableTags,
  selectedTags,
  setSelectedTags,
  setText,
  text,
}: NoteInputProps) {
  return (
    <Row>
      <Col>
        <Form.Group controlId="title" className="d-flex flex-column">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group controlId="tags">
          <Form.Label>Tags</Form.Label>
          <ReactSelect
            isMulti
            options={availableTags.map((tag) => ({
              label: tag.label,
              value: tag.id,
            }))}
            value={selectedTags.map((tag) => ({
              label: tag.label,
              value: tag.id,
            }))}
            onChange={(selectedTags) => {
              setSelectedTags(
                selectedTags.map((tag) => ({
                  label: tag.label,
                  id: tag.value,
                }))
              );
            }}
          />
        </Form.Group>
      </Col>
    </Row>
  );
}

export default NotesInputs;
