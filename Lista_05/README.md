Calculator
===

Install
------

Install the command line tool `falandes_calculator_example`

    npm install -g falandes_calculator_example

Install locally to use as a module

    npm install falandes_calculator_example

Usage
-----

Command line

    falandes_calculator_example

As a module

``` js
const calculator_exp = require("falandes_calculator_example");
const Calculator = calculator_exp.Calculator
```

Example
---------

``` js
var calculation = new Calculator(4,5);

//effect sum
console.log(calculation.sum()); //  ==> 9

//effect subtraction
console.log(calculation.subtraction()); //  ==> -1
```

Functions
---------
### sum()
Performs and returns the sum of two numbers already defined
``` js
.sum()
```

### subtraction()
Performs and returns the subtraction of two numbers already defined
``` js
.subtraction()
```

Test
----

    npm <file name>
