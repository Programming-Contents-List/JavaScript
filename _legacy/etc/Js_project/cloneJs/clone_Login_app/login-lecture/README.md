Use to Code in the Terminal
* npm install express -s (= npm install express --save) *

* npm install ejs -s *

start to browser 
* Cannot GET / => Not Found Get root *
  app.get으로 등록된 라우터가 없어서 그렇다.
* const router = express.Router(); *
Router()는 무엇인가.
* "use strict" *

req와 res의 차이를 정확히 모르겠다.
express를 사용하지 않고 const http = require("http");을 직접 사용하면 한글화 관리와 if문을 통한 여러 조건문을 작성해야하는 번거로움이 있다.

> * MVC패턴 *
Model, View, Controller 
> * MVP패턴 *
Model, View, Product

* package-lock.json은 확실한 버전관리를 하기 위해서다.