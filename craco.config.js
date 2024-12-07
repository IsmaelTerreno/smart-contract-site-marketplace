module.exports = {
  babel: {
    plugins: [
      // Enable support for optional chaining (?.)
      "@babel/plugin-proposal-optional-chaining",
      // Enable support for nullish coalescing (??)
      "@babel/plugin-proposal-nullish-coalescing-operator",
      // Enable support for class properties
      "@babel/plugin-proposal-class-properties",
    ],
  },
};
