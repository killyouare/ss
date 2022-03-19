const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "/api-cafe",
  transpileDependencies: true,
  devServer: {
    port: 3000,
  },
});
