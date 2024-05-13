const transformTaggedTemplate =
  require("rollup-plugin-transform-tagged-template").default;
const typescript = require("@rollup/plugin-typescript");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const cleaner = require("rollup-plugin-cleaner");
// const copy = require("rollup-plugin-copy");
// const serve = require("rollup-plugin-serve");
const { terser } = require("rollup-plugin-terser");

console.log("What is process env", process.env.WCS_NAME);

module.exports = {
  input: process.env.WCS_PATH,
  output: {
    file: `dist/${process.env.WCS_NAME}.js`,
    name: process.env.WCS_NAME,
    format: "umd",
  },
  plugins: [
    transformTaggedTemplate({
      tagsToProcess: ["html", "css"],
      parserOptions: {
        sourceType: "module",
        plugins: [
          "typescript",
          ["decorators", { decoratorsBeforeExport: true }],
        ],
      },
      transformer(data) {
        data = data.replace(/\s([{}()>~+=^$:!;])\s/gm, "$1");
        data = data.replace(/([",[]])\s+/gm, "$1");
        data = data.replace(/\s{2,}/gm, " ");
        return data.trim();
      },
    }),
    typescript(),
    resolve(),
    commonjs(),
    cleaner({
      targets: ["dist"],
    }),
    // copy({
    //   targets: [{ src: "public/index.html", dest: "dist" }],
    // }),
    // serve({
    //   open: true,
    //   contentBase: "dist",
    // }),
    // terser(),
  ],
};
