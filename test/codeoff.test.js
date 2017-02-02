const codeoff = require('..');
const assert  = require('assert');

describe('Codeoff tests', () => {
  it('can encrypt messages', () => {
    assert.equal(codeoff.encryptMessage('I AM IN TROUBLE'), '2/1A|B/2|A1/A|1A1|C|2A|A3|1A2|1');
    assert.equal(codeoff.encryptMessage('Hello, World.'), '4|1|1A2|1A2|C|B2B/1B|C|1A1|1A2|A2|1A1A1A');
  });
  
  it('can decrypt messages', () => {
    assert.equal(codeoff.decryptMessage('2/1A|B/2|A1/A|1A1|C|2A|A3|1A2|1'), 'I AM IN TROUBLE');
    assert.equal(codeoff.decryptMessage('4|1|1A2|1A2|C|B2B/1B|C|1A1|1A2|A2|1A1A1A'), 'Hello, World.'.toUpperCase());
  });
  
  it('escapes special characters', () => {
    assert.equal(codeoff.encryptMessage('#*+`?§'), '$|$|$|$|$|$');
    assert.equal(codeoff.decryptMessage('#*+`?§'), '$');
  });
  
  it('respects newlines', () => {
    assert.equal(codeoff.encryptMessage('Hello world.\nHow is it going'), '4|1|1A2|1A2|C/1B|C|1A1|1A2|A2|1A1A1A|\n|4|C|1B/2|3/2|A/B1|C|2|A1|B1');
    assert.equal(codeoff.decryptMessage('4|1|1A2|1A2|C/1B|C|1A1|1A2|A2|1A1A1A|\n|4|C|1B/2|3/2|A/B1|C|2|A1|B1'), 'Hello world.\nHow is it going'.toUpperCase());
  });
  
  describe('Morse tests', () => {
    it('can turn messages into morse code', () => {
      assert.equal(codeoff.morse.toMorseCode('I AM IN TROUBLE'), '../.-|--/..|-./-|.-.|---|..-|-...|.-..|.');
      assert.equal(codeoff.morse.toMorseCode('Hello, World.'), '....|.|.-..|.-..|---|--..--/.--|---|.-.|.-..|-..|.-.-.-');
    });
    
    it('can get messages from morse code', () => {
      assert.equal(codeoff.morse.toPlaintext('../.-|--/..|-./-|.-.|---|..-|-...|.-..|.'), 'I AM IN TROUBLE');
      assert.equal(codeoff.morse.toPlaintext('....|.|.-..|.-..|---|--..--/.--|---|.-.|.-..|-..|.-.-.-'), 'Hello, World.'.toUpperCase());
    });
    
    it('escapes special characters', () => {
      assert.equal(codeoff.morse.toMorseCode('#*+`?§'), '$|$|$|$|$|$');
      assert.equal(codeoff.morse.toPlaintext('#*+`?§'), '$');
    });
    
    it('respects newlines', () => {
      assert.equal(codeoff.morse.toMorseCode(
        'Hello world.\nHow is it going'),
        '....|.|.-..|.-..|---/.--|---|.-.|.-..|-..|.-.-.-|\n|....|---|.--/..|.../..|-/--.|---|..|-.|--.'
      );
      assert.equal(codeoff.morse.toPlaintext(
        '....|.|.-..|.-..|---/.--|---|.-.|.-..|-..|.-.-.-|\n|....|---|.--/..|.../..|-/--.|---|..|-.|--.'),
        'Hello world.\nHow is it going'.toUpperCase()
      );
    });
  });
  
  describe('Obfuscation tests', () => {
    it('can obfuscate morse code', () => {
      assert.equal(codeoff.obfuscation.obfuscate('../.-|--/..|-./-|.-.|---|..-|-...|.-..|.'), '2/1A|B/2|A1/A|1A1|C|2A|A3|1A2|1');
      assert.equal(codeoff.obfuscation.obfuscate('....|.|.-..|.-..|---|--..--/.--|---|.-.|.-..|-..|.-.-.-'), '4|1|1A2|1A2|C|B2B/1B|C|1A1|1A2|A2|1A1A1A');
    });
    
    it('can deobfuscate obfuscated morse code', () => {
      assert.equal(codeoff.obfuscation.deobfuscate('2/1A|B/2|A1/A|1A1|C|2A|A3|1A2|1'), '../.-|--/..|-./-|.-.|---|..-|-...|.-..|.');
      assert.equal(codeoff.obfuscation.deobfuscate('4|1|1A2|1A2|C|B2B/1B|C|1A1|1A2|A2|1A1A1A'), '....|.|.-..|.-..|---|--..--/.--|---|.-.|.-..|-..|.-.-.-');
    });
    
    it('ignores special characters', () => {
      assert.equal(codeoff.obfuscation.obfuscate('#*+`?§'), '#*+`?§');
      assert.equal(codeoff.obfuscation.deobfuscate('#*+`?§'), '#*+`?§');
    });
    
    it('respects newlines', () => {
      assert.equal(codeoff.obfuscation.obfuscate(
        '....|.|.-..|.-..|---/.--|---|.-.|.-..|-..|.-.-.-|\n|....|---|.--/..|.../..|-/--.|---|..|-.|--.'),
        '4|1|1A2|1A2|C/1B|C|1A1|1A2|A2|1A1A1A|\n|4|C|1B/2|3/2|A/B1|C|2|A1|B1'
      );
      assert.equal(codeoff.obfuscation.deobfuscate(
        '4|1|1A2|1A2|C/1B|C|1A1|1A2|A2|1A1A1A|\n|4|C|1B/2|3/2|A/B1|C|2|A1|B1'),
        '....|.|.-..|.-..|---/.--|---|.-.|.-..|-..|.-.-.-|\n|....|---|.--/..|.../..|-/--.|---|..|-.|--.'
      );
    });
  });
});
