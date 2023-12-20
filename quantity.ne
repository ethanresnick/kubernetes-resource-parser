# A Nearley Grammar for Kubernetes Quantities.
#
# Here's the grammar reference in the k8s project from which this was derived:
# https://github.com/kubernetes/apimachinery/blob/master/pkg/api/resource/quantity.go#L38
#
# Background on Nearley itself is available here https://nearley.js.org/
# Cf. https://en.wikipedia.org/wiki/Earley_parser
#
# I'm pretty sure nearely is not the most-appropriate or performant parsing
# algorithm to use (esp. since our grammar shouldn't be ambiguous), but, for
# strings this short, it really shouldn't matter. We're mostly using a grammar
# for correctness anyway, and nearley made the grammar easy to write.
#
# This does mean, though, that you probably shouldn't run the parser on
# uncontrolled user inupt, to avoid any sort of DOS attack.
#
# NB: kubernetes apparently (per above link) always stores the quantity as an
# (integer, unit) pair to avoid floating point precision issues, which requires
# rounding or truncating some values; we don't bother with this, meaning results
# may not _perfectly_ match kubernetes.
#
# NB: Kubernetes also seems to have a different concept called an "amount",
# which uses other possible units (e.g., `n`) and supports more precision, and
# is used in metrics APIs and such. See
# https://github.com/kubernetes/apimachinery/blob/e2f405af78de67e27b5dd5ceb1a3eca76331e4d5/pkg/api/resource/amount.go

QUANTITY -> SIGNED_NUMBER UNIT  {% (data) => {
		const [number, unit] = data;
    const unitString = unit.flat(Infinity).join('');
    return unitString.length ? { number, unit: unitString } : { number };
  }
%}

DIGIT -> [0-9]
DIGITS -> DIGIT | DIGIT DIGITS
NUMBER -> DIGITS | DIGITS "." DIGITS | DIGITS "." | "." DIGITS

SIGN -> "+" | "-"
SIGNED_NUMBER_NO_EXPONENTIAL_PART -> (NUMBER | SIGN NUMBER) {% data =>
	Number(data.flat(Infinity).join("").replace(/^\+/, ''))
%}

SIGNED_NUMBER -> (SIGNED_NUMBER_NO_EXPONENTIAL_PART DECIMAL_EXPONENT:?) {%
	function (data) {
		const [[num, exponential_part]] = data;
	  // k8s allows the exponential to be a decimal;
	  // js only allows ints in its numeric literal strings, so we must
      // do the math ourselves.
	  return exponential_part ? num * (10 ** exponential_part[1]) : num;
	}
%}

UNIT -> BINARY_SI | DECIMAL_SI | null

BINARY_SI -> ("Ki" | "Mi" | "Gi" | "Ti" | "Pi" | "Ei")
DECIMAL_SI -> ("m" | "k" | "M" | "G" | "T" | "P" | "E")
DECIMAL_EXPONENT -> "e"i SIGNED_NUMBER