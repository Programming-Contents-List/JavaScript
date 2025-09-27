// 같은 key를 가지고, 같은 Map을 사용하기 때문에 같은 Heap Memory 주소를 가지고 있다.
// 각기 다른 결과가 나와야하거나 같거나 해야한다. Date.getTime() 을 사용하기 때문에 명확하게 구별하기 어렵다.
// id를 더 명확하게 구별 할 수 있는 것을 해야 좋을 듯 하다.

import generateCache from "./object/literal/memory/cache/generateCache.js";
import MyConsole from "./object/literal/console.js";

MyConsole.log(generateCache.get());