var postcss = require('postcss');

module.exports = postcss.plugin("postcss-global-nested", () => {
  return root => {
    root.walkRules(rule => {
      rule.selector = rule.selector.replace(/:global\s+([\w\W]+)/, ":global($1)")
    });
  };
});
