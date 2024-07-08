import { useModeStore } from "@/state/modeStore";
import { useStatsStore } from "@/state/statsStateStore";
import { useThemeStore } from "@/state/themeStore";
import { useTypingFieldStore } from "@/state/typingFieldStore";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatTime } from "@/utils/formatTime";

type Props = {};

export function Timer({}: Props) {
  const navigate = useNavigate();

  const { isTyping, setIsTyping, setCurrWordIndex, setUserWords, setCurrRowDistancePx, setCurrRow } = useTypingFieldStore();

  const { resetStats } = useStatsStore();

  const { timeoutMs } = useModeStore();

  const theme = useThemeStore((state) => state.theme);

  const [timeMs, setTimeMs] = useState(timeoutMs);

  const intervalId = useRef<number | null>(null);
  const timeoutId = useRef<number | null>(null);

  function handleReset() {
    setUserWords([""]);
    setCurrWordIndex(0);
    setIsTyping(false);
    resetStats();
    setTimeMs(timeoutMs);
    setCurrRow(0);
    setCurrRowDistancePx(0);
  }

  useEffect(() => {
    setTimeMs(timeoutMs);
  }, [timeoutMs]);

  useEffect(() => {
    if (isTyping) {
      console.log("timer starting...");
      intervalId.current = setInterval(() => {
        setTimeMs((prev) => prev - 1000);
      }, 1000);
      timeoutId.current = setTimeout(() => {
        navigate("/results");
      }, timeoutMs);
    }

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [isTyping, timeoutMs]);

  return <div className="hover:cursor-pointer" onClick={handleReset}>{formatTime(timeMs)}</div>;
}


