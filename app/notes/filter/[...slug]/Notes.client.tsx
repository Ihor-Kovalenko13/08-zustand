'use client';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Error from '@/components/Error/Error';
import { fetchNotes } from '@/lib/api';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDebouncedCallback } from 'use-debounce';
// import { toast, Toaster } from 'react-hot-toast';
import css from './NotesPage.module.css';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');

  const {
    data: response,
    isSuccess,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['notes', search, page, tag],
    queryFn: () => fetchNotes({ search, page, tag }),
    // enabled: page !== 0,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  const totalPages = response?.totalPages ?? 0;

  // useEffect(() => {
  //   if (isSuccess && response?.notes.length === 0) {
  //     toast.error('No notes found for your request.');
  //   }
  // }, [isSuccess, response?.notes.length]);

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  return (
    <>
      <section className={css.app}>
        <div className={css.toolbar}>
          <SearchBox
            search={inputValue}
            onChange={e => {
              setInputValue(e.target.value);
              handleSearch(e.target.value);
            }}
          />
          {totalPages > 0 && (
            <Pagination
              totalPages={totalPages}
              page={page}
              onPageChange={setPage}
            />
          )}
          <Link className={css.button} href="/notes/action/create">
            Create note +
          </Link>
        </div>
        {isLoading && <p>Loading...</p>}
        {isError && <Error />}
        {isSuccess && response?.notes.length === 0 && (
          <p>No notes found for your request.</p>
        )}
        {isSuccess && response?.notes.length > 0 && (
          <NoteList notes={response.notes} />
        )}
      </section>
    </>
  );
}