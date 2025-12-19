import css from '@/components/CreateNote/CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create new Note - NoteHub',
  description: 'NoteHub is a simple and efficient application',
  openGraph: {
    title: 'Create new Note - NoteHub',
    description:
      'NoteHub is a simple and efficient application designed for managing personal notes.',
    url: `https://08-zustand-seven-xi.vercel.app/notes/action/create`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
        alt: `NoteHub`,
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}