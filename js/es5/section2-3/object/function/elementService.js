/**
 * @title 엘리먼트 서비스 : 엘리먼트를 생성, 조회, 설정하는 서비스이다, 상태 없는 순수 함수다.
 * @reference 
 * - [service-independence-pattern](js/es5/_ref.doc/service-independence-patterns.md)
 * - [refactoring.guru](https://refactoring.guru/design-patterns/service-independence-pattern)
 */
const elementService = {
    create: function(){
        return { key: null, value:null}
    },
    get: function(key){
        return this.key;
    },
    set: function(key, value){
        this.key = key;
        this.value = value;
    }
}