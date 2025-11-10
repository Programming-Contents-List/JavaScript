# Service와 Manager 네이밍 논쟁 정리

> elementService와 elementManager의 네이밍이 적절한가에 대한 논의 기록

## 목차
1. [논쟁의 핵심](#1-논쟁의-핵심)
2. [현재 코드 구조 분석](#2-현재-코드-구조-분석)
3. [의견 A: 네이밍 역전 주장](#3-의견-a-네이밍-역전-주장)
4. [의견 B: 현재 구조 옹호](#4-의견-b-현재-구조-옹호)
5. [객관적 평가](#5-객관적-평가)
6. [결론 및 권장사항](#6-결론-및-권장사항)

---

## 1. 논쟁의 핵심

### 핵심 질문
> **"elementService와 elementManager, 이름이 역할과 일치하는가?"**

### 배경
```
현재 구조:
elementManager (상태 관리, 생명주기) → elementService (순수 함수, CRUD)
```

이 구조에서 네이밍이 역할과 일치하는지에 대한 의견 충돌

---

## 2. 현재 코드 구조 분석

### elementService (js/es5/section2-3/object/function/elementService.js)

```javascript
const elementService = {
    validate: function(el) {
        return el.key !== null && el.value !== null;
    },

    create: function() {
        return { key: null, value: null }
    },

    get: function(el) {
        return el;
    },

    set: function(el, key, value) {
        el.key = key;
        el.value = value;
        return el;
    }
}
```

**특징:**
- 상태 없음 (stateless)
- element를 파라미터로 받음
- 순수 함수 집합
- Manager를 몰라도 독립적 동작 가능
- CRUD 기본 연산 제공

### elementManager (js/es5/section2-3/object/literal/memory/elementManager.js)

```javascript
const elementManager = {
    element: null,  // ← 상태 보유

    state: function() {
        return this.element && elementService.validate(this.element);
    },

    initialize: function() {
        if (!this.state()) {
            this.element = elementService.create();
        }
        return this.element;
    },

    get: function() {
        console.log(this.element);
        return elementService.get(this.element);
    },

    set: function(key, value) {
        if (!this.state()) {
            console.error("element is not initialized");
            return;
        }
        this.element = elementService.set(this.element, key, value);
        return this.element;
    }
};
```

**특징:**
- 상태 보유 (stateful)
- 싱글톤 element 인스턴스 관리
- 생명주기 관리 (initialize)
- elementService에 의존
- elementService를 활용한 오케스트레이션

### 의존성 방향

```
elementManager → elementService
(Manager가 Service에 의존)
```

**✅ 의존성 방향은 올바름**
- Service는 Manager를 모름
- Manager가 Service를 활용
- 단방향 의존성 유지

---

## 3. 의견 A: 네이밍 역전 주장

### 주장 내용

**"현재 네이밍이 역할과 반대다. 서로 바꿔야 한다."**

### 근거

#### 1) elementService의 역할 분석
```javascript
// 현재 elementService가 하는 일:
validate(el) { ... }
create() { ... }
get(el) { ... }
set(el, key, value) { ... }
```

**주장:**
- 이건 단순 CRUD 유틸리티
- Service라기보다 **Helper / Utils / Repository** 수준
- "Service"라는 이름은 과도하게 큼

#### 2) elementManager의 역할 분석
```javascript
// 현재 elementManager가 하는 일:
element: null  // 상태 관리
initialize()   // 생명주기
state()        // 상태 검증
set()          // 비즈니스 로직 (초기화 확인 등)
```

**주장:**
- 상태 관리 + 생명주기 관리 + 오케스트레이션
- 이게 진짜 **"Service"** 역할
- Manager보다 Service가 더 적합한 이름

### 제안하는 구조

```javascript
// 제안 1: Helper로 격하
elementHelper.create()
elementHelper.validate()

// Manager를 Service로 승격
elementService.initialize()
elementService.set()
```

```javascript
// 제안 2: Repository로 변경
elementRepository.create()
elementRepository.save()

// Manager를 Service로
elementService.initialize()
elementService.manage()
```

### 장점
- 직관적 네이밍
- 상태를 관리하는 쪽이 "Service"라는 이름을 가짐
- 일반적인 Service Layer 패턴과 일치

### 단점
- 구조를 크게 바꾸지 않고 이름만 바꾸는 것은 혼란 가능
- "Helper"나 "Repository"가 정확한 역할 표현인지 의문

---

## 4. 의견 B: 현재 구조 옹호

### 주장 내용

**"현재 구조는 틀리지 않았다. 네이밍이 약간 헷갈릴 수는 있지만, 역할은 명확하다."**

### 근거

#### 1) elementService는 "하위 도메인 Service"다

**반박:**
```javascript
elementService = 도메인 연산을 담당하는 하위 서비스
```

- CRUD가 단순하다고 Service가 아닌 것은 아님
- 많은 도메인 서비스 초기 단계가 유틸 함수 집합처럼 보임
- 중요한 건 **"의존성 방향"**과 **"책임의 위치"**
- 코드 라인이 적다고 Service가 아닌 것은 아님

**근거:**
- 내부 상태 없음 (stateless)
- element 도메인 구조에 대한 연산/검증 캡슐화
- 독립적으로 동작 가능 (Manager 없이도 사용 가능)
- → **"Low-level Domain Service"**로 충분히 자연스러움

#### 2) elementManager는 Manager가 맞다

**반박:**
```javascript
elementManager = element 인스턴스를 관리하는 상위 Manager
```

- 싱글톤처럼 element 인스턴스를 보유
- 초기화/검증 시점 제어
- elementService를 활용한 오케스트레이션

**이것은:**
- Manager
- Facade
- Store (프론트엔드 관점)
- Application Service (넓게 보면)

**→ "Manager"라고 부르는 것이 전혀 이상하지 않음**

#### 3) 계층 구조

```
상위: elementManager (상태 관리, 생명주기, 오케스트레이션)
  ↓ 의존
하위: elementService (도메인 연산, 순수 함수)
```

**이 구조는:**
- 의존성 방향 올바름 ✅
- 책임 분리 명확함 ✅
- 단일 책임 원칙 준수 ✅

### 네이밍에 대한 현실적 판단

**인정하는 부분:**
- 네이밍이 살짝 헷갈릴 수 있다
- elementService는 util/도메인 서비스 느낌
- elementManager는 역할상 더 직관적인 이름이 있을 수 있음

**하지만:**
- "틀렸다"가 아니라 "더 명확할 수 있다"
- 구조 자체는 문제없음
- 이름만 선명하게 하면 충분

### 개선 제안 (구조 유지)

```javascript
// 선택지 A: 현재 구조 유지, 이름만 명확히
elementService → elementOperations / elementUtils / elementDomain
elementManager → elementManager / elementStore / elementLifecycle

// 선택지 B: 좀 더 명확한 계층 표현
elementService → elementDomainService (역할 강조)
elementManager → elementStateManager (상태 관리 강조)
```

---

## 5. 객관적 평가

### 양측 의견의 타당한 부분

#### 의견 A가 맞는 부분
1. 네이밍이 직관적이지 않을 수 있다
2. elementService가 "Service"라는 이름치고 단순해 보인다
3. 상태를 관리하는 쪽을 "Service"라 부르는 것도 일반적

#### 의견 B가 맞는 부분
1. 현재 구조는 의존성 방향이 올바르다
2. elementService는 도메인 서비스로 충분히 자연스럽다
3. elementManager는 Manager 역할을 정확히 수행한다
4. 구조 자체는 문제없다

### 핵심 차이

**의견 A:** "Service = 상위 레이어"라는 관점
**의견 B:** "Service = 도메인 연산 레이어 (상/하 무관)"라는 관점

### 용어에 대한 산업 표준

#### Service의 다양한 의미

**1. Domain Service (DDD)**
```javascript
// 도메인 연산, 상태 없음
userService.validateEmail(email)
orderService.calculateTotal(items)
```
→ elementService는 이 범주에 해당

**2. Application Service**
```javascript
// 워크플로우 조율, 상태 관리 가능
checkoutService.processOrder()
authService.login()
```
→ elementManager가 이 범주에 가까움

**3. Infrastructure Service**
```javascript
// 저장소, API 연동
apiService.fetch()
dbService.save()
```
→ 둘 다 아님

#### Manager의 의미

**일반적으로:**
- 특정 리소스/인스턴스의 생명주기 관리
- 싱글톤 또는 풀(pool) 관리
- 상태 보유

→ elementManager가 정확히 이 역할

### 결론

**구조는 올바르다.**
**네이밍은 개선 여지가 있다.**

---

## 6. 결론 및 권장사항

### 최종 판단

#### 1. 현재 구조 평가

```
✅ 의존성 방향: 올바름
✅ 책임 분리: 명확함
✅ 재사용성: 우수함
⚠️  네이밍: 개선 여지 있음
```

#### 2. 누구의 의견이 맞는가?

**둘 다 부분적으로 맞다.**

- 의견 A: 네이밍이 직관적이지 않다 → **맞다**
- 의견 A: 구조가 반대다 → **과장**
- 의견 B: 구조는 올바르다 → **맞다**
- 의견 B: 네이밍은 취향 문제 → **맞다**

#### 3. 가장 중요한 원칙

```
Service는 Manager를 몰라야 한다 ✅
의존성 방향: Manager → Service ✅
```

**이 원칙만 지켜지면, 네이밍은 팀 컨벤션의 문제다.**

### 실전 권장사항

#### 옵션 1: 최소 변경 (이름만 조정)

```javascript
// elementService.js → elementDomainService.js
export const elementDomainService = {
    validate: function(el) { ... },
    create: function() { ... },
    set: function(el, key, value) { ... }
}

// elementManager.js (유지)
export const elementManager = {
    element: null,
    initialize: function() { ... }
}
```

**장점:**
- 구조 변경 없음
- 역할이 명확해짐
- 최소한의 수정

#### 옵션 2: 역할 강조

```javascript
// elementService.js → elementOperations.js
export const elementOperations = {
    validate: function(el) { ... },
    create: function() { ... },
    set: function(el, key, value) { ... }
}

// elementManager.js → elementStateManager.js
export const elementStateManager = {
    element: null,
    initialize: function() { ... }
}
```

**장점:**
- 역할이 매우 명확
- 혼란 최소화

#### 옵션 3: 의견 A 수용 (구조 재해석)

```javascript
// elementService.js → elementRepository.js
export const elementRepository = {
    create: function() { ... },
    save: function(el) { ... },
    find: function() { ... }
}

// elementManager.js → elementService.js
export const elementService = {
    element: null,
    initialize: function() { ... }
}
```

**장점:**
- Application Service 패턴과 일치
- 일반적인 명명 규칙

**단점:**
- Repository가 정확한 표현인지 의문 (저장소 없음)
- 기존 코드 수정 범위 큼

### 최종 추천

**옵션 1 또는 옵션 2 권장**

이유:
1. 현재 구조가 틀리지 않았음
2. 이름만 명확히 하면 충분
3. 최소한의 변경으로 목적 달성

### 핵심 원칙 재확인

```javascript
// ✅ 올바른 구조
const elementOperations = {
    // 도메인 연산 (하위)
    validate: function(el) { ... }
}

const elementManager = {
    element: null,  // 상태 보유 (상위)
    initialize: function() {
        this.element = elementOperations.create();
    }
}

// ✅ 의존성 방향
elementManager → elementOperations

// ✅ 독립성
elementOperations는 elementManager를 모름
```

### 체크리스트

코드 작성 시 확인할 사항:

- [ ] Service는 Manager를 참조하지 않는가?
- [ ] 의존성 방향이 Manager → Service인가?
- [ ] Service는 독립적으로 동작 가능한가?
- [ ] Manager는 상태를 관리하는가?
- [ ] 네이밍이 역할을 명확히 드러내는가?

---

## 부록: 실전 예제

### 현재 코드 (유지)

```javascript
// elementService.js
const elementService = {
    validate: function(el) {
        return el.key !== null && el.value !== null;
    },
    create: function() {
        return { key: null, value: null }
    },
    set: function(el, key, value) {
        el.key = key;
        el.value = value;
        return el;
    }
}

// elementManager.js
const elementManager = {
    element: null,

    initialize: function() {
        if (!this.state()) {
            this.element = elementService.create();
        }
        return this.element;
    },

    state: function() {
        return this.element && elementService.validate(this.element);
    },

    set: function(key, value) {
        if (!this.state()) {
            console.error("element is not initialized");
            return;
        }
        this.element = elementService.set(this.element, key, value);
        return this.element;
    }
}
```

**평가:**
- ✅ 구조 올바름
- ⚠️  네이밍 개선 가능
- ✅ 의존성 방향 올바름

### 개선 버전 (옵션 1)

```javascript
// elementDomainService.js
const elementDomainService = {
    validate: function(el) {
        return el.key !== null && el.value !== null;
    },
    create: function() {
        return { key: null, value: null }
    },
    set: function(el, key, value) {
        el.key = key;
        el.value = value;
        return el;
    }
}

// elementManager.js (변경 없음)
const elementManager = {
    element: null,

    initialize: function() {
        if (!this.state()) {
            this.element = elementDomainService.create();
        }
        return this.element;
    },

    state: function() {
        return this.element && elementDomainService.validate(this.element);
    },

    set: function(key, value) {
        if (!this.state()) {
            console.error("element is not initialized");
            return;
        }
        this.element = elementDomainService.set(this.element, key, value);
        return this.element;
    }
}
```

**개선 효과:**
- 역할이 명확해짐 (Domain Service)
- 최소한의 변경
- 기존 구조 유지

---

**작성일**: 2025-11-10
**버전**: 1.0.0
**관련 파일**:
- `js/es5/section2-3/object/function/elementService.js`
- `js/es5/section2-3/object/literal/memory/elementManager.js`
**관련 문서**:
- `layer-architecture-patterns.md`
- `service-independence-patterns.md`
