#! /usr/bin/env node
const codeoff = require('..');

const commands = {
  'encrypt'    : input => codeoff.encryptMessage(input),
  'decrypt'    : input => codeoff.decryptMessage(input),
  'tomorse'    : input => codeoff.morse.toMorseCode(input),
  'toplain'    : input => codeoff.morse.toPlaintext(input),
  'obfuscate'  : input => codeoff.obfuscation.obfuscate(input),
  'deobfuscate': input => codeoff.obfuscation.deobfuscate(input),
};

(() => {
  const args = process.argv.splice(2);
  
  if (args.length > 2) {
    console.error('Too many arguments (max 2)');
    return;
  }
  
  if (args.length < 2) {
    console.error('Missing arguments, should be `codeoff command text`');
    return;
  }
  
  const command = commands[args[0]];
  
  if (!command) {
    console.error('Command not found');
    console.error('Available commands are: ', Object.keys(commands).join(', '));
    return;
  }
  
  const result = command(args[1]);
  
  console.log(`> ${result}`);
})();
