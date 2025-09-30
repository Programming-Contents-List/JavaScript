import createKey from "../../function/memory/createKey.js";
import createCache from "../../function/memory/createCache.js";

/**
 * set을 통해서 캐시에 값을 할당 할 수 있게 한다.
 * get은 자기 자신의 key값으로 캐시에 접근 할 수 있게 한다.
 * 여기서 다시 set을 하지 않는 이상, value와 key는 변경되지 않는다.
 * 그렇다면 generateElement에서 set과 get이 적절하게 역할 분류가 된 것인가?
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