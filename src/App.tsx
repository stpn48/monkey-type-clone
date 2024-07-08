import { Outlet } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { useThemeStore } from "./state/themeStore";
import { ThemeChange } from "./pages/MainPage/ThemeChange";

function App() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <div
      className={`relative h-screen font-satoshi p-4 flex flex-col items-center`}
      style={{ background: theme.bgColor }}
    >
      <NavBar />
      <Outlet />
      <ThemeChange />
    </div>
  );
}

export default App;
