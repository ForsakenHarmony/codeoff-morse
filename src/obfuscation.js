const { symbolTimes } = require('./util');

//TODO: try to make smaller? maybe?
const obfuscateSymbol = symbol => {
  let last  = '';
  let index = 0;
  let count = 1;
  return symbol.split('').reduce((out, e) => {
    if (last === e) {
      count++;
    } else {
      index++;
      count = 1;
    }
    last = e;
    
    if (e === '.') {
      out[index] = count; // this could go above 9 with invalid input
    } else if (e === '-') {
      out[index] = String.fromCharCode(count + 64);
    } else {
      out[++index] = e;
    }
    
    return out;
  }, []).join('');
};

const obfuscate = morse =>
  morse.split('/').map(
    word => word.split('|').map(
      obfuscateSymbol
    ).join('|')
  ).join('/');

const deobfuscate = obfuscated =>
  obfuscated.replace(/([a-z])/g, match => symbolTimes('-', match.charCodeAt(0) - 96))
            .replace(/([A-Z])/g, match => symbolTimes('-', match.charCodeAt(0) - 64))
            .replace(/([0-9])/g, match => symbolTimes('.', parseInt(match)));

module.exports = { obfuscate, deobfuscate };
