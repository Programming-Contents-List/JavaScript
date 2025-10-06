import createCache from "./section2/object/function/memory/createCache.js";
import MyConsole from "./section2/object/literal/console.js";
import generateElement from "./section2/object/literal/memory/generateElement.js";

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
const test = generateElement.key = "newKey";
MyConsole.log(test);
MyConsole.log(generateElement.get());