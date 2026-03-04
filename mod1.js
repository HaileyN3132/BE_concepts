const commonjs = () => {
  console.log("Function commonjs() from mod1.js");
};

function commonjs2() {
  console.log("Function commonjs2() from mod1.js");
}

module.exports = { commonjs, commonjs2 };
