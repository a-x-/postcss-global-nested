var postcss = require('postcss');

module.exports = postcss.plugin("postcss-global-nested", () => {
  return root => {
    root.walkRules(rule => {
      rule.selector = rule.selector
        .split(",")
        .map(selector => selector.trim().replace(/:global\s+([\w\W]+)/, ":global($1)"))
        .join(", ")
    });
  };
});
