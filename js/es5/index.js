import createCache from "./section2/object/function/memory/createCache.js";
/** MyConsole은 Symbol은 보여줄 수 없게 되어 있어서 발생하는 문제.  */
// import MyConsole from "./section2/object/literal/console.js";
import generateElement from "./section2/object/literal/memory/generateElement.js";
import { getGlobalCache, setGlobalCache, clearGlobalCache, callAllGlobalCacheEntries, getGlobalCacheSize, getGlobalCacheKeys } from "./section2/object/function/memory/createCache.js";

/**
 * 힙에 맞춰서 캐시 저장 - 팩토리 패턴 사용
 */

// 첫 번째 엘리먼트 생성
const element1 = generateElement.create();
element1.initialize("Testvalue1");
element1.key = "Testkey1";  // 외부에서 key 값을 변경, 은닉화 위반
element1.set();
// element1.key = "Testkey1";  // cache에 저장 되지 않은 손실된 heap 주소의 key 값, cache는 기존에 존재하는 key 값을 참조하고 있다. 즉, heap과 cache의 싱크가 안맞는다.
console.log("Element1 - 키:", element1.key, "값:", element1.get());

// 두 번째 엘리먼트 생성 (새로운 힙 주소)
const element2 = generateElement.create();
element2.initialize("Testvalue2");
element2.set();
console.log("Element2 - 키:", element2.key, "값:", element2.get());

// 세 번째 엘리먼트 생성 (또 다른 힙 주소)
const element3 = generateElement.create();
element3.initialize("Testvalue3");
element3.set();
console.log("Element3 - 키:", element3.key, "값:", element3.get());

// 캐시 전체 확인
console.log("=== 캐시 전체 정보 ===");
console.log("캐시 크기:", getGlobalCacheSize());
console.log("모든 키:", getGlobalCacheKeys());
console.log("모든 엔트리:", JSON.stringify(callAllGlobalCacheEntries(), null, 2));
// console.log('RAW entries =', Array.from(getGlobalCache().entries()));

/** --------------------------
 * 
 * Element1 - 키: 0x0i639669 값: Testvalue1
 * Element2 - 키: 0x0i863311 값: Testvalue2
 * Element3 - 키: 0x0i152906 값: Testvalue3
 * === 캐시 전체 정보 ===
 * 캐시 크기: 3
 * 모든 키: [ '0x0i639669', '0x0i863311', '0x0i152906' ]
 * 모든 엔트리: [
 *   {
 *     "key": "0x0i639669",
 *     "value": "Testvalue1"
 *   },
 *   {
 *     "key": "0x0i863311",
 *     "value": "Testvalue2"
 *   },
 *   {
 *     "key": "0x0i152906",
 *     "value": "Testvalue3"
 *   }
 * ]
 */