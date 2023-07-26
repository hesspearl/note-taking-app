import { NoteData, Tag } from "./App";
import { NewNotesProps } from "./NewNotes";
import NoteForm from "./NoteForm";
import NotesTitle from "./NotesTitle";
import { useNote } from "./hook/useNote";

export interface EditNotesProps extends Omit<NewNotesProps, "onSubmit"> {
  onSubmit(id: string, data: NoteData): void;
}

function EditNotes({ onSubmit, onAddTag, availableTags }: EditNotesProps) {
  const note = useNote();

  return (
    <>
      <NotesTitle title="Edit Notes" />
      <NoteForm
        {...{
          ...note,
          onSubmit: (data) => onSubmit(note.id, data),
          availableTags,
          onAddTag,
        }}
      />
    </>
  );
}

export default EditNotes;
