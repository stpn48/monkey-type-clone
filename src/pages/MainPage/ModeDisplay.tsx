import { useTypingFieldStore } from "@/state/typingFieldStore";
import { Timer } from "./Timer";
import { WordCount } from "./WordCount";
import { useThemeStore } from "@/state/themeStore";

type Props = {};

export default function ModeDisplay({}: Props) {
  const { currGameMode } = useTypingFieldStore();

  const theme = useThemeStore(state => state.theme);

  return (
    <div className="absolute text-2xl left-4 -top-10 font-roboto-mono" style={{color: theme.mainColor}}>
      {currGameMode === "time" ? <Timer /> : <WordCount />}
    </div>
  );
}
