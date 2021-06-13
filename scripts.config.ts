import { DenonConfig } from "https://deno.land/x/denon@2.4.7/mod.ts";

const config: DenonConfig = {
  scripts: {
    test: {
      cmd: "deno test",
      allow: ["write", "read"],
      watch: false,
    },
    fmt: {
      cmd: "deno fmt --ignore=README.md,README_JP.md,./.github/,.vscode/",
      watch: false,
    },
  },
};

export default config;
