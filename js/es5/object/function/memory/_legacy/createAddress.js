/** 
 * Map이나 WeakMap을 사용해서 간이 메모리 주소를 생성할 수도 있다. 하지만, 더 고유하게 하기 위해선 uuid를 사용하는 방법이 좋다 판단 된다. 
 * 물론, Js를 사용할 때는 Heap의 주소를 알아야 할 필요는 없지만, Js 단에서 메모리를 관리하기 위한 방법이다.
 * */

/**
 * @title createAddress 명세서(은닉성 확보 - 함수형)
 * @descripton 목적 : createAddress는 객체를 생성할 때, 간이 메모리 주소를 생성하기 위한 리터럴이다.
 * @remark 프로퍼티로는 date, id를 사용해서 init 함수를 통해 간이 메모리 주소를 생성한다. 해당 프로퍼티는 오로지 get만 존재한다.
 */

const createAddress = function() {
    const date = new Date().getTime();
    const id = new Map();

    function init(key){
        return id.set(key, date);
    }

    /**
     * `()`를 사용하지 않고 객체를 반환하는 방법이다.
     * @example return function(key) {
            init(key);
            return id.get(key);
        }
     */

    return {
        get: function(key) {
            init(key);
            return id.get(key);
        }
    }
}//() : IFFE 방식

export default createAddress;