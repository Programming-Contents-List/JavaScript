import elementService from "../../function/elementService.js";
/**
 * @title 엘리먼트 생성 책임 : Manager 역할을 하는 객체이다.
 * @description elementManager는 엘리먼트를 상태만을 확인하는 책임을 가지고 있다. 그래서, element를 직접 조회하거나 설정하지 않는다. 그래서, element의 `내부`를 알 필요가 없다.
 * @remark 이 객체는 싱글톤 패턴을 사용하기 위한 하나의 Manager이며 `피막`이다, `생명주기`를 관리하는 역할이다.
 * @property {Object} element - 엘리먼트 객체
 * @property {function} initialize - 엘리먼트 초기화 함수
 */

const elementManager = {
    element : "",

    /**
     * @title 엘리먼트의 초기화 여부 판단
     * @description 현재 state는 엘리먼트가 초기화 되었는지에 관한 여부이다.
     */
    state: function() {
       if(!this.element) return false;
    //    현재 아래 코드는 state와는 무관한 코드이다.
    //    const {code} = elementService.validate(this.element);
    //    return code === 200;
    },
    /**
     * @title 엘리먼트 초기화 함수
     * @description initialize는 엘리먼트를 초기화하는 함수이다. 만약 엘리먼트가 초기화 되지 않았다면 createElement가 동작한다. 단, 이미 만들어져 있다면, 경고를 하고 엘리멘트를 초기화 한다.
     * @returns {Object}
     */
    initialize : function(){
        if(!this.state()){
            this.element = elementService.create();
        }
        return this.element;
    },

    get : function(){
        console.log(this.element);
        return elementService.get(this.element);
    },

    set: function(key, value){
        if(!this.state()){
            console.error("element is not initialized")
            return;
        }
        this.element = elementService.set(this.element, key, value);
        return this.element;
    }
};

/**
 * @title 로깅 함수 : 매니저 함수를 로깅하는 함수이다.
 * @description withLogging는 매니저 함수를 로깅하는 함수이다. 매니저 함수를 로깅하는 함수이다.
 * @reference 
 * - [elementService.js](js/es5/section2-3/object/function/elementService.js)
 * @remark 다시 한번 짚어 봐야한다.
 * - 이 함수는 **Manager 객체 전용** 로깅 함수로, elementService.js의 로깅 함수와 구분된다.
 * - elementService.js의 withLogging은 **Service 계층(상태 없는 순수 함수)** 의 호출을 로깅하지만,  
 *   이 함수는 **Manager 계층(상태ful, 생명주기 관리 객체)** 의 메서드를 로깅한다.
 * - 즉, 로깅의 목적이 다르다:  
 *   Service용 → "함수 호출의 입력/출력" 중심  
 *   Manager용 → "객체 상태 변화와 생명주기 흐름" 중심
 * - 데이터 프로퍼티(예: element)는 로깅하지 않고 그대로 복사하여 반환한다.
 * @param {Object} manager - 매니저 함수
 * @returns {Object} - 로깅된 매니저 함수
 */
function withLogging(manager){
    var logged = {};
    for(var key in manager){
        var value = manager[key];

        if(typeof value === "function"){
            logged[key] = (function(keyName, originalFn){
                return function(){
                    console.log('[Mananger,', keyName, '] called:', arguments);
                    var result = originalFn.apply(this, arguments);
                    console.log('[Mananger,', keyName, '] returned:', result);
                    return result;
                }
            })(key, value);
        } else {
            logged[key] = value;
        }   
    }
    return logged;
}

export default withLogging(elementManager);