// 같은 key를 가지고, 같은 Map을 사용하기 때문에 같은 Heap Memory 주소를 가지고 있다.
// 각기 다른 결과가 나와야하거나 같거나 해야한다. Date.getTime() 을 사용하기 때문에 명확하게 구별하기 어렵다.
// id를 더 명확하게 구별 할 수 있는 것을 해야 좋을 듯 하다.

import generateCache from "./section1/object/literal/memory/cache/generateCache.js";
import generateElement from "./section1/object/literal/generateElement.js";
import MyConsole from "./section1/object/literal/console.js";


// MyConsole.log(generateCache.get());

const array = [];   //array를 사용하게 되면 단일 이라서 특정, 값을 부여하기 어렵다. Math를 사용하는 것을 권장 한다.
array.push(generateElement.set(generateCache.get()));

MyConsole.log(JSON.stringify(generateElement.get(), null, 2));
MyConsole.log(JSON.stringify(array[0], null, 2));
