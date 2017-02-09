const { symbolTimes } = require('./util');

const obfuscateSymbol = symbol => {
  if(!/[\.\-]+/.test(symbol)) return symbol;

  let match = symbol.match(/(\.+|\-+)/g);

  return match.reduce((out,e)=>{
    let count = e.length;
    if(e[0] === '.') {
      out.push(count);
    } else {
      out.push(String.fromCharCode(count + 64));
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
