// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "QUANTITY", "symbols": ["SIGNED_NUMBER", "UNIT"], "postprocess":  (data) => {
        const [number, unit] = data;
            const unitString = unit.flat(Infinity).join('');
            return unitString.length ? { number, unit: unitString } : { number };
          }
        },
    {"name": "DIGIT", "symbols": [/[0-9]/]},
    {"name": "DIGITS", "symbols": ["DIGIT"]},
    {"name": "DIGITS", "symbols": ["DIGIT", "DIGITS"]},
    {"name": "NUMBER", "symbols": ["DIGITS"]},
    {"name": "NUMBER", "symbols": ["DIGITS", {"literal":"."}, "DIGITS"]},
    {"name": "NUMBER", "symbols": ["DIGITS", {"literal":"."}]},
    {"name": "NUMBER", "symbols": [{"literal":"."}, "DIGITS"]},
    {"name": "SIGN", "symbols": [{"literal":"+"}]},
    {"name": "SIGN", "symbols": [{"literal":"-"}]},
    {"name": "SIGNED_NUMBER_NO_EXPONENTIAL_PART$subexpression$1", "symbols": ["NUMBER"]},
    {"name": "SIGNED_NUMBER_NO_EXPONENTIAL_PART$subexpression$1", "symbols": ["SIGN", "NUMBER"]},
    {"name": "SIGNED_NUMBER_NO_EXPONENTIAL_PART", "symbols": ["SIGNED_NUMBER_NO_EXPONENTIAL_PART$subexpression$1"], "postprocess":  data =>
        Number(data.flat(Infinity).join("").replace(/^\+/, ''))
        },
    {"name": "SIGNED_NUMBER$subexpression$1$ebnf$1", "symbols": ["DECIMAL_EXPONENT"], "postprocess": id},
    {"name": "SIGNED_NUMBER$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "SIGNED_NUMBER$subexpression$1", "symbols": ["SIGNED_NUMBER_NO_EXPONENTIAL_PART", "SIGNED_NUMBER$subexpression$1$ebnf$1"]},
    {"name": "SIGNED_NUMBER", "symbols": ["SIGNED_NUMBER$subexpression$1"], "postprocess": 
        function (data) {
        	const [[num, exponential_part]] = data;
          // k8s allows the exponential to be a decimal;
          // js only allows ints in its numeric literal strings, so we must
              // do the math ourselves.
          return exponential_part ? num * (10 ** exponential_part[1]) : num;
        }
        },
    {"name": "UNIT", "symbols": ["BINARY_SI"]},
    {"name": "UNIT", "symbols": ["DECIMAL_SI"]},
    {"name": "UNIT", "symbols": []},
    {"name": "BINARY_SI$subexpression$1$string$1", "symbols": [{"literal":"K"}, {"literal":"i"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BINARY_SI$subexpression$1", "symbols": ["BINARY_SI$subexpression$1$string$1"]},
    {"name": "BINARY_SI$subexpression$1$string$2", "symbols": [{"literal":"M"}, {"literal":"i"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BINARY_SI$subexpression$1", "symbols": ["BINARY_SI$subexpression$1$string$2"]},
    {"name": "BINARY_SI$subexpression$1$string$3", "symbols": [{"literal":"G"}, {"literal":"i"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BINARY_SI$subexpression$1", "symbols": ["BINARY_SI$subexpression$1$string$3"]},
    {"name": "BINARY_SI$subexpression$1$string$4", "symbols": [{"literal":"T"}, {"literal":"i"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BINARY_SI$subexpression$1", "symbols": ["BINARY_SI$subexpression$1$string$4"]},
    {"name": "BINARY_SI$subexpression$1$string$5", "symbols": [{"literal":"P"}, {"literal":"i"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BINARY_SI$subexpression$1", "symbols": ["BINARY_SI$subexpression$1$string$5"]},
    {"name": "BINARY_SI$subexpression$1$string$6", "symbols": [{"literal":"E"}, {"literal":"i"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BINARY_SI$subexpression$1", "symbols": ["BINARY_SI$subexpression$1$string$6"]},
    {"name": "BINARY_SI", "symbols": ["BINARY_SI$subexpression$1"]},
    {"name": "DECIMAL_SI$subexpression$1", "symbols": [{"literal":"m"}]},
    {"name": "DECIMAL_SI$subexpression$1", "symbols": [{"literal":"k"}]},
    {"name": "DECIMAL_SI$subexpression$1", "symbols": [{"literal":"M"}]},
    {"name": "DECIMAL_SI$subexpression$1", "symbols": [{"literal":"G"}]},
    {"name": "DECIMAL_SI$subexpression$1", "symbols": [{"literal":"T"}]},
    {"name": "DECIMAL_SI$subexpression$1", "symbols": [{"literal":"P"}]},
    {"name": "DECIMAL_SI$subexpression$1", "symbols": [{"literal":"E"}]},
    {"name": "DECIMAL_SI", "symbols": ["DECIMAL_SI$subexpression$1"]},
    {"name": "DECIMAL_EXPONENT$subexpression$1", "symbols": [/[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "DECIMAL_EXPONENT", "symbols": ["DECIMAL_EXPONENT$subexpression$1", "SIGNED_NUMBER"]}
]
  , ParserStart: "QUANTITY"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
