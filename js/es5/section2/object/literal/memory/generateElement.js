import createKey from "../../function/memory/createKey.js";
import createCache from "../../function/memory/createCache.js";

/**
 * set을 통해서 캐시에 값을 할당 할 수 있게 한다.
 * get은 자기 자신의 key값으로 캐시에 접근 할 수 있게 한다.
 * 여기서 다시 set을 하지 않는 이상, value와 key는 변경되지 않는다.
 * 그렇다면 generateElement에서 set과 get이 적절하게 역할 분류가 된 것인가?
 * 해당 코드의 역할이 무엇인가? 요소를 생성하는 것 아닌까? 그렇다면, key와 value값을 가지고 있으면 된다. 즉, cache가 내부에서 동작 해야하는 이유가 무엇인가?
 * 오히려, 내부에서 cache를 사용해야하는 이유는 key와 value를 한번에 관리하는 map값을 생성하려는 것이며, 나머진 메타 데이터이다.
 */

/**
 * @description 해당 코드는 initialize 프로퍼티와 set, get 프로퍼티로 동작을 한다.
 * @remark 해당 코드에서 문제점은 initialize 프로퍼티(리터럴 함수)와 set과의 역할 분리가 불분명 하다는 것이다. 즉, 해당 코드가 행동되는 것을 나열해 보면, 다음과 같다.
 * @example
 * 1. initialize 프로퍼티를 통해서 value를 설정한다.
 * 2. key가 생성된다.
 * 3(option). set 프로퍼티를 통해서 생성된 generateElement의 key와 value를 캐시에 저장한다.
 * 4(option). get 프로퍼티를 통해서 generateElement의 key와 value를 캐시에서 가져온다.
 * * notify-1 : 해당 generateElement는 일회성이다. 즉, index에서 key 값을 다시 호출해서 선언(재할당)을 하게 되면, 새로운 createKey가 동작하면서, heap의 값을 새로 생성하게 된다. 이로 인해서 메모리 누수가 발생할 수 있다.
 * * notify-2 : 해당 코드 key는 싱글톤으로 createKey가 한번 호출되어서 사용되고 있다. 그래서 가시적으로 같인 key 값을 호출 하디만, 메모리상 다른 공간을 사용하고 있다.
 * * notify-3 : 선언한 key 값이 외부에서 변경될 경우, 기존 새로 heap에 생성된 key 값의 참조가 변경된다. 이로 인해서 의도치 않은, 확인 되지 않은 값들이 생성되거나 저장 될 수 있다.
 */

const generateElement = {
    key : createKey(),
    value : null,
    initialize: function(value){
        return this.value = value;
    },
    /**
     * @description set 프로퍼티는 createCache를 통해서 로컬 캐시에 값을 할당 할 수 있게 한다.
     * @remark set 프로퍼티는 자기 자신의 key와 value를 캐시에 저장한다. 다만, 로컬로 구현이 되어 있기 때문에, 외부에서 해당 캐시의 데이터 값을 확인하기에 적합하지 않으며, 어려움이 있다.
     * @returns {Map}
     */
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