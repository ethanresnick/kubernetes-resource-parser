const nearley = require("nearley");

const quantityGrammar = nearley.Grammar.fromCompiled(
  require("./quantity_grammar.js"),
);

const unitMultipliers = {
  m: 0.001,
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

function parseQuantity(input) {
  try {
    const parser = new nearley.Parser(quantityGrammar);
    parser.feed(input);

    const [{ number, unit }] = parser.results;
    return unit ? number * unitMultipliers[unit] : number;
  } catch (e) {
    throw new SyntaxError("Invalid quanity provided.");
  }
}

module.exports = {
  parseQuantity,
  cpuParser: parseQuantity,
  memoryParser: parseQuantity,
};
