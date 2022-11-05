const express = require("express");
const app = express();
const port = 3000;

/**********로거 출력용 logger(=winston), morgan**********/
//const logger = require('./config/winston');
global.logger || (global.logger = require("./config/logger")); // → 윈스턴 로거를 전역에서 사용
const morganMiddleware = require("./middlewares/morganMiddleware");
app.use(morganMiddleware); // 콘솔창에 통신결과 나오게 해주는 것

/**이 전역 코드는 상태별로 무지개색 확인하시라고 첨부한 것이니, 확인후 지우시면 됩니다. */
app.use((req, res, next) => {
  logger.info("로그 출력 test용 middleware");
  logger.error("error 메시지");
  logger.warn("warn 메시지");
  logger.info("info 메시지");
  logger.http("http 메시지");
  logger.debug("debug 메시지");
  next();
});

/**마찬가지로 시험삼아 api클라이언트로 신호 보내보시라고 적어둡니다. 확인 후 지우시면 됩니다. */
app.get("/", (req, res) => {
  logger.info("GET /");
  res.sendStatus(200);
});

app.get("/error", (req, res) => {
  logger.error("Error message");
  res.sendStatus(500);
});

app.listen(port, () => {
  logger.info(port, "포트로 서버가 열렸어요!");
});
