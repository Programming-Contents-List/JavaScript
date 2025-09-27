/** 
 * Map이나 WeakMap을 사용해서 간이 메모리 주소를 생성할 수도 있다. 하지만, 더 고유하게 하기 위해선 uuid를 사용하는 방법이 좋다 판단 된다. 
 * 물론, Js를 사용할 때는 Heap의 주소를 알아야 할 필요는 없지만, Js 단에서 메모리를 관리하기 위한 방법이다.
 * */

/**
 * @title createAddress 명세서(은닉성 확보 - 프로퍼티 내부 함수형 : 싱글톤 패턴이 가능)
 * @descripton 목적 : createAddress는 객체를 생성할 때, 간이 메모리 주소를 생성하기 위한 리터럴이다.
 * @remark 프로퍼티로는 date, id를 사용해서 init 함수를 통해 간이 메모리 주소를 생성한다. 해당 프로퍼티는 오로지 get만 존재한다. 
 * - WeakMap은 <Object, any>이기 때문에 <any, any>인 Map으로 변경.
 */

//const id = new Map();  // 싱글톤이 아니다? 캡슐이 깨진다?

const createAddress = {
    /** 프로퍼티로 두면, 은닉성이 보장 되지 않는다. */
    // init : (function(id, key, date){
    //     return id.set(key, date);
    // }),
    /**
     * @remark ES5 함수를 외부에서 바로 실행 시키기 위해서는 function(){}() 와 같은 형태로 작성해야 한다. IFFE 방식이라 한다.
     */
    // id : new Map(),
    get: (function(){
        // id와 date 네이밍을 다시 지어야한다.
        const date = new Date().getTime();
        const id = new Map();
        function init(key){
            return id.set(key, date);
        }
        return function(key){
            init(key);
            return id.get(key);
        }
    })()
}

export default createAddress;