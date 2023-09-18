const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/query", // 프록시할 요청 경로
    createProxyMiddleware({
      target: "http://localhost:3333", // 백엔드 서버 주소
      changeOrigin: true,
    })
  );
};
