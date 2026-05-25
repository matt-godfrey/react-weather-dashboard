import type { Dispatch, SetStateAction } from "react";
import Hamburger from "/src/assets/hamburger.svg?react";
import LightDarkToggle from "./LightDarkToggle";

interface MobileHeaderProps {
  setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MobileHeader({
  setIsSidePanelOpen,
}: MobileHeaderProps) {
  return (
    <div className="w-full h-16 p-4 bg-background sticky top-0 xs:hidden flex gap-8 justify-end z-1001">
      <LightDarkToggle />
      <button
        onClick={() => setIsSidePanelOpen(true)}
        // className="hidden xs:block"
      >
        <Hamburger className="size-6 ml-auto" />
      </button>
    </div>
  );
}
