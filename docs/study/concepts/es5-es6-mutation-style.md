# ES5 vs ES6 객체 수정 스타일 비교

## 개요

JavaScript에서 객체를 수정하는 두 가지 스타일을 비교합니다.

| 스타일 | 시대 | 방식 | 키워드 |
|--------|------|------|--------|
| **ES5** | ~2015 | Mutation (변경) | OOP, 직접 수정 |
| **ES6+** | 2015~ | Immutability (불변) | FP, 새 객체 생성 |

---

## 코드 비교: putNode 함수

### ES5 스타일 (Mutation)

```javascript
function putNode(address, value, lastAccess, refCount){
    pool[address].value = value;
    pool[address].refCount = refCount;
    pool[address].updatedAt = Date.now();
    pool[address].lastAccess = lastAccess;
}
```

**특징**
- 기존 객체의 속성을 직접 수정
- 메모리 주소 유지 (0x002 → 0x002)
- `address`, `createdAt`은 건드리지 않음 → 자동 유지

---

### ES6+ 스타일 (Immutability)

```javascript
function putNode(address, value, lastAccess, refCount){
    var existingNode = getNode(address);
    pool[address] = {
        address: address,
        value: value,
        refCount: refCount,
        createdAt: existingNode.createdAt,  // 명시적 복사 필요
        updatedAt: Date.now(),
        lastAccess: lastAccess
    };
}
```

**특징**
- 새 객체를 생성하여 교체
- 메모리 주소 변경 (0x002 → 0x003)
- 기존 객체는 GC 대상
- 유지할 값(`createdAt`)은 명시적으로 복사해야 함

---

## Heap 메모리 관점

### ES5 스타일 (Mutation)

```
putNode("mem_abc", "newValue", ...) 실행 후

┌─────────────────────────────────────┐
│ Heap                                │
├─────────────────────────────────────┤
│ pool (0x001)                        │
│ └── "mem_abc" → (0x002)             │ ← 동일 주소
│       {                             │
│         address: "mem_abc",         │   (유지)
│         value: "newValue",          │   (변경됨)
│         createdAt: 1733500000000,   │   (유지)
│         updatedAt: 1733500001000    │   (변경됨)
│       }                             │
└─────────────────────────────────────┘
```

### ES6+ 스타일 (Immutability)

```
putNode("mem_abc", "newValue", ...) 실행 후

┌─────────────────────────────────────┐
│ Heap                                │
├─────────────────────────────────────┤
│ pool (0x001)                        │
│ └── "mem_abc" → (0x003)             │ ← 새 주소
│       {                             │
│         address: "mem_abc",         │
│         value: "newValue",          │
│         createdAt: 1733500000000,   │   (복사됨)
│         ...                         │
│       }                             │
│                                     │
│ (0x002) → 참조 없음 → GC 대상        │ ← 기존 객체 버려짐
└─────────────────────────────────────┘
```

---

## 장단점 비교

| 항목 | ES5 (Mutation) | ES6+ (Immutability) |
|------|----------------|---------------------|
| **메모리 효율** | 좋음 (재사용) | 낮음 (매번 생성) |
| **GC 부담** | 적음 | 많음 |
| **상태 추적** | 어려움 | 쉬움 |
| **디버깅** | 사이드 이펙트 주의 | 예측 가능 |
| **코드량** | 적음 | 많음 (복사 필요) |
| **시대** | jQuery, Backbone | React, Redux |

---

## 언제 어떤 스타일을 사용할까?

### ES5 스타일 권장
- 메모리 효율이 중요한 경우
- 단순한 상태 관리
- 레거시 환경

### ES6+ 스타일 권장
- 상태 변화 추적이 중요한 경우
- Time-travel 디버깅 필요
- React/Redux 등 불변성 기반 라이브러리 사용

---

## 참고

- ES5 환경에서는 Mutation 스타일이 일반적이었음
- ES6+ 이후 함수형 프로그래밍(FP) 영향으로 Immutability 스타일 확산
- 두 스타일 모두 유효하며, 상황에 맞게 선택

