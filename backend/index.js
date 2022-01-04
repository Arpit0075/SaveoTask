const http = require("http");
const port = process.env.PORT || 3001;

let start;
let count = 0;
let now;
const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "*");

  count += 1;
  if (count === 1) {
    start = Date.now();
  }
  now = Date.now();

  //console.log(start, now, count);
  //console.log(now - start);

  if (count > 3 && now - start >= 10 * 1000) {
    res.end(JSON.stringify({ message: "Hey There!!" }));
    count = 0;
    now = 0;
    start = 0;
  } else if (count > 3 && now - start <= 10 * 1000) {
    //res.write("cannot request more than 3 requests within 10 seconds");
    res.end(
      JSON.stringify({
        error: "cannot request more than 3 requests within 10 seconds",
      })
    );
    count = 0;
    start = 0;
    now = 0;
  } else {
    res.end(JSON.stringify({ message: "Hey There!!" }));
  }
});

server.listen(port, () => {
  console.log("Server Connected!!");
});
