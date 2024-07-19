"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { github } from "../utils/Icons";
import ThemeDropdown from "./ThemeDropdown/ThemeDropdown";
import SearchDialog from "./SearchDialog/SearchDialog";
import { useGlobalContext } from "../context/globalContext";

function Navbar() {
  const router = useRouter();




  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="left-part"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog />
        <div className="btn-group flex items-center gap-2">
          <ThemeDropdown />
          <Button
            className="source-code flex gap-2 items-center"
            onClick={() =>
              router.push("https://github.com/tarunaksha/weatherwisp")
            }
          >
            {github} Source Code
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
