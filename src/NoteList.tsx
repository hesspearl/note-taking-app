import { useState, useMemo } from "react";
import NotesTitle from "./NotesTitle";
import { Row, Form, Col } from "react-bootstrap";
import NotesInputs from "./NotesInputs";
import { Tag } from "./App";
import NoteCard, { NoteCardProps } from "./NoteCard/NoteCard";
import EditTagModal from "./EditTagModal";

export type NoteListProps = {
  availableTags: Tag[];
  notes: NoteCardProps[];
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};

function NoteList({
  availableTags,
  notes,
  onDeleteTag,
  onUpdateTag,
}: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [text, setText] = useState<string>("");
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] =
    useState<boolean>(false);

  const filteredNotes = useMemo(
    () =>
      notes?.filter(
        (note) =>
          (!text.length ||
            note.title.toLowerCase().includes(text.toLocaleLowerCase())) &&
          (selectedTags.length === 0 ||
            selectedTags.every((tag) =>
              note.tags.some((noteTag) => noteTag?.id === tag.id)
            ))
      ),
    [text, selectedTags, notes]
  );

  return (
    <>
      <NotesTitle
        title="M&upsih; &Gamma;ists"
        withButtons
        button1="Create"
        linkTo="/new"
      />
      <Form>
        <Form.Group controlId="title" className="d-flex flex-column">
          <Form.Label>Search</Form.Label>
          <Form.Control
            required
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </Form.Group>
        {/* <NotesInputs
          {...{ selectedTags, setSelectedTags, availableTags, text, setText }}
        /> */}
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-4 my-2">
        {filteredNotes?.map((note) => (
          <Col key={note.id}>
            <NoteCard {...note} />
          </Col>
        ))}
      </Row>
      {/* <EditTagModal
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        {...{ availableTags, onDeleteTag, onUpdateTag }}
      /> */}
    </>
  );
}

export default NoteList;
