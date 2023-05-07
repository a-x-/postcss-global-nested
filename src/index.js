const globalNested = () => {
  return {
    postcssPlugin: "postcss-global-nested",
    Rule(rule) {
      if (rule.selector.includes(":global")) {
        rule.selector = rule.selector
          .split(",")
          .map(selector => selector.trim().replace(/:global\s+([\w\W]+)/, ":global($1)"))
          .join(", ");
      }
    },
  };
};

globalNested.postcss = true;

module.exports = globalNested;
