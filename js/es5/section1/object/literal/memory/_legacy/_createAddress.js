/** 
 * Map이나 WeakMap을 사용해서 간이 메모리 주소를 생성할 수도 있다. 하지만, 더 고유하게 하기 위해선 uuid를 사용하는 방법이 좋다 판단 된다. 
 * 물론, Js를 사용할 때는 Heap의 주소를 알아야 할 필요는 없지만, Js 단에서 메모리를 관리하기 위한 방법이다.
 * */

/**
 * @title createAddress 명세서(은닉성 확보 되지 않음)
 * @deprecated 사용하지 않는 리터럴, 해당 변수는 ES5에 맞지 않다. 참고용, function/createAddress.js 참고
 * @descripton 목적 : createAddress는 객체를 생성할 때, 간이 메모리 주소를 생성하기 위한 리터럴이다.
 * @remark 프로퍼티로는 date, id를 사용해서 init 함수를 통해 간이 메모리 주소를 생성한다. 해당 프로퍼티는 오로지 get만 존재한다.
 */

const createAddress = {
    date : new Date(),
    id : new WeakMap(),
    /**
     * @remark private `_`는 단순 네이밍 컨벤션이다. ES2022에서는 `#`를 사용한다.
     * @deprecated WeakMap은 <Object, any>이기 때문에 string으로 할 수 없다.
     * @param {string} key - 선언된 변수의 이름을 주입한다.
     * @returns {WeakMap<string, Date>} - 간이 메모리 주소를 반환한다.
     */
    _init : function(key){
        return this.id.set(key, this.date);
    },

    /**
     * @param {string} key - 선언된 변수의 이름을 주입한다.
     * @returns {WeakMap<string, Date>} - 간이 메모리 주소를 반환한다. : 잘못된 방법
     */
    get: function(key){
        this.init(key);
        return this.id.get(key);
    }
}