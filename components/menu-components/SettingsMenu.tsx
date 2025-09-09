import { useSearchParams } from "next/navigation";

export default function SettingsMenu() {
  const modalType = useSearchParams().get('modalType')

  return (
    <>
      {modalType === "settings" && (
        <div className="settingsMenu">

        </div>
      )}
    </>
  );
}