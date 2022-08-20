const nearley = require("nearley");
const grammar = require("./quantity_grammar.js");

function cpuParser(input) {
  try {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    parser.feed(input);
    const [{ number, unit }] = parser.results;

    if (unit === "m") {
      return number / 1000;
    }

    return number;
  } catch (e) {
    throw new SyntaxError("Invalid quanity provided.");
  }
}

const memoryMultipliers = {
  k: 1000,
  M: 1000 ** 2,
  G: 1000 ** 3,
  T: 1000 ** 4,
  P: 1000 ** 5,
  E: 1000 ** 6,
  Ki: 1024,
  Mi: 1024 ** 2,
  Gi: 1024 ** 3,
  Ti: 1024 ** 4,
  Pi: 1024 ** 5,
  Ei: 1024 ** 6,
};

function memoryParser(input) {
  try {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    parser.feed(input);
    const [{ number, unit }] = parser.results;

    return unit ? number * memoryMultipliers[unit] : number;
  } catch (e) {
    throw new SyntaxError("Invalid quanity provided.");
  }
}

module.exports = {
  cpuParser,
  memoryParser,
};
