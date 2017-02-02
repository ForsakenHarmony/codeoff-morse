const { invert } = require('./util');

const alphabet = {
  'A': '.-',
  'B': '-...',
  'C': '-.-.',
  'D': '-..',
  'E': '.',
  'F': '..-.',
  'G': '--.',
  'H': '....',
  'I': '..',
  'J': '.---',
  'K': '-.-',
  'L': '.-..',
  'M': '--',
  'N': '-.',
  'O': '---',
  'P': '.--.',
  'Q': '--.-',
  'R': '.-.',
  'S': '...',
  'T': '-',
  'U': '..-',
  'V': '...-',
  'W': '.--',
  'X': '-..-',
  'Y': '-.--',
  'Z': '--..',
  '0': '-----',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
  '.': '.-.-.-',
  ',': '--..--',
  
  '\n': '\n',
};

const reversed = invert(alphabet);

const toMorseCode = plain =>
  plain.toUpperCase().split(' ')
       .map(word =>
         word.split('')
             .map(
               char => alphabet[char] || '$'
             ).join('|')
       ).join('/');

const toPlaintext = morse =>
  morse.split('/')
       .map(
         word =>
           word.split('|')
               .map(
                 char => reversed[char] || '$'
               ).join('')
       ).join(' ');

module.exports = { toMorseCode, toPlaintext };
