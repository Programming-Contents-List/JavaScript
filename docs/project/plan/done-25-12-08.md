# ESLint + ES5 설정 가이드

## 단계 1: 설치

```bash
npm install -D eslint eslint-plugin-es5
```

## 단계 2: 설정 파일 생성

루트에 `.eslintrc.json` 생성:

```json
{
  "env": {
    "browser": true,
    "es5": true
  },
  "plugins": ["es5"],
  "extends": ["eslint:recommended", "plugin:es5/no-es2015"],
  "rules": {
    "no-var": "off",
    "strict": ["error", "function"]
  }
}
```

## 단계 3: Biome 역할 분리

```
+--------------------------------------------------+
|                   역할 분리                       |
+--------------------------------------------------+
|  Biome   -> 포맷팅만 담당 (코드 스타일)           |
|  ESLint  -> 린팅 담당 (ES5 문법 강제)             |
+--------------------------------------------------+
```

`biome.json` 수정:

```json
{
  "linter": {
    "enabled": false
  },
  "formatter": {
    "enabled": true
  }
}
```

## 단계 4: 실행 명령어

```bash
# ES5 문법 검사
npx eslint ./js

# 포맷팅
npx @biomejs/biome format ./js --write
```

## 단계 5: package.json 스크립트 (선택)

```json
{
  "scripts": {
    "lint": "eslint ./js",
    "format": "biome format ./js --write",
    "check": "npm run lint && npm run format"
  }
}
```
