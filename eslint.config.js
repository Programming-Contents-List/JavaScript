import es5Plugin from "eslint-plugin-es5";

export default [
  {
    ignores: ["eslint.config.js"],
    plugins: {
      es5: es5Plugin
    },
    rules: {
      "no-var": "off",
      ...es5Plugin.configs["no-es2015"].rules
    }
  }
];