import { useThemeStore } from "@/state/themeStore";

type Props = {
  word: string;
  userWord: string | undefined;
};

export function Word({ word, userWord }: Props) {

  const extraLetters = getExtraLetters(word, userWord);
  const theme = useThemeStore((state) => state.theme);


  return (
    <>
      <div className={`flex break-words`}>
        {word.split("").map((letter, letterIndex) => {
          const userLetter = userWord ? userWord[letterIndex] : undefined;
          const letterColor = getLetterColor(
            userLetter,
            letter,
          );

          return (
            <div
              key={letterIndex}
              style={{
                color: letterColor,
              }}
            >
              {letter}
            </div>
          );
        })}
        {extraLetters.map((extraLetter, extraLetterIndex) => (
          <div
            key={extraLetterIndex}
            style={{
              color: theme.errorExtraColor,
            }}
          >
            {extraLetter}
          </div>
        ))}
        <div>&nbsp;</div>
      </div>
    </>
  );
}

function getLetterColor(
  userLetter: string | undefined,
  letter: string,
) {
  const theme = useThemeStore.getState().theme;

  if (userLetter === undefined) {
    return theme.mainText;
  } else if (userLetter === letter) {
    return theme.textColor;
  } else {
    return theme.errorColor;
  }
}

function getExtraLetters(word: string, userWord: string | undefined) {
  let extraLetters: string[] = [];

  if (userWord && word.length < userWord.length) {
    extraLetters = userWord.slice(word.length).split("");
  }

  return extraLetters;
}
