export function getFirstRowWordCount(userWords: string[], fieldWidth: number, wordPx: number): number {

  let totalRowLengthPx = 0;
  console.log("calculating first row length")

  for (let i = 0; i < userWords.length; i++) {

    const wordLengthPx = (userWords[i].length * wordPx) + wordPx; // counting whitespace too
    
    if ((totalRowLengthPx + wordLengthPx) > fieldWidth) {
      return i
    }

    totalRowLengthPx += wordLengthPx;

  }

  return 0

}