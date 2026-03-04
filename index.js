// Learning about different type of modules and how to use each one

/* CommonJS */

// Method 1: Get the module as object
const mod1 = require("./mod1"); // Receive module as an object, to use module func have to use .modFuncName()
mod1.commonjs();
mod1.commonjs2();

// Method 2: Destructuring the function(s)
const { commonjs, commonjs2 } = require("./mod1");
console.log("Method 2:");
commonjs();
commonjs2();
