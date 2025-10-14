import createKey from "./memory/createKey.js";

/**
 * @typedef {Object} ElementInstance
 * @property {string} key                 // 필수
 * @property {*|null} value               // 필수(초깃값 null 가능)
 * @property {function(*):ElementInstance} initialize  // 필수, 체이닝 가능
 */

/**
 * @this {Object}               // 바인딩된 프로토타입(예: element)을 가리킴
 * @returns {ElementInstance}   // key/initialize가 필수로 존재
 */

function createElement(){
    const instance = Object.create(this);
    instance.key = createKey();

    instance.initialize = function(value){
        return this.value = value;
    };
    
    return instance;
}

export default createElement;