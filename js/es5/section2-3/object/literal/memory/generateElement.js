// import createElement from "../../function/createElement.js";
// import { setGlobalCache, getGlobalCache } from "../../function/memory/createCache.js";
import element from "../element.js";
/**
 * @title 엘리먼트 생성 책임 : Manager 역할을 하는 객체이다.
 * @description generateElement는 엘리먼트를 상태만을 확인하는 책임을 가지고 있다. 그래서, element를 직접 조회하거나 설정하지 않는다. 그래서, element의 `내부`를 알 필요가 없다.
 * @remark 이 객체는 싱글톤 패턴을 사용하기 위한 하나의 Manager이며 `피막`이다.
 * @property {Object} element - 엘리먼트 객체
 * @property {function} initialize - 엘리먼트 초기화 함수
 */

const generateElement = {
    element : null,

    state: function() {
        if (!this.element) return false;
        if (this.element.key === null) return false;
        if (this.element.value === null) return false;
        return true;
    },
    /**
     * @title 엘리먼트 초기화 함수
     * @description initialize는 엘리먼트를 초기화하는 함수이다. 만약 엘리먼트가 초기화 되지 않았다면 createElement가 동작한다. 단, 이미 만들어져 있다면, 경고를 하고 엘리멘트를 초기화 한다.
     * @returns {Object}
     */
    initialize : function(){
        if(this.state() === false){
            return {
                element : this.element = element // 여기서 생성이 되어야 한다.
            };
        } else {
            console.warn("element is already initialized");
            return {
                element : this.element
            };
        }
    },
    /**
     * @title 엘리먼트 조회 함수 - 해당 부분은 service 역할이다.
     * @description get는 엘리먼트를 조회하는 함수이다.
     * @returns {Object}
     */
    get : function(){
        console.log(this.element);
        return this.element;
    },
    /**
     * @title 엘리먼트 설정 함수 - 해당 부분은 service 역할이다.
     * @description set는 엘리먼트를 설정하는 함수이다.
     * @param {string} key - 엘리먼트 키
     * @param {string} value - 엘리먼트 값
     * @returns {Object}
     */
    set: function(key, value){
        if(this.state() === false){
            console.error("element is not initialized");
            return;
        }
        this.element.key = key;
        this.element.value = value;
        return this.element;
    }
};

export default generateElement;