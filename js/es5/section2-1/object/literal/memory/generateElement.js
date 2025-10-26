import createKey from "../../function/memory/createKey.js";
// import createCache from "../../function/memory/createCache.js";
import { setGlobalCache, getGlobalCache } from "../../function/memory/createCache.js";
/**
 * @description 해당 코드는 initialize 프로퍼티와 set, get 프로퍼티로 동작을 한다.
 * @remark 해당 릴터럴 객체는 이미 식별자가 존재한다.
 * @remark 해당 코드에서 문제점은 initialize 프로퍼티(리터럴 함수)와 set과의 역할 분리가 불분명 하다는 것이다. 즉, 해당 코드가 행동되는 것을 나열해 보면, 다음과 같다.
 * @example
 * 1. initialize 프로퍼티를 통해서 value를 설정한다.
 * 2. key가 생성된다.
 * 3(option). set 프로퍼티를 통해서 생성된 generateElement의 key와 value를 캐시에 저장한다.
 * 4(option). get 프로퍼티를 통해서 generateElement의 key와 value를 캐시에서 가져온다.
 * * notify-1 : 해당 generateElement는 일회성이다. 즉, index에서 key 값(key: createKey 관점)을 다시 호출해서 선언(재할당)을 하게 되면, 새로운 createKey가 동작하면서, heap의 값을 새로 생성하게 된다. 이로 인해서 메모리 누수가 발생할 수 있다.
 *   - `[참고](https://github.com/Programming-Contents-List/JavaScript/blob/087fa3c0e1dd431158b321039edf43cd45fee11c/js/es5/section2/object/literal/memory/generateElement.js#L27)`
 *   * feedback : 여기서 오해한 부분은 generateElement.key를 호출 했다 해서 createKey함수가 동작, 실행, 호출 되면서 힙을 생성한 것이 아니라, key에 할당된 반환 값인 Map을 참조 하고 있기 때문에, `const test = generateElement.key = "newKey";`를 한다고 해서 createKey함수가 힙을 생성하는 것이 아니다.
 *     - 따라서, 메모리 누수는 Heap의 Map에서 발생하는 것이다. 단, GC가 동작하기 때문에 메모리 누수를 걱장할 필요는 없지만, index 적으로는 데이터가 밀리는 현상이 있을 수 있다.
 *   - 그렇다면, 왜 싱글톤으로 동작을 하는가. - 이는 객체 리터럴과 함수는 생성이 되면서, heap영역을 할당 받는데, 함수는 실행 컨테스트(ExectuionContext)가 생성되면서 메모리에 할당 되기 때문에, 팩토리로 동작을 하는 것이다.
 * * notify-2 : 해당 코드 key는 싱글톤으로 createKey가 한번 호출되어서 사용되고 있다. 그래서 가시적으로 같인 key 값을 호출 하지만, 메모리상 다른 공간을 사용하고 있다. 이를 해결 하기 위해서는 팩토리얼로 구현을 해야한다. 즉, 싱크가 맞지 않는다.
 *   - 싱글톤으로 하나의 객체를 참고 하고 있기 때문에 동적으로 데이터가 할당 되지 않는다. 이로인해서 팩토리를 사용해서 고유하지 않게 코드를 구현 하는 것이 맞다.
 *   - 하지만, 내가 생각한 탈 함수형에 가깝다고 볼 수 없다. 즉, 객체 리터럴을 기반으로 함수형이 동작을 해야한다.
 * * notify-3 : 선언한 key 값이 외부에서 변경될 경우, 기존 새로 heap에 생성된 key 값의 참조가 변경된다. 이로 인해서 의도치 않은, 확인 되지 않은 값들이 생성되거나 저장 될 수 있다.
 * @todo section/2 : generateElement가 생성됨과 동시에 힙영역에 발생한 메모리와 cache가 sync가 맞아야 한다. - globalCache를 사용해서 문제 해결 단, key값을 외부에서 변경이 가능하다.
 * @todo section/2-1 : key값을 외부에서 차단할 수 있도록 구현이 필요하다.
 * - 팩토리얼 적용 이후
 * 1. create로 생성된 객체를 식별자로 관리한다.
 * 2. initialize로 value를 설정한다.
 * 3. set로 key와 value를 캐시에 저장한다.
 * 4. get로 key와 value를 캐시에서 가져온다.
 * 5(option). cache의 callAllGlobalCacheEntries로 모든 객체를 확인 할 수 있다. / createCache의 함수들을 통해서 확인 할 수 있다.
 */

const generateElement = {
    // key : null,
    // value : null,

    /**
     * @title 생성 책임
     * @description create 프로퍼티는 새로운 객체를 생성하는 프로퍼티이다.
     * @remark create 프로퍼티는 새로운 객체를 생성한다. 단, generateElement의 프로퍼티를 상속 받고 있어 역할 분리가 명확하지 않다. 더불어서 현재, 팩토리 기반일 뿐, 캡슐화가 되어 있지 않아서, 객체 변경 시 외부에서 접근이 가능하다.
     * @todo 여기서 create는 과연 관심사 분리가 명확한가?
     */
    // create: function(){
    //     const instance = Object.create(this);
    //     instance.key = createKey();
    //     instance.initialize = function(value){
    //         return this.value = value;
    //     };
    //     return instance;
    // },

    /**
     * @title 데이터 관리 책임(key, value)
     * @description initialize 프로퍼티는 value를 설정하는 프로퍼티이다.
     */
    // initialize: function(value){
    //     return this.value = value;
    // },
    /**
     * @title 캐시 관리 책임
     * @description set 프로퍼티는 createCache를 통해서 로컬 캐시에 값을 할당 할 수 있게 한다. 사실상, set 보다는 saved 또는 initialize에 가깝다고 생각 된다.
     * @remark set 프로퍼티는 자기 자신의 key와 value를 캐시에 저장한다. 다만, 로컬로 구현이 되어 있기 때문에, 외부에서 해당 캐시의 데이터 값을 확인하기에 적합하지 않으며, 어려움이 있다.
     * @returns {Map}
     */
    // set: function(){
    //     if(this.value === null){
    //         console.warn("⚠️value is null, check initialize value");
    //     }
    //     setGlobalCache(this.key, this.value);
    //     return this;
    // },
    /**
     * @title 캐시 관리 책임
     */
    // get: function(){
    //     return getGlobalCache().get(this.key);
    // },
    create: function(){
        return {
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
                setGlobalCache(this.key, this.value);
                return this;
            },
            get: function(){
                return getGlobalCache().get(this.key);
            }
        }
    }
};

export default generateElement;