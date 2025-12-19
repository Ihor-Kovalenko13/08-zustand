import css from './NoteDetails.module.css';
import { Note } from '@/types/note';

type NoteDetailsProps = {
  note: Note;
};

export default function NoteDetails({ note }: NoteDetailsProps) {
  const noteData = note.updatedAt
    ? `Updated at: ${note?.updatedAt}`
    : `Created at: ${note?.createdAt}`;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{noteData}</p>
      </div>
    </div>
  );
}