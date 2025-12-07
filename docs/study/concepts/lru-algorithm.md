# LRU (Least Recently Used) 알고리즘

> 최종 업데이트: 2025-12-07

## LRU란?

**L**east **R**ecently **U**sed = 가장 최근에 사용되지 않은 (가장 오래 전에 사용된)

캐시가 가득 찼을 때, **가장 오래 전에 사용된 항목을 제거**하는 알고리즘입니다.

---

## 핵심 개념

### 캐시 용어

| 용어 | 의미 |
|------|------|
| **Hit** | 캐시에 있음 → 바로 반환 |
| **Miss** | 캐시에 없음 → 추가 필요 |
| **Eviction** | 가득 찼을 때 오래된 항목 제거 |

### 데이터 구조

LRU 구현에 필요한 두 가지:

| 구조 | 역할 | ES5 구현 |
|------|------|----------|
| **cache** | 키-값 저장소 | Object (딕셔너리) |
| **order** | 사용 순서 추적 | Array |

```
cache: { "A": dataA, "B": dataB, "C": dataC }
order: ["A", "B", "C"]
        ↑         ↑
     오래됨     최신
```

---

## 동작 원리

### 1. Get (조회)

```
get(key) 호출
    ↓
cache에 key가 있나?
    │
    ├─ Yes (Hit)
    │   ├─ order에서 key 제거
    │   ├─ order 맨 뒤에 push (최신으로)
    │   └─ cache[key] 반환
    │
    └─ No (Miss)
        └─ null 반환
```

### 2. Set (저장)

```
set(key, value) 호출
    ↓
cache에 key가 있나?
    │
    ├─ Yes (이미 있음)
    │   ├─ cache[key] = value (값 갱신)
    │   ├─ order에서 key 제거
    │   └─ order 맨 뒤에 push (최신으로)
    │
    └─ No (새로 추가)
        ├─ order.length >= maxSize?
        │   ├─ Yes: order[0] 제거 (shift) + cache에서도 삭제
        │   └─ No: 바로 추가
        ├─ cache[key] = value
        └─ order.push(key)
```

---

## 시간 흐름 예시

```
maxSize = 3

1. set("A", dataA)
   cache: { "A": dataA }
   order: ["A"]

2. set("B", dataB)
   cache: { "A": dataA, "B": dataB }
   order: ["A", "B"]

3. set("C", dataC)
   cache: { "A": dataA, "B": dataB, "C": dataC }
   order: ["A", "B", "C"]
          ↑         ↑
       오래됨     최신

4. get("A")  ← Hit! "A"를 최신으로
   - order에서 "A" 제거: ["B", "C"]
   - order.push("A"):     ["B", "C", "A"]
   cache: { "A": dataA, "B": dataB, "C": dataC }
   order: ["B", "C", "A"]
          ↑         ↑
       오래됨     최신

5. set("D", dataD)  ← 가득 참! LRU 제거
   - order.shift() → "B" 제거 (가장 오래됨)
   - delete cache["B"]
   - cache["D"] = dataD
   - order.push("D")
   cache: { "A": dataA, "C": dataC, "D": dataD }
   order: ["C", "A", "D"]
```

---

## 의사코드 (Pseudocode)

```
VARIABLES:
    cache = {}
    order = []
    maxSize = 10

FUNCTION get(key)
    IF cache.hasOwnProperty(key) THEN
        removeFromOrder(key)
        order.push(key)
        RETURN cache[key]
    ELSE
        RETURN null
    END IF
END FUNCTION

FUNCTION set(key, value)
    IF cache.hasOwnProperty(key) THEN
        cache[key] = value
        removeFromOrder(key)
        order.push(key)
    ELSE
        IF order.length >= maxSize THEN
            oldestKey = order.shift()
            DELETE cache[oldestKey]
        END IF
        cache[key] = value
        order.push(key)
    END IF
END FUNCTION

FUNCTION removeFromOrder(key)
    FOR i = 0 TO order.length - 1
        IF order[i] === key THEN
            order.splice(i, 1)
            BREAK
        END IF
    END FOR
END FUNCTION
```

---

## ES5 구현 (cacheRepo.js)

```javascript
var cacheRepo = (function(){
    var cache = {};
    var order = [];
    var maxSize = 10;

    function get(key){
        if(cache.hasOwnProperty(key)){
            removeFromOrder(key);
            order.push(key);
            return cache[key];
        } else {
            return null;
        }
    }

    function set(key, node){
        if(cache.hasOwnProperty(key)){
            cache[key] = node;
            removeFromOrder(key);
            order.push(key);
        } else {
            if(order.length >= maxSize){
                var oldestKey = order.shift();
                delete cache[oldestKey];
            }
            cache[key] = node;
            order.push(key);
        }
    }

    function removeFromOrder(key){
        for(var i = 0; i < order.length; i++){
            if(order[i] === key){
                order.splice(i, 1);
                break;
            }
        }
    }

    return {
        get: get,
        set: set,
        remove: removeFromOrder
    };
})();
```

---

## 핵심 메서드 정리

### 배열 메서드

| 메서드 | 동작 | 용도 |
|--------|------|------|
| `push(item)` | 맨 **뒤에** 추가 | 최신 항목 추가 |
| `shift()` | 맨 **앞에서** 제거 | 가장 오래된 항목 제거 |
| `splice(i, 1)` | i번째에서 1개 제거 | 특정 위치 제거 |

### 왜 이 메서드들인가?

```
order: [오래됨 ─────────────────→ 최신]
        ↑                         ↑
     shift()로 제거          push()로 추가
```

---

## 시간 복잡도

| 연산 | 복잡도 | 이유 |
|------|--------|------|
| `cache[key]` 접근 | O(1) | Object 키 접근 |
| `order.push()` | O(1) | 배열 끝 추가 |
| `order.shift()` | O(n) | 배열 앞 제거 (재정렬) |
| `removeFromOrder()` | O(n) | 순차 탐색 |

> 참고: ES6 Map + DoublyLinkedList로 구현하면 모든 연산 O(1) 가능

---

## 실제 사용 사례 (CS 예시)

| 시스템 | 설명 |
|--------|------|
| **CPU 캐시** | 자주 접근하는 메모리 블록 캐싱 |
| **브라우저 캐시** | 최근 방문한 페이지/리소스 저장 |
| **Redis** | 인메모리 캐시 (maxmemory-policy) |
| **CDN** | 엣지 서버의 콘텐츠 캐싱 |
| **데이터베이스** | 쿼리 결과 캐싱 |

---

## 관련 문서

- cacheRepo 구현: `/js/es5/section2-3/project/repository/cacheRepo.js`
- ES5 vs ES6 비교: `/docs/study/concepts/es5-es6-mutation-style.md`
- 프로젝트 가이드: `/docs/project/guide/guide-kr.md`
