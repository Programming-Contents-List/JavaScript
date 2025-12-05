import chalk from "chalk";
import util from "util";
import element from "../../project/model/element.js";
import createKey from "./memory/createKey.js";

/**
 * @title 엘리먼트 서비스 : 엘리먼트를 생성, 조회, 설정하는 서비스이다, 상태 없는 순수 함수다.
 * @reference 
 * - [service-independence-pattern](js/es5/_ref.doc/service-independence-patterns.md)
 * - [refactoring.guru](https://refactoring.guru/design-patterns/service-independence-pattern)
 */

const elementService = {
    /**
     * @title 엘리먼트 타입 검증
     * @description validate는 엘리먼트의 타입을 검증하는 함수이다. 엘리먼트의 타입이 객체가 아니라면, 검증을 실패한다.
     */
    validate : function(el){
        if(typeof el === "object"){
            return {
                code : 200,
                message : "passed, enough validation"
            };
        }
        return {
            code : 400,
            message : "key and value are required"
        };
    },

    create: function(){
        return { ...element, key : createKey() };
    },

    get: function(el){
        return el;
    },

    set: function(el, key, value){
       el.key = key;
       el.value = value;
       return el;
    },

    setValue: function(el, value){
        el.value = value;
        return el;
    }
}

/**
 * @title 로깅 함수 : 서비스 함수를 로깅하는 함수이다. (IIFE 패턴)
 * @description withLogging는 서비스 함수를 로깅하는 함수이다. 서비스 함수를 로깅하는 함수이다.
 * @remark 리터럴을 key, value로 만들어서 반환하고 컨트롤 하는 것이다. 여기서 주의할 점은 validate 함수가 어떤 상태라도 log는 출력한다.
 * @param {Object} service - 서비스 함수
 * @returns {Object} - 로깅된 서비스 함수
 */
function withLogging(service){
    var logged = {};
    for(var method in service){
        if(typeof service[method] !== "function") continue;
        
        logged[method] = (function(methodName, originalFn){
            return function() {
                console.log(
                    chalk.bgBlue('[Service,', methodName, '] called:'), 
                    util.inspect(arguments, { depth: null, colors: true }
                ));
                var result = originalFn.apply(this, arguments);
                console.log(
                    chalk.bgBlue('[Service,', methodName, '] returned:'), 
                    util.inspect(result, { depth: null, colors: true }
                ));
                return result;
            }
        })(method, service[method]);
    }
    return logged;
}

/**
 * @title 엘리먼트 서비스 : 엘리먼트를 생성, 조회, 설정하는 서비스이다, 상태 없는 순수 함수다.
 * @reference 
 * - [service-independence-pattern](js/es5/_ref.doc/service-independence-patterns.md)
 * - [refactoring.guru](https://refactoring.guru/design-patterns/service-independence-pattern)
 */

const loggerService = withLogging(elementService);

export default loggerService;