import axios from 'axios';
import type { Note } from '@/types/note';

interface fetchNotesProps {
  search?: string;
  page: number;
  tag?: string;
}

export interface fetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface createNoteProps {
  id?: string;
  title: string;
  content: string;
  tag: string;
}

const myToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

axios.defaults.headers.common['Authorization'] = `Bearer ${myToken}`;

export const fetchNotes = async ({
  search,
  page,
  tag,
}: fetchNotesProps): Promise<fetchNotesResponse> => {
  const options = {
    params: {
      page,
      perPage: 12,
      search,
      tag,
    },
  };

  const response = await axios.get<fetchNotesResponse>('/notes', options);
  return response.data;
};

export async function fetchNoteById(id: Note['id']): Promise<Note> {
  const response = await axios.get<Note>(`/notes/${id}`);
  return response.data;
}

export const createNote = async (data: createNoteProps) => {
  const response = await axios.post<Note>('/notes', data);
  return response.data;
};

export const deleteNote = async (id: Note['id']): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${id}`);
  return response.data;
};
