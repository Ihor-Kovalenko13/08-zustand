import { fetchNotes } from '@/lib/api';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';

type PageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export default async function Notes({ params }: PageProps) {
  const { slug } = await params;

  const tag = slug?.[0] ?? 'all';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', { tag }],
    queryFn: () =>
      fetchNotes({
        page: 1,
        tag: tag === 'all' ? undefined : tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
