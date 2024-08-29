import { useModeStore } from "@/state/modeStore";
import { useStatsStore } from "@/state/statsStateStore";
import { useThemeStore } from "@/state/themeStore";
import { useTypingFieldStore } from "@/state/typingFieldStore";
import { useState } from "react";

type Props = {};

export function ResultsPage({}: Props) {

  const {
    mistakes,
    totalLettersTyped,
    totalWordsTyped,
    timeTypingMs,
  } = useStatsStore();

  const {
    currGameMode,
  } = useTypingFieldStore();

  const { timeoutMs } = useModeStore();

  const theme = useThemeStore((state) => state.theme);

  const [wpmDetailsActive, setWpmDetailsActive] = useState(false);
  const [percentDetailsActive, setPercentDetailsActive] = useState(false);

  const timeSeconds = timeoutMs / 1000;
  const timeMinutes = timeSeconds / 60;

  const timeSecondsWordCount = timeTypingMs / 1000;
  const timeMinutesWordCount = timeSecondsWordCount / 60;

  const correctLetters = totalLettersTyped - mistakes;
  const accuracyPercent = (correctLetters / (correctLetters + mistakes)) * 100;

  const wpmTimeMode = totalWordsTyped / timeMinutes;
  const wpmWordCountMode = totalWordsTyped / timeMinutesWordCount;

  return (
    <div className="absolute p-4 left-5 top-10">
      <h1 className="text-2xl" style={{ color: theme.mainText }}>
        wpm
      </h1>
      <h1
        className="text-6xl hover:cursor-pointer"
        style={{ color: theme.mainColor }}
        onMouseEnter={() => setWpmDetailsActive(true)}
        onMouseLeave={() => setWpmDetailsActive(false)}
      >
        {currGameMode === "time"
          ? wpmTimeMode.toFixed(0)
          : wpmWordCountMode.toFixed(0)}
      </h1>
      {wpmDetailsActive && (
        <div className="absolute px-2 py-1 transition-all bg-black rounded-md top-3 w-fit">
          <h1 style={{color: theme.textColor}}>{wpmTimeMode.toFixed(2)} wpm</h1>
        </div> 
      )}

      <h1 className="text-2xl" style={{ color: theme.mainText }}>
        acc
      </h1>
      <h1
        className="text-6xl hover:cursor-pointer"
        style={{ color: theme.mainColor }}
        onMouseEnter={() => setPercentDetailsActive(true)}
        onMouseLeave={() => setPercentDetailsActive(false)}
      >
        {accuracyPercent.toFixed(0)}%
      </h1>
      {percentDetailsActive && (
        <div className="absolute px-2 py-1 transition-all bg-black rounded-md top-26 w-fit" style={{whiteSpace: "nowrap"}}>
          <h1 style={{color: theme.textColor}}>{accuracyPercent.toFixed(2)}% ({correctLetters} correct / {mistakes} incorrect)</h1>
        </div> 
      )}

      <h1 className="text-2xl" style={{ color: theme.mainText }}>
        time
      </h1>
      <h1
        className="text-6xl hover:cursor-pointer"
        style={{ color: theme.mainColor }}
      >
        {currGameMode === "time" ? timeSeconds : timeSecondsWordCount}s
      </h1>
    </div>
  );
}
