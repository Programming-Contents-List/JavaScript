# Section2-3 고민에 대한 답변

## 질문 1: FSD 패턴과 같은 큰 덩어리를 다루는 패턴들은 어떻게 되는 것일까?

### FSD(Feature-Sliced Design)와 Layer 구조의 관계

**FSD의 핵심 개념:**
- FSD는 수평적 레이어(Layer)와 수직적 슬라이스(Slice)를 결합한 아키텍처입니다
- 레이어: app, processes, pages, widgets, features, entities, shared
- 각 레이어는 상위 레이어만 의존할 수 있고, 하위 레이어는 상위 레이어를 알지 못합니다

**실무 Layer와의 비교:**

```md
# 실무 Layer (수직적 관점 - 기술 중심)
View(page) → Hook → Service → Manager → Object(type)

# FSD Layer (수평적 관점 - 도메인 중심)
app → pages → features → entities → shared
```

**두 패턴의 통합 가능성:**

1. **FSD의 각 슬라이스 내부에서 실무 Layer 적용**
   ```
   features/
     authentication/
       ui/          # View Layer
       hooks/       # Hook Layer
       services/    # Service Layer
       managers/    # Manager Layer
       types/       # Object Layer
   ```

2. **관심사의 차이**
   - 실무 Layer: "무엇을 하는가" (기술적 책임)
   - FSD: "누구를 위한 것인가" (비즈니스 도메인)

3. **결론**
   - FSD는 큰 덩어리(프로젝트 전체)를 조직화하는 방식
   - 실무 Layer는 각 덩어리 내부의 책임을 분리하는 방식
   - 두 패턴은 상호보완적이며, 함께 사용될 수 있습니다

---

## 질문 2: 객체기반 철학의 FP를 사용하기 위해서는 창의성을 발휘해야하는데 우리는 어떻게 창의성을 발휘하는가?

### OOP와 FP의 교차점에서 창의성 발휘하기

**창의성은 제약에서 나온다:**

1. **순수 함수와 객체의 조화**
   ```javascript
   // OOP: 상태를 가진 객체
   function createCounter() {
     var count = 0;
     return {
       increment: function() { return ++count; },
       getCount: function() { return count; }
     };
   }

   // FP: 불변성을 가진 객체
   function createCounter(count) {
     return {
       count: count,
       increment: function() {
         return createCounter(count + 1);
       }
     };
   }
   ```

2. **창의성을 발휘하는 패턴들**

   **패턴 A: 고차 함수 + 객체 생성자**
   ```javascript
   function withLogging(createFn) {
     return function() {
       console.log('Creating object...');
       var obj = createFn.apply(this, arguments);
       console.log('Object created');
       return obj;
     };
   }

   var createLoggedUser = withLogging(createUser);
   ```

   **패턴 B: 파이프라인 + 메서드 체이닝**
   ```javascript
   function createPipeline(obj) {
     return {
       value: obj,
       pipe: function(fn) {
         return createPipeline(fn(this.value));
       },
       get: function() {
         return this.value;
       }
     };
   }
   ```

   **패턴 C: 클로저 + 함수 합성**
   ```javascript
   function compose(/* functions */) {
     var fns = Array.prototype.slice.call(arguments);
     return function(initial) {
       return fns.reduceRight(function(acc, fn) {
         return fn(acc);
       }, initial);
     };
   }
   ```

3. **창의성 발휘를 위한 사고 프로세스**

   **Step 1: 문제를 데이터 변환으로 보기**
   - "상태를 변경한다" → "새로운 상태를 생성한다"

   **Step 2: 책임을 분리하기**
   - "이 객체가 무엇을 하는가" → "이 함수가 무엇을 변환하는가"

   **Step 3: 조합 가능하게 만들기**
   - "재사용 가능한 작은 부품을 만든다"

   **Step 4: 불변성 유지하기**
   - "원본을 수정하지 않고 새로운 것을 반환한다"

4. **실천 방법**
   - 작은 순수 함수를 많이 만들기
   - 객체를 데이터 컨테이너로 사용하기
   - 동작(함수)과 데이터(객체)를 분리하기
   - 합성과 조합을 통해 복잡한 로직 구현하기

---

## 질문 3: 패턴들의 유기적인 관계성의 근간과 근본은 무엇인가. 비즈니스 모델에 따른 관계와 형태인가?

### 패턴의 본질: 반복되는 문제에 대한 검증된 해결책

**1. 패턴이 생기는 근본 원인**

패턴은 다음 세 가지 요소의 교차점에서 발생합니다:

```
문제 공간(Problem Space)
   ↓
기술 제약(Technical Constraints)
   ↓
해결책 공간(Solution Space)
```

**2. 패턴들의 유기적 관계성**

**레벨 1: 원칙(Principles) - 가장 근본적인 층**
```
- 단일 책임 원칙 (SRP)
- 개방-폐쇄 원칙 (OCP)
- 의존성 역전 원칙 (DIP)
- 관심사의 분리 (Separation of Concerns)
- 높은 응집도, 낮은 결합도
```

**레벨 2: 패턴(Patterns) - 원칙의 구체화**
```
Creational: Factory, Builder, Singleton
Structural: Adapter, Decorator, Facade
Behavioral: Observer, Strategy, Command
```

**레벨 3: 아키텍처(Architecture) - 패턴의 조합**
```
Layered Architecture
MVC/MVVM
Clean Architecture
FSD
```

**3. 비즈니스 모델과의 관계**

**패턴의 근간은 비즈니스가 아니라 "변경의 축"입니다:**

```javascript
// 나쁜 예: 비즈니스 로직이 UI와 결합
function loginButton() {
  var button = document.createElement('button');
  button.onclick = function() {
    var user = document.getElementById('username').value;
    var pass = document.getElementById('password').value;
    // 직접 API 호출
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ user: user, pass: pass })
    });
  };
  return button;
}

// 좋은 예: 변경의 축을 분리
// UI Layer - 화면이 변경되면 여기만 수정
function createLoginButton(onLogin) {
  var button = document.createElement('button');
  button.onclick = onLogin;
  return button;
}

// Service Layer - API 방식이 변경되면 여기만 수정
function createAuthService() {
  return {
    login: function(credentials) {
      return fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
    }
  };
}

// Hook Layer - 비즈니스 로직이 변경되면 여기만 수정
function useLogin(authService) {
  return function(username, password) {
    return authService.login({ user: username, pass: password });
  };
}
```

**4. 비즈니스 모델의 영향**

비즈니스 모델은 패턴의 "조합 방식"에 영향을 줍니다:

**E-commerce:**
```
- Product → Cart → Order → Payment
- 트랜잭션 중심, State Machine 패턴 유용
- 복잡한 상태 전이 관리 필요
```

**Social Media:**
```
- User → Post → Comment → Like
- 이벤트 중심, Observer 패턴 유용
- 실시간 업데이트 필요
```

**CMS:**
```
- Content → Template → Page → Publish
- 전략 패턴, Composite 패턴 유용
- 다양한 콘텐츠 타입 처리 필요
```

**5. 결론: 패턴의 근간**

패턴의 진짜 근간은:
1. **변경의 축** - "무엇이 자주 변하는가"
2. **책임의 분리** - "누가 무엇을 알아야 하는가"
3. **의존성의 방향** - "누가 누구를 알아야 하는가"

비즈니스 모델은 이러한 근간 위에서:
- 어떤 패턴을 조합할 것인가
- 어떤 책임을 우선시할 것인가
- 어떤 변경이 더 빈번한가

를 결정하는 "상황(Context)"을 제공합니다.

**실천 가이드:**
```
1. 먼저 변경의 축을 파악한다
2. 책임을 분리한다
3. 적절한 패턴을 선택한다
4. 비즈니스 요구사항에 맞게 조합한다
```

---

## 마무리: Section 2-3에서 적용할 점

1. **Layer 구조는 기술적 책임 분리에 집중**
   - View, Hook, Service, Manager, Object

2. **FP + OOP 혼합시 창의성**
   - 작은 순수 함수로 시작
   - 객체는 데이터 컨테이너로
   - 조합을 통한 복잡성 관리

3. **패턴 선택 기준**
   - 변경의 축을 먼저 파악
   - 비즈니스는 조합의 가이드
   - 원칙 → 패턴 → 아키텍처 순으로 사고

다음 Section에서는 이러한 개념들을 실제 코드로 구현하면서 더 깊이 탐구할 수 있을 것입니다.
