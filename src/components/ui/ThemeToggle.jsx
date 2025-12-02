import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../features/theme/themeSlice";
import { Sun, Moon } from "phosphor-react";

const ThemeToggle = () => {
  const { mode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-yellow-400 dark:hover:bg-gray-700"
      title="Toggle Theme"
    >
      {/* Icon Transition */}
      {mode === "light" ? (
        <Moon size={20} weight="bold" className="text-slate-700" />
      ) : (
        <Sun size={20} weight="fill" className="text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
