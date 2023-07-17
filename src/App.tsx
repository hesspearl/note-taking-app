import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import NewNotes from "./NewNotes";
import { useLocalStorage } from "./useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import NoteList from "./NoteList";

export type Tag = {
  id: string;
  label: string;
};
export type Note = {
  id: string;
} & NoteData;
export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagsIds: string[];
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(
    () =>
      notes.map((note) => ({
        ...note,
        tags: tags.filter((tag) => note.tagsIds.includes(tag.id)),
      })),
    [notes, tags]
  );

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes) => [
      ...prevNotes,
      { ...data, id: uuidV4(), tagsIds: tags.map((tag) => tag.id) },
    ]);
  };

  function onAddTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }
  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={<NoteList availableTags={tags} notes={notesWithTags} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path=":id" element={<h1>hi</h1>}>
          <Route index element={<h1>show</h1>} />
          <Route path="edit" element={<h1>edit</h1>} />
        </Route>
        <Route
          path="/new"
          element={
            <NewNotes
              onSubmit={onCreateNote}
              onAddTag={onAddTag}
              availableTags={tags}
            />
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
