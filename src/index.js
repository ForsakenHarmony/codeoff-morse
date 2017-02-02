const morse       = require('./morse');
const obfuscation = require('./obfuscation');

const encryptMessage = plain =>
  obfuscation.obfuscate(morse.toMorseCode(plain));

const decryptMessage = encrypted =>
  morse.toPlaintext(obfuscation.deobfuscate(encrypted));

module.exports = {
  morse,
  obfuscation,
  encryptMessage,
  decryptMessage
};
