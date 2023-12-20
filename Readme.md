# k8s-resource-parser (node)

> Parses the strings used by Kubernetes (K8s) to represent memory and cpu requests and limits.

Only use when you expect correct strings (e.g. coming directly from the K8s API), as the parser isn't designed to handle maliciously-crafted inputs.

Example:

```js
const { parseQuantity } = require('k8s-resource-parser');

parseQuantity("300m"); // Returns 0.3
parseQuantity("2K"); // Returns 2000
parseQuantity("2Ki"); // Returns 2048
```

Note that kubernetes doesn't represent these quantities as floats internally, so there may be slight discrepancies in the parse results given by this package and the results used in Kubernetes (thanks to floating point imprecision).
