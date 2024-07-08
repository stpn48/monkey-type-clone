import { useStatsStore } from "@/state/statsStateStore";
import { useThemeStore } from "@/state/themeStore";
import { useTypingFieldStore } from "@/state/typingFieldStore";
import { useNavigate } from "react-router-dom";

type Props = {};

export function NavBar({}: Props) {
  const theme = useThemeStore((state) => state.theme);

  const navigate = useNavigate();

  const {setUserWords, setCurrGameMode, setCurrWordIndex, setIsTyping, setCurrRow, setCurrRowDistancePx} = useTypingFieldStore()

  const {resetStats} = useStatsStore();

  function handleReset() {
    setUserWords([""]);
    setCurrWordIndex(0);
    setIsTyping(false);
    setCurrGameMode("time")
    resetStats();
    setCurrRow(0);
    setCurrRowDistancePx(0);
  }

  return (
    <div className={`text-xl flex `}>
      <h1
        className="text-2xl font-semibold font-SF-pro hover:cursor-pointer"
        onClick={() => {
          handleReset();
          navigate("/")
        }}
        style={{ color: theme.textColor }}
      >
        kokotype
      </h1>
    </div>
  );
}
