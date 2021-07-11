module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: "commonjs"
      }
    ]
  ],
  plugins: [
    // https://www.npmjs.com/package/babel-plugin-add-module-exports
    "add-module-exports"
  ]
};