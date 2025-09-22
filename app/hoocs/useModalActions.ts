import { useRouter, useSearchParams } from "next/navigation";

export function useModalActions() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const openSettingsModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('modalType', 'settings');
    router.replace(`?${params.toString()}`);
  }

  const closeModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('modalType');
    router.replace(`?${params.toString()}`);
  }

  return { 
    openSettingsModal, 
    closeModal 
  }
}