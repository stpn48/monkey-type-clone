import { useModeStore } from "@/state/modeStore";
import { useStatsStore } from "@/state/statsStateStore";
import { useThemeStore } from "@/state/themeStore";
import { useTypingFieldStore } from "@/state/typingFieldStore";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

export function WordCount({}: Props) {
  const navigate = useNavigate();

  const {
    setUserWords,
    setCurrWordIndex,
    setIsTyping,
    setCurrRow,
    setCurrRowDistancePx,
    isTyping,
  } = useTypingFieldStore();

  const { resetStats } = useStatsStore();

  const { setWordCount } = useModeStore();

  const { totalWordsTyped, setTimeTypingMs } = useStatsStore();

  const { wordCount } = useModeStore();

  const intervalId = useRef<number | null>(null);

  function handleReset() {
    setUserWords([""]);
    setCurrWordIndex(0);
    setIsTyping(false);
    setWordCount(wordCount);
    resetStats();
    setCurrRow(0);
    setCurrRowDistancePx(0);
  }

  useEffect(() => {
    if (isTyping) {
      intervalId.current = setInterval(() => {
        setTimeTypingMs((prev) => prev + 1000);
      }, 1000);
    }
  }, [isTyping]);

  useEffect(() => {
    if (totalWordsTyped === wordCount) {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
      navigate("/results");
    }
  }, [totalWordsTyped]);

  return (
    <div className="hover:cursor-pointer" onClick={handleReset}>
      {totalWordsTyped}/{wordCount}
    </div>
  );
}
