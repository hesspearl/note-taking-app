import React, { useState, useRef, useMemo } from "react";
import NotesTitle from "./NotesTitle";
import { Row, Form, Col } from "react-bootstrap";
import NotesInputs from "./NoteseInputs";
import { Note, Tag } from "./App";
import NoteCard, { NoteCardProps } from "./NoteCard/NoteCard";

type NoteListProps = {
  availableTags: Tag[];
  notes: NoteCardProps[];
};

function NoteList({ availableTags, notes }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [text, setText] = useState<string>("");

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
        title="Notes"
        withButtons
        button1="Create"
        button2="Edit Tags"
        linkTo="/new"
      />
      <Form>
        <NotesInputs
          {...{ selectedTags, setSelectedTags, availableTags, text, setText }}
        />
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-4 my-2">
        {filteredNotes?.map((note) => (
          <Col key={note.id}>
            <NoteCard {...note} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default NoteList;
