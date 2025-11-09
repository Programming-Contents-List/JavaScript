/**
 * @title 엘리먼트 서비스 : 엘리먼트를 생성, 조회, 설정하는 서비스이다, 상태 없는 순수 함수다.
 * @reference 
 * - [service-independence-pattern](js/es5/_ref.doc/service-independence-patterns.md)
 * - [refactoring.guru](https://refactoring.guru/design-patterns/service-independence-pattern)
 */
const elementService = {

    validate : function(el){
        return el.key !== null && el.value !== null;
    },

    create: function(){
        return { key : null, value : null}
    },

    get: function(el){
        return el;
    },

    set: function(el, key, value){
       el.key = key;
       el.value = value;
       return el;
    }
}

/**
 * @title 로깅 함수 : 서비스 함수를 로깅하는 함수이다. (IIFE 패턴)
 * @description withLogging는 서비스 함수를 로깅하는 함수이다. 서비스 함수를 로깅하는 함수이다.
 * @remark 리터럴을 key, value로 만들어서 반환하고 컨트롤 하는 것이다.
 * @param {Object} service - 서비스 함수
 * @returns {Object} - 로깅된 서비스 함수
 */
function withLogging(service){
    var logged = {};
    for(var method in service){
        logged[method] = (function(methodName, originalFn){
            return function() {
                console.log('[Service,', methodName, '] called:', arguments);
                var result = originalFn.apply(this, arguments);
                console.log('[Service,', methodName, '] returned:', result);
                return result;
            }
        })(method, service[method]);
    }
    return logged;
}

export default withLogging(elementService);