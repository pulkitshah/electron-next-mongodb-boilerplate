import replace from "@rollup/plugin-replace";
import autoExternal from "rollup-plugin-auto-external";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

export default {
  input: "main/background.js",
  output: {
    dir: "app",
    format: "cjs",
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    autoExternal(),
    nodeResolve(),
    commonjs(),
    json(),
  ],
  external: ["electron"],
};
