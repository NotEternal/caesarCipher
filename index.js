'use strict';

const inputText = document.querySelector('.input-text');
const outputText = document.querySelector('.output-text');
const offset = document.querySelector('.offset');
const offsetElementValue = document.querySelector('.offset-value');

const A_CODE = 'a'.charCodeAt();
const Z_CODE = 'z'.charCodeAt();

const returnNewLetter = (letter, offset, method) => {
  let resultCode = '';

  if (method === 'encrypt') {
    resultCode = letter.charCodeAt() + +offset;

    if (resultCode > Z_CODE) {
      resultCode = A_CODE + (resultCode - Z_CODE - 1);
    }
  } else if (method === 'decipher') {
    resultCode = letter.charCodeAt() - +offset;

    if (resultCode < A_CODE) {
      resultCode = Z_CODE - (A_CODE - resultCode - 1);
    }
  }

  return String.fromCharCode(resultCode);
};

const returnNewText = (text, offset, method) => {
  let resultStr = '';

  for (let letter of text) {
    if (
      letter === ' ' ||
      letter.charCodeAt() < A_CODE ||
      letter.charCodeAt() > Z_CODE
    ) {
      resultStr += letter;
    } else {
      resultStr += returnNewLetter(letter, offset, method);
    }
  }

  return resultStr;
};

let offsetEncrypt = 0;

offset.onchange = () => (offsetElementValue.textContent = offset.value);

document.querySelector('.btn-encrypt').onclick = () => {
  offsetEncrypt = offset.value;
  outputText.value = returnNewText(inputText.value, offset.value, 'encrypt');
};

document.querySelector('.btn-decipher').onclick = () => {
  if (outputText.value !== inputText.value && offsetEncrypt === offset.value) {
    outputText.value = returnNewText(
      outputText.value,
      offset.value,
      'decipher'
    );
  }
};
