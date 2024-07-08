export function fetchWords(amount: number) {
  const words = [
    "apple",
    "banana",
    "cherry",
    "date",
    "elderberry",
    "fig",
    "grape",
    "honeydew",
    "kiwi",
    "lemon",
    "mango",
    "nectarine",
    "orange",
    "papaya",
    "quince",
    "raspberry",
    "strawberry",
    "tangerine",
    "ugli",
    "vanilla",
    "watermelon",
    "xigua",
    "yam",
    "zucchini",
    "apricot",
    "blackberry",
    "cantaloupe",
    "dragonfruit",
    "eggplant",
    "feijoa",
    "guava",
    "huckleberry",
    "imbe",
    "jackfruit",
    "kumquat",
    "lime",
    "mulberry",
    "nutmeg",
    "olive",
    "peach",
    "quandong",
    "rambutan",
    "soursop",
    "tamarind",
    "ugni",
    "voavanga",
    "wolfberry",
    "ximenia",
    "yuzu",
    "zapote",
  ];

  const randomWords = [];

  for (let i = 0; i < amount; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    randomWords.push(words[randomIndex]);
  }

  return randomWords;
}
