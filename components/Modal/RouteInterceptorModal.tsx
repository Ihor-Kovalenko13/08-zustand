'use client';

import { useRouter } from 'next/navigation';
import Modal from '../Modal/Modal';

export default function RouteInterceptorModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const close = () => router.back();

  return <Modal onClose={close}>{children}</Modal>;
}