import { type Note } from "../../types/note";
import css from "./NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeNote } from "../../services/noteService";
import iziToast from "izitoast";
import { useState } from "react";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const deleteNote = useMutation({
    mutationFn: (id: string) => removeNote(id),
    onMutate: (id: string) => {
      setDeletingId(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Notes"] });
      iziToast.success({
        message: "Note deleted successfully",
        position: "topCenter",
      });
    },
    onError: () => {
      iziToast.error({
        message: "Error deleting note, please try again",
        position: "topCenter",
      });
    },
    onSettled: () => {
      setDeletingId(null);
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              onClick={() => deleteNote.mutate(note.id)}
              className={css.button}
              disabled={deletingId === note.id}
            >
              {deletingId === note.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
