import createCache from "./section2/object/function/memory/createCache.js";
import MyConsole from "./section2/object/literal/console.js";
import generateElement from "./section2/object/literal/memory/generateElement.js";
import { getGlobalCache, setGlobalCache, clearGlobalCache, callAllGlobalCacheEntries, getGlobalCacheSize, getGlobalCacheKeys } from "./section2/object/function/memory/createCache.js";

/**
 * 캐시로 element를 생성하지만 각 요소 내부에서만 key를 생성하고 저장만하고 있다. 따라서 전역 캐시가 없어서 listup을 할 수 없다.
 */

MyConsole.log("Hello World");
MyConsole.log(createCache("key", "value").get("key"));

generateElement.set();
// generateElement.setValue("Testvalue");
console.log("---");
MyConsole.log(generateElement.initialize("Testvalue"));
MyConsole.log(generateElement.key);
// const test = generateElement.key = "newKey";
// MyConsole.log(test);
MyConsole.log(generateElement.get());

MyConsole.log("---");

/**
 * 글로벌로 캐시를 저장할 수 있는 코드 구현
 */
generateElement.initialize("Testvalue");

generateElement.set();
const key1 = generateElement.key;
MyConsole.log(key1);
setGlobalCache(generateElement.key, generateElement.value);
MyConsole.log(getGlobalCache().get(key1));

generateElement.set();
const key2 = generateElement.key;
MyConsole.log(key2);
setGlobalCache(generateElement.key, generateElement.value);
MyConsole.log(getGlobalCache().get(key2));

/**
 * 스택 기준으로 마지막에 들어온 값만 남는다. 즉, generateElement에서 하나하나 생성되고 있는 것이 아니다. 따라서, 이걸 generateElement가 될 때, cache에 저장이 되게 하려면 generateElement의 set 프로퍼티에서 globalCache가 저장이 되게 해야한다.
 * @todo 따라서 현재 generateElement에서 set 프로퍼티에서 globalCache에 저장이 되게 하려면, generateElement의 set 프로퍼티에서 setGlobalCache함수로 변경해야 한다.
 * @example
 * generateElement1 (싱글톤) → 같은 키 → 캐시에 덮어씌움
 * generateElement2 (싱글톤) → 같은 키 → 캐시에 덮어씌움
 * generateElement3 (싱글톤) → 같은 키 → 캐시에 덮어씌움
 */
MyConsole.log("=== 캐시 전체 정보 ===");
MyConsole.log(JSON.stringify(callAllGlobalCacheEntries(), null, 2));

// clearGlobalCache();
// MyConsole.log(getGlobalCache().get(key));