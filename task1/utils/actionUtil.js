const {
  alphabetLength,
  alphabetLowerCase,
  alphabetUpperCase
} = require('../alphabetData');

module.exports = (action, text, shift) => {
  const textLength = text.length;
  let newString = '';

  function writeEncodeNewChar(alphabetIndex, alphabet) {
    const newAlphabetIndex =
      alphabetIndex + shift < alphabetLength
        ? alphabetIndex + shift
        : (alphabetIndex + shift) % alphabetLength;
    newString = `${newString}${alphabet[newAlphabetIndex]}`;
  }

  function writeDecodeNewChar(alphabetIndex, alphabet) {
    const newAlphabetIndex =
      alphabetIndex - shift >= 0
        ? alphabetIndex - shift
        : alphabetLength + ((alphabetIndex - shift) % alphabetLength);
    newString = `${newString}${alphabet[newAlphabetIndex]}`;
  }

  for (let i = 0; i < textLength; i++) {
    let writeNewChar;
    if (action === 'decode') {
      writeNewChar = writeDecodeNewChar;
    } else if (action === 'encode') {
      writeNewChar = writeEncodeNewChar;
    } else {
      console.error('Enter proper action type - encode or decode');
      // eslint-disable-next-line no-process-exit
      process.exit(2);
    }

    const alphabetIndex = alphabetLowerCase.indexOf(text[i]);
    if (alphabetIndex >= 0) {
      writeNewChar(alphabetIndex, alphabetLowerCase);
    }
    if (alphabetIndex === -1) {
      const alphabetUpperCaseIndex = alphabetUpperCase.indexOf(text[i]);
      if (alphabetUpperCaseIndex >= 0) {
        writeNewChar(alphabetUpperCaseIndex, alphabetUpperCase);
      }
      if (alphabetUpperCaseIndex === -1) {
        newString = `${newString}${text[i]}`;
      }
    }
  }
  return newString;
};
