module.exports = {
  "root": true,
  "extends": [
    "@akashic/eslint-config"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.json",
    "sourceType": "module",
    "tsconfigRootDir": __dirname
  }
}
