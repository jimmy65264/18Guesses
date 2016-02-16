function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      __loadTemplate = __helpers.l,
      __vendorstyles_marko = __loadTemplate(require.resolve("./vendorstyles.marko"), require),
      __vendorscripts_marko = __loadTemplate(require.resolve("./vendorscripts.marko"), require),
      __ngtemplates_marko = __loadTemplate(require.resolve("./ngtemplates.marko"), require);

  return function render(data, out) {
    out.w('<!DOCTYPE html> <html ng-app="realtime"><head><meta charset="utf-8"><title>Meetup Realtime Questions &amp; Feedback</title>');
    __helpers.i(out, __vendorstyles_marko, {});

    out.w('<link rel="stylesheet" , href="/app.css"></head><body><md-toolbar md-scroll-shrink class="md-normal"><div class="md-toolbar-tools"><span class="md-flex">Meetup Realtime Questions &amp; Feedback</span></div></md-toolbar><div ui-view></div>');
    __helpers.i(out, __vendorscripts_marko, {});
    __helpers.i(out, __ngtemplates_marko, {});

    out.w('<script src="/bindtable.js"></script><script src="/app.js"></script></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);