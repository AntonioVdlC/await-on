module.exports = {
  "*.ts": ["tsc --noEmit", "prettier --write"],
  "*.js": ["prettier --write", "eslint --fix"],
};
