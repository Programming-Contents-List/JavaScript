# 가상 메모리 구조 가이드

> 최종 업데이트: 2025-12-07

## 목표

ES5 환경에서 가상 메모리 시스템 구현을 통해 다음을 학습:
- Heap/Stack 메모리 개념
- Repository/Service 레이어 패턴
- LRU 캐시 알고리즘
- 참조 카운트 기반 GC

---

## 아키텍처

### 레이어 구조

```
┌─────────────────────────────────────┐
│            Client                   │
└─────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│           gcService                 │  ← Service 레이어
│      (비즈니스 로직: GC 실행)         │
└─────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
┌───────────────┐  ┌───────────────┐
│  memoryRepo   │  │   cacheRepo   │   ← Repository 레이어
│  (Pool CRUD)  │  │  (LRU 캐시)   │
└───────────────┘  └───────────────┘
        │                 │
        └────────┬────────┘
                 ▼
┌─────────────────────────────────────┐
│              node                   │  ← Model 레이어
│         (데이터 구조)                │
└─────────────────────────────────────┘
```

### 역할 분담

| 레이어 | 파일 | 역할 | 상태 |
|--------|------|------|------|
| Model | `node.js` | 메모리 블록 데이터 구조 | ✅ 완료 |
| Repository | `memoryRepo.js` | Pool CRUD (저장/조회/수정/삭제) | ✅ 완료 |
| Repository | `cacheRepo.js` | LRU 캐시 관리 | 🔄 진행중 |
| Service | `gcService.js` | refCount 기반 GC 로직 | ⏳ 대기 |

---

## 디렉토리 구조

```
js/es5/section2-3/project/
│
├── model/
│   ├── element.js          ← 기존 요소 모델
│   └── node.js             ← 메모리 블록 모델 ✅
│
├── repository/
│   ├── memoryRepo.js       ← Pool 저장소 ✅
│   └── cacheRepo.js        ← LRU 캐시 저장소 🔄
│
└── service/
    └── gcService.js        ← GC 비즈니스 로직 ⏳
```

---

## Model: node.js

### 데이터 구조

```javascript
{
    address: "0x...",       // 고유 주소
    value: any,             // 저장된 값
    refCount: 0,            // 참조 카운트 (GC용)
    createdAt: timestamp,   // 생성 시간
    updatedAt: timestamp,   // 수정 시간
    lastAccess: timestamp   // 마지막 접근 시간
}
```

### Heap 관점

```
┌─────────────────────────────────────┐
│ Heap                                │
├─────────────────────────────────────┤
│ node (0x002)                        │
│ ├── address: "0x17328..."           │
│ ├── value: "Hello"                  │
│ ├── refCount: 1                     │
│ ├── createdAt: 1733500000000        │
│ ├── updatedAt: 1733500000000        │
│ └── lastAccess: 1733500001000       │
└─────────────────────────────────────┘
```

---

## Repository: memoryRepo.js

### 역할
- Pool(저장소) 관리
- CRUD 인터페이스 제공

### API

| 메서드 | 역할 | 반환 |
|--------|------|------|
| `create(value)` | 새 노드 생성 | address |
| `read(address)` | 노드 조회 | node |
| `update(address, value, lastAccess, refCount)` | 노드 수정 | - |
| `delete(address)` | 노드 삭제 | address |

### 구현 패턴
- **Module Pattern**: IIFE + 클로저로 pool 캡슐화
- **ES5 스타일**: Mutation (기존 객체 속성 직접 수정)

### Heap 관점

```
┌─────────────────────────────────────┐
│ memoryRepo (0x001)                  │
├─────────────────────────────────────┤
│ pool: {                             │
│   "0x17328_a1b2": ──→ node (0x002)  │
│   "0x17328_c3d4": ──→ node (0x003)  │
│ }                                   │
└─────────────────────────────────────┘
```

---

## Repository: cacheRepo.js

### 역할
- LRU(Least Recently Used) 캐시 관리
- 자주 접근하는 노드 빠른 조회

### 설계 결정 사항

**Q: cache에 무엇을 저장할 것인가?**

| 방식 | 설명 | 장점 | 단점 |
|------|------|------|------|
| A: 참조 | memoryRepo의 node 참조 | 메모리 효율, 동기화 자동 | 의존성 |
| **B: 복사** | **별도 캐시 데이터** | **독립적** | **동기화 필요, 메모리 중복** |

→ **결정: B (복사 방식)**

### CS 실제 예시

| 방식 | 실제 예시 | 설명 |
|------|-----------|------|
| A: 참조 | CPU 캐시 (Write-Through) | 캐시 변경 시 메인 메모리도 즉시 반영 |
| A: 참조 | 공유 메모리 (Shared Memory) | 여러 프로세스가 같은 메모리 영역 참조 |
| **B: 복사** | **CDN 캐시** | **원본 서버 데이터를 복사해서 엣지 서버에 저장** |
| **B: 복사** | **Redis 캐시** | **DB 데이터를 복사해서 인메모리에 저장** |
| **B: 복사** | **브라우저 캐시** | **서버 리소스를 로컬에 복사 저장** |

### B 방식 선택 이유

1. **독립성**: cacheRepo가 memoryRepo에 강하게 결합되지 않음
2. **학습 목적**: 동기화 로직을 직접 구현하며 캐시 개념 심화 학습
3. **실무 유사성**: CDN, Redis 등 실제 캐시 시스템과 유사한 구조

### API (예정)

| 메서드 | 역할 |
|--------|------|
| `get(key)` | 캐시 조회 + 순서 갱신 |
| `set(key, value)` | 캐시 추가/갱신 + LRU 처리 |
| `remove(key)` | order에서 제거 |

### LRU 알고리즘

```
VARIABLES:
    cache = {}          // 캐시 저장소
    order = []          // 사용 순서 (오래된 → 최근)
    maxSize = 10        // 최대 크기

흐름:
1. get(key) 호출
2. cache에 있으면 (Hit)
   → 반환 + order 갱신 (해당 key를 맨 뒤로)
3. cache에 없으면 (Miss)
   → null 반환
4. set(key, value) 호출
5. 이미 있으면 → 값 갱신 + order 갱신
6. 없으면 → 추가
   → 가득 찼으면 order[0] 제거 후 추가
```

### Heap 관점 (B: 복사 방식)

```
┌─────────────────────────────────────┐
│ cacheRepo (0x010)                   │
├─────────────────────────────────────┤
│ cache: {                            │
│   "0x17328_a1b2": ──→ copy (0x020)  │ ← 별도 복사본
│   "0x17328_c3d4": ──→ copy (0x021)  │ ← 별도 복사본
│ }                                   │
│                                     │
│ order: ["0x17328_c3d4", "0x17328_a1b2"]
│         ↑ 가장오래됨    ↑ 가장최근   │
│                                     │
│ maxSize: 10                         │
└─────────────────────────────────────┘

memoryRepo.pool["0x17328_a1b2"] ──→ node (0x002)  ← 원본
cacheRepo.cache["0x17328_a1b2"] ──→ copy (0x020)  ← 복사본 (별도 객체)
```

---

## Service: gcService.js

### 역할
- refCount 기반 가비지 컬렉션
- 미사용 노드 정리

### 동작 (예정)

```
1. memoryRepo의 모든 노드 순회
2. refCount === 0인 노드 탐지
3. cacheRepo에서 해당 노드 제거
4. memoryRepo에서 해당 노드 삭제
```

### 의존 관계

```
gcService
    │
    ├──→ memoryRepo.read()   // 노드 조회
    ├──→ memoryRepo.delete() // 노드 삭제
    └──→ cacheRepo.remove()  // 캐시에서 제거
```

## cacheRepo의 order 순서

### order란?

`order`는 **사용 순서를 추적하는 배열**입니다. LRU(Least Recently Used) 알고리즘에서 "가장 오래 전에 사용된 항목"을 찾기 위해 필요합니다.

### order 배열 구조

```
order: ["C", "B", "A"]
        ↑         ↑
      앞(0)     뒤(끝)
      오래됨     최신
      삭제대상   방금사용
```

| 위치 | 의미 | 메서드 |
|------|------|--------|
| `order[0]` (앞) | 가장 오래 전에 사용됨 | `shift()`로 제거 |
| `order[끝]` (뒤) | 가장 최근에 사용됨 | `push()`로 추가 |

### 동작 흐름

```
get(key) 또는 set(key, value) 호출
  │
  ▼
cache에 key가 있는가? ──────────────────┐
  │                                     │
  ▼                                     ▼
[Hit] cache에 있음                   [Miss] cache에 없음
  │                                     │
  ▼                                     ▼
order에서 해당 key 제거              set인 경우:
  │                                   order.length >= maxSize?
  ▼                                     │
order 맨 뒤에 push (최신으로)        ┌───┴───┐
  │                                 Yes      No
  ▼                                  │       │
값 반환                              ▼       ▼
                              order[0] 제거   바로 추가
                              (shift)
                                  │
                                  ▼
                              cache에 추가
                              order.push(key)
```

### 시간 흐름 예시

```
[시간 흐름 →]

1. set("A", dataA)
   order: ["A"]
   cache: { "A": dataA }

2. set("B", dataB)
   order: ["A", "B"]
   cache: { "A": dataA, "B": dataB }

3. set("C", dataC)
   order: ["A", "B", "C"]
   cache: { "A": dataA, "B": dataB, "C": dataC }

4. get("A")  ← Hit! "A"를 최신으로
   - order에서 "A" 제거: ["B", "C"]
   - order.push("A"):     ["B", "C", "A"]
   order: ["B", "C", "A"]
           ↑         ↑
        오래됨     최신(방금사용)

5. maxSize=3일 때, set("D", dataD)  ← 가득 참!
   - order.shift() → "B" 제거 (가장 오래됨)
   - delete cache["B"]
   - cache["D"] = dataD
   - order.push("D")
   order: ["C", "A", "D"]
   cache: { "A": dataA, "C": dataC, "D": dataD }
```

### 핵심 정리

| 상황 | 동작 |
|------|------|
| **Hit** | order에서 제거 → 맨 **뒤에** push (최신으로) |
| **Miss + 여유** | cache 추가 + order.push |
| **Miss + 가득참** | order[0] shift (앞에서 제거) → cache 삭제 → 새로 추가 |

### 왜 앞이 오래된 것인가?

`push()`는 뒤에 추가하므로, 먼저 들어온 것이 앞에 위치합니다.

```
push("A") → ["A"]
push("B") → ["A", "B"]
push("C") → ["A", "B", "C"]
             ↑         ↑
          먼저들어옴  나중에들어옴
           (오래됨)    (최신)
```

---

## 전체 Heap 관점 (B: 복사 방식)

```
┌──────────────────────────────────────────────────┐
│                    JS Heap                        │
├──────────────────────────────────────────────────┤
│                                                   │
│  memoryRepo (0x001)                              │
│  └── pool: {                                     │
│        "addr_001": ──→ node (0x002)  ← 원본      │
│        "addr_002": ──→ node (0x003)              │
│      }                                           │
│                                                   │
│  cacheRepo (0x010)                               │
│  ├── cache: {                                    │
│  │     "addr_001": ──→ copy (0x020)  ← 복사본    │
│  │   }                                           │
│  └── order: ["addr_001"]                         │
│                                                   │
│  node (0x002)          copy (0x020)              │
│  ├── address: "addr"   ├── address: "addr"      │
│  ├── value: "Hello"    ├── value: "Hello"       │
│  └── refCount: 1       └── (복사 시점의 스냅샷)  │
│                                                   │
│  ※ 두 객체는 별도 메모리 → 동기화 필요            │
│                                                   │
└──────────────────────────────────────────────────┘
```

---

## 구현 순서

| 단계 | 작업 | 상태 |
|------|------|------|
| 1 | node.js 모델 정의 | ✅ 완료 |
| 2 | memoryRepo.js CRUD 구현 | ✅ 완료 |
| 3 | cacheRepo.js LRU 구현 | 🔄 진행중 |
| 4 | gcService.js GC 로직 구현 | ⏳ 대기 |
| 5 | 통합 테스트 | ⏳ 대기 |

---

## 적용 패턴

### 디자인 패턴

| 패턴 | 적용 위치 | 설명 |
|------|-----------|------|
| Module Pattern | memoryRepo, cacheRepo | IIFE + 클로저로 캡슐화 |
| Repository Pattern | memoryRepo, cacheRepo | 데이터 접근 추상화 |

### SOLID 원칙

| 원칙 | 적용 |
|------|------|
| **SRP(S)** : 단일 책임 원칙 | 각 파일이 하나의 역할만 |
| **OCP(O)** : 개방-폐쇄 원칙 | 인터페이스 통한 확장 |
| **DIP(D)** : 의존 역전 원칙 | Service → Repository 의존 |

### 알고리즘

| 알고리즘 | 적용 위치 | 설명 |
|----------|-----------|------|
| LRU | cacheRepo | 가장 오래 사용 안 된 항목 제거 |
| Reference Counting | gcService | 참조 카운트 기반 GC |

---

## 참고 자료

- [LRU 캐시 설명 영상](https://www.youtube.com/watch?v=yiPqTPkVDrY&t=2s)
- ES5 vs ES6 스타일 비교: `/docs/study/concepts/es5-es6-mutation-style.md`
