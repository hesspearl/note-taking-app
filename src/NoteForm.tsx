import { FormEvent, useRef, useState } from "react";
import { Form, Stack, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { NoteData, Tag } from "./App";
import { NewNotesProps } from "./NewNotes";
import NotesInputs from "./NotesCreatableInputs";

type NoteFormProps = NewNotesProps & Partial<NoteData>;

function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  tags = [],
  markdown = "",
  title,
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    navigate("..");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <NotesInputs
          {...{
            availableTags,
            onAddTag,
            setSelectedTags,
            selectedTags,
            ref: titleRef,
            title,
          }}
        />
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={15}
            ref={markdownRef}
            defaultValue={markdown}
          />
        </Form.Group>
        <Stack
          direction="horizontal"
          gap={2}
          className="d-flex justify-content-end "
        >
          <Button type="submit" variant="primary">
            Save
          </Button>
          {/* return one page  */}
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}

export default NoteForm;
