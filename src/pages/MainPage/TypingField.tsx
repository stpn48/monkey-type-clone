import { useTypingFieldStore } from "@/state/typingFieldStore";
import { fetchWords } from "@/utils/fetchWords";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Word } from "./Word";
import { useStatsStore } from "@/state/statsStateStore";
import { getFirstRowWordCount } from "@/utils/getFirstRowWordCount";
import { useThemeStore } from "@/state/themeStore";

const WORD_PX = 14.4;

type Props = {};

const MemoWord = React.memo(Word);

export function TypingField({}: Props) {
  const {
    currDisplayingWords,
    setCurrDisplayingWords,
    userWords,
    setUserWords,
    currWordIndex,
    setCurrWordIndex,
  } = useTypingFieldStore();

  const theme = useThemeStore(state => state.theme);

  const {currRowDistancePx, setCurrRowDistancePx, currRow, setCurrRow} = useTypingFieldStore();

  const [fieldWidth, setFieldWidth] = useState<number | null>(null);

  const typingFieldRef = useRef<HTMLDivElement>(null);

  // setting up initial words
  useEffect(() => {
    const initialWords = fetchWords(15);
    setCurrDisplayingWords(initialWords);
  }, []);

  useEffect(() => console.log(userWords), [userWords])

  // setting up event listeners
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      // if user pressed key between a-z
      if (/^[a-z]$/.test(e.key.toLowerCase())) {
        const limit = currDisplayingWords[currWordIndex].length * 2;

        typeLetter(
          e.key.toLowerCase(),
          limit,
          currRowDistancePx,
          setCurrRowDistancePx,
          fieldWidth,
          currWordIndex
        );
      }

      // else if user clicked backspace
      else if (e.key === "Backspace") {
        removeLetter(setCurrRowDistancePx);
      }

      // else if user clicked space
      else if (e.code === "Space") {
        const currDisplayingWord = currDisplayingWords[currWordIndex];
        const nextDisplayingWord = currDisplayingWords[currWordIndex + 1];
        moveToNextWord(
          currDisplayingWord,
          nextDisplayingWord,
          currRowDistancePx,
          setCurrRowDistancePx,
          setCurrRow,
          fieldWidth
        );
      }
    }

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [
    currDisplayingWords,
    currWordIndex,
    fieldWidth,
    currRowDistancePx,
    setCurrRowDistancePx,
    setCurrRow,
  ]);

  // handling field width
  useEffect(() => {
    if (typingFieldRef.current) {
      const measuredWidth = typingFieldRef.current.offsetWidth;
      console.log(`Measured field width: ${measuredWidth}`);
      setFieldWidth(measuredWidth);
    }
  }, [typingFieldRef.current?.offsetWidth]);

  //handling infinite scroll
  useEffect(() => {
    if (fieldWidth && currRow === 2) {
      handleUpdate();
    }
  }, [fieldWidth, currRow]);

  const handleUpdate = useCallback(() => {
    setCurrRow(1);

    const firstRowWordCount = getFirstRowWordCount(
      userWords,
      fieldWidth!,
      WORD_PX
    );

    console.log(firstRowWordCount);

    const newWords = fetchWords(firstRowWordCount);

    setUserWords((prev) => {
      const slicedWords = prev.slice(firstRowWordCount);
      return slicedWords;
    });

    setCurrDisplayingWords((prev) => {
      const updatedDisplayingWords = [
        ...prev.slice(firstRowWordCount),
        ...newWords,
      ];

      return updatedDisplayingWords;
    });

    setCurrWordIndex((prev) => prev - (firstRowWordCount - 1) - 1);
  }, [userWords, fieldWidth, WORD_PX, fetchWords]);

  return (
    <div
      className="relative flex flex-wrap max-w-3xl m-4 text-2xl font-roboto-mono"
      ref={typingFieldRef}
    >
      {currDisplayingWords.map((word, wordIndex) => {
        const userWord = userWords[wordIndex];
        return <MemoWord key={wordIndex} word={word} userWord={userWord} />;
      })}
      <div className="absolute" style={{color: theme.caretColor, top: currRow * 32, left: currRowDistancePx - 7}}>|</div>
    </div>
  );
}

function typeLetter(
  userLetter: string,
  limit: number,
  currRowDistancePx: number,
  setCurrRowDistancePx: React.Dispatch<React.SetStateAction<number>>,
  fieldWidth: number | null,
  currWordIndex: number
) {
  
  console.log("typing letter " + userLetter)
  console.log(fieldWidth)

  const { userWords, setUserWords, setIsTyping } =
    useTypingFieldStore.getState();

  const activeUserWordLength = userWords[userWords.length - 1].length;

  if (
    activeUserWordLength < limit &&
    fieldWidth &&
    currRowDistancePx + 28.8 < fieldWidth
  ) {
    const updatedUserWords = [...userWords];

    updatedUserWords[userWords.length - 1] += userLetter;

    if (currRowDistancePx === 0 && currWordIndex === 0) {
      console.log("user started typing...");
      setIsTyping(true);
    }

    setUserWords(updatedUserWords);
    setCurrRowDistancePx((c) => c + WORD_PX);
  }
}

function removeLetter(
  setCurrRowDistancePx: React.Dispatch<React.SetStateAction<number>>
) {
  const { userWords, setUserWords } = useTypingFieldStore.getState();

  const updatedUserWords = [...userWords];

  let updatedUserWord = updatedUserWords[updatedUserWords.length - 1];

  if (updatedUserWord.length > 0) {
    updatedUserWord = updatedUserWord.slice(0, updatedUserWord.length - 1);
    updatedUserWords[updatedUserWords.length - 1] = updatedUserWord;

    setUserWords(updatedUserWords);
    setCurrRowDistancePx((c) => c - WORD_PX);
  }
}

function moveToNextWord(
  currDisplayingWord: string,
  nextDisplayingWord: string,
  currRowDistancePx: number,
  setCurrRowDistancePx: React.Dispatch<React.SetStateAction<number>>,
  setCurrRow: React.Dispatch<React.SetStateAction<number>>,
  fieldWidth: number | null
) {
  const { userWords, setCurrWordIndex, setUserWords } =
    useTypingFieldStore.getState();

  const activeUserWordLength = userWords[userWords.length - 1].length;
  const nextDisplayingWordLengthPx =
    nextDisplayingWord.length * WORD_PX + WORD_PX;

  if (activeUserWordLength >= currDisplayingWord.length) {
    if (
      fieldWidth &&
      currRowDistancePx + 14.4 + nextDisplayingWordLengthPx >= fieldWidth
    ) {
      console.log("going to new row");
      setCurrRowDistancePx(0);
      setCurrRow((prev) => prev + 1);
    } else {
      console.log("going to next word");
      setCurrRowDistancePx((c) => c + WORD_PX);
    }

    setCurrWordIndex((prev) => prev + 1);
    setUserWords([...userWords, ""]);

    validateWord(userWords[userWords.length - 1], currDisplayingWord);
  }
}

export function validateWord(userWord: string, validWord: string) {
  const state = useStatsStore.getState();

  if (userWord.toLowerCase() === validWord.toLowerCase()) {
    state.setPerfectWords((prev) => prev + 1);
    state.setTotalLettersTyped((prev) => prev + userWord.length);
  } else {
    for (let i = 0; i < userWord.length; i++) {
      if (userWord[i].toLowerCase() !== validWord[i]?.toLowerCase()) {
        state.setMistakes((prev) => prev + 1);
      }
      state.setTotalLettersTyped((prev) => prev + 1);
    }
  }
  state.setTotalWordsTyped((prev) => prev + 1);
}
