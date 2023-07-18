import React, { forwardRef, Dispatch, SetStateAction } from "react";
import { Form, Row, Col } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";
import { NewNotesProps } from "./NewNotes";
import { Tag } from "./App";

type NoteCreatableInputProps = {
  selectedTags: Tag[];
  setSelectedTags: Dispatch<SetStateAction<Tag[]>>;
  title?: string;
} & Omit<NewNotesProps, "onSubmit">;

const NotesCreatableInputs = forwardRef<
  HTMLInputElement,
  NoteCreatableInputProps
>(function NotesInputs(
  { availableTags, selectedTags, onAddTag, setSelectedTags, title = "" },
  ref
) {
  return (
    <Row>
      <Col>
        <Form.Group controlId="title" className="d-flex flex-column">
          <Form.Label>Title</Form.Label>
          <Form.Control required ref={ref} defaultValue={title} />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group controlId="tags">
          <Form.Label>Tags</Form.Label>

          {/* //TODO replace react select with custom select */}
          <CreatableReactSelect
            isMulti
            options={availableTags.map((tag) => ({
              label: tag.label,
              value: tag.id,
            }))}
            onCreateOption={(label) => {
              const newTag = { id: uuidV4(), label };

              onAddTag(newTag);
              setSelectedTags((prev) => [...prev, newTag]);
            }}
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
});
export default NotesCreatableInputs;
