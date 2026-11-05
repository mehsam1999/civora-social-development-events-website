"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() =>
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
      }
      className="flex size-9 items-center justify-center rounded-full border border-[#dce8dc] bg-white text-[#315d48] transition-colors hover:bg-[#edf5ed] dark:border-[#34483b] dark:bg-[#20352a] dark:text-[#e4eee5] dark:hover:bg-[#2b4435]"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </button>
  );
};

export default ThemeToggle;