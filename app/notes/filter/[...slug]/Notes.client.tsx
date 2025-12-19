'use client';

import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { toast, Toaster } from 'react-hot-toast';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import Error from '@/components/Error/Error';

import useModalControl from '@/hooks/useModalControl';
import { fetchNotes } from '@/lib/api';

import css from './NotesPage.module.css';

type NotesClientProps = {
  tag: string;
};

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { isModalOpen, openModal, closeModal } = useModalControl();

  const {
    data: response,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ['notes', tag, search, page],
    queryFn: () =>
      fetchNotes({
        page,
        search,
        tag: tag === 'all' ? undefined : tag,
      }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const totalPages = response?.totalPages ?? 0;

  useEffect(() => {
    if (response && response.notes.length === 0) {
      toast.error('No notes found for your request.');
    }
  }, [response]);

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  return (
    <section className={css.app}>
      <Toaster />

      <div className={css.toolbar}>
        <SearchBox
          search={search}
          onChange={e => handleSearch(e.target.value)}
        />

        {totalPages > 0 && (
          <Pagination
            totalPages={totalPages}
            page={page}
            onPageChange={setPage}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </div>

      {isError && <Error />}
      {isSuccess && response && <NoteList notes={response.notes} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onSuccessClose={closeModal} />
        </Modal>
      )}
    </section>
  );
}
