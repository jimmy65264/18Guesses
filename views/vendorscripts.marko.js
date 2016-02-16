function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<script src="/angular.js"></script><script src="/angular-animate.js"></script><script src="/angular-aria.js"></script><script src="/angular-material.js"></script><script src="/angular-ui-router.js"></script><script src="/socket.io/socket.io.js"></script><script src="/socket.js"></script>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);