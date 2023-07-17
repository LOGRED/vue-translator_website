var express = require("express");
var app = express();

var request = require("request");

var client_id = "PhYbqqWdxWtDwiLgRd27";
var client_secret = "QMNnSV4ivK";
var query = "번역할 문장을 입력하세요.";

app.get("/translate", async function (req, res) {
  var api_url = "https://openapi.naver.com/v1/papago/n2mt";

  query = req.query.msg;
  //   let source = req.query.source;
  let target = req.query.lang;

  console.log(req.query);
  const lang = await checkLang(query);

  console.log(lang);

  var options = {
    url: api_url,
    form: { source: lang.langCode, target: target, text: query },
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };

  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //   res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.status(200).json(JSON.parse(body).message.result.translatedText);
    } else {
      console.log("error = " + response.statusCode);
      res.status(response.statusCode).json({ success: false });
    }
  });
});

const checkLang = (query) => {
  var api_url = "https://openapi.naver.com/v1/papago/detectLangs";

  var options = {
    url: api_url,
    form: { query: query },
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };

  return new Promise(function (resolve, reject) {
    request.post(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body));
      } else {
        reject({ success: false });
      }
    });
  });
};

app.listen(4000, () => {
  console.log(`Translate Server Start 4000`);
});
