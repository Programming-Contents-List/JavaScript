import createKey from "../../function/memory/createKey.js";
import createCache from "../../function/memory/createCache.js";

/**
 * set을 통해서 캐시에 값을 할당 할 수 있게 한다.
 * get은 자기 자신의 key값으로 캐시에 접근 할 수 있게 한다.
 * 여기서 다시 set을 하지 않는 이상, value와 key는 변경되지 않는다.
 * 그렇다면 generateElement에서 set과 get이 적절하게 역할 분류가 된 것인가?
 * 해당 코드의 역할이 무엇인가? 요소를 생성하는 것 아닌까? 그렇다면, key와 value값을 가지고 있으면 된다. 즉, cache가 내부에서 동작 해야하는 이유가 무엇인가?
 */

const generateElement = {
    key : createKey(),
    value : null,
    initialize: function(value){
        return this.value = value;
    },
    set: function(){
        if(this.value === null){
            console.warn("⚠️value is null, check initialize value");
        }
        return createCache(this.key, this.value);
    },
    get: function(){
        return this.set().get(this.key);
    }
}

export default generateElement;