var mod = require("./module");
var i = 10;
var j = 20;
var sum = mod.add(i,j)
var product = mod.mul(i,j)

console.log (`sum is ${sum}`)
console.log (`product is ${product}`)
console.log (arguments.callee + "")