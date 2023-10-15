import { useTheme } from "next-themes";
import { Button } from "@nextui-org/react";

import { FaSun, FaMoon } from "react-icons/fa";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  return (
    <Button isIconOnly variant="light" onClick={() => {
      setTheme(theme === "dark" ? "light" : "dark")
    }}>
      {
        theme === "dark" ? <FaSun /> : <FaMoon />
      }
    </Button>
  )
};