import { NoteData, Tag } from "./App";
import NoteForm from "./NoteForm";
import NotesInputs from "./NotesInputs";
import NotesTitle from "./NotesTitle";
export interface NewNotesProps {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}

function NewNotes({ onSubmit, onAddTag, availableTags }: NewNotesProps) {
  return (
    <>
      <NotesTitle title="New Notes" />
      <NoteForm {...{ onSubmit, availableTags, onAddTag }} />
    </>
  );
}

export default NewNotes;
