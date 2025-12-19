import { fetchNotes } from '@/lib/api';
import { Metadata } from 'next';
import NotesClient from './Notes.client';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';

interface PropsFilter {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: PropsFilter): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];
  return {
    title: tag === 'all' ? 'All Notes page' : `Notes page - "${tag}"`,
    description: tag === 'all' ? 'All Notes' : `Notes tagged with "${tag}"`,
    openGraph: {
      title: tag === 'all' ? 'All Notes page' : `Notes page - "${tag}"`,
      description: tag === 'all' ? 'All Notes' : `Notes tagged with "${tag}"`,
      url: `https://08-zustand-seven-xi.vercel.app/notes/filter/${tag}`,
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
}

export default async function Notes({ params }: PropsFilter) {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', tag],
    queryFn: () =>
      fetchNotes({
        search: '',
        page: 1,
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}