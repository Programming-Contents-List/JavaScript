## 사용한 npm
npm init
npm i express mongoose express-session ejs multer dotenv
npm  i -D nodemon

* .env의 기능이란 무엇인가. *
* "start": "nodemon app.js" *   
    
nodemon app.js를 사용하는 이유는?

[error code]
ref : https://velog.io/@bami/%EC%97%90%EB%9F%AC%ED%95%B4%EA%B2%B0-MongoParseError-option-usefindandmodify-is-not-supported

"[nodemon] app crashed - waiting for file changes before starting..."
"MongoParseError: option usenewparser is not supported at parseOptions"
code : mongoose.connect(process.env.DB_URI, { useNewParser: true }); => mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });



[error code]
MongoServerSelectionError: connect ECONNREFUSED ::1:27017
* 문제 원인 *
1. MongoDB 서버가 실행 중이지 않거나 포트가 잘못 설정되었습니다: 오류 메시지에서 ECONNREFUSED는 서버로의 연결이 거부되었다는 것을 의미합니다. 따라서 먼저 MongoDB 서버가 실행 중인지 확인하고, MongoDB의 기본 포트인 27017로 연결할 수 있는지 확인해야 합니다.

2. MongoDB 서버에 접근 권한이 없습니다: MongoDB 서버에 접근하기 위해서는 올바른 URI와 액세스 권한이 필요합니다. 올바른 URI를 사용하는지와 MongoDB 서버에 접근할 수 있는 권한을 가지고 있는지 확인해주세요.

3. 네트워크 설정 문제: 때로는 네트워크 설정이나 방화벽 설정 등의 이유로 서버와의 연결이 차단될 수 있습니다. 네트워크 설정을 확인하여 이러한 문제를 해결해야 합니다.

4. MongoDB 서버가 로컬 머신이 아닌 다른 호스트에 위치하는 경우: MongoDB 서버가 로컬 머신이 아닌 다른 호스트에 위치한다면, MongoDB URI에 해당 호스트 정보를 제대로 포함시켜야 합니다.

ref : https://ducks228.tistory.com/entry/window-10-MongoDB-%EC%99%B8%EB%B6%80%EC%A0%91%EC%86%8D-%EC%84%A4%EC%A0%95

<!-- -> mongdb --version 설치 및 버전 확인 여부 => 설치가 안되어 있었음
Program Files에서도 확인이 되지 않아 cmd를 통해 버전을 확인한 결과 설치 되어 있지 않았음
ref : https://khj93.tistory.com/entry/MongoDB-Window%EC%97%90-MongoDB-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0 -->