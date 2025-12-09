import createKey from '../utils/createKey.js';

/**
 * @Todo ES5 환경 비호환 (미해결)
 * @Todo 최적화 미완료 - getNode(address).createdAt만 저장 → 노드 전체를 저장하면 더 유연
 * @remark SRP(S) : 단일 책임 원칙 - 메모리 저장소 역할만
 * @remark OCP(O) : 개방-폐쇄 원칙 - △ - node 구조 변경 시 putNode 수정 필요
 * @remark DIP(D) : 의존 역전 원칙 - △ - createKey 직접 import
 */

var memoryRepo = (function(){
    var pool = {};  // Dictionary

    function initialize(value){ // instance/create
        var address = createKey();
        pool[address] = {
            address: address,
            value: value,
            refCount: 0,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            lastAccess: Date.now()
        };
        return address;
    };

    function getNode(address) {
        return pool[address];
    }


    function getAllNode(){
        // 얕은 복사를 사용하기를 추천
        return pool;
    }


    function putNode(address, value, lastAccess, refCount){
        // var existingNode = getNode(address).createdAt;
        // pool[address] = {
        //     address: address,
        //     value: value,
        //     refCount: refCount,
        //     createdAt: existingNode,
        //     updatedAt: Date.now(),
        //     lastAccess: lastAccess
        // }
        pool[address].value =value;
        pool[address].refCount = refCount;
        pool[address].updatedAt = Date.now();
        pool[address].lastAccess = lastAccess;
    }

    function delNode(address) {
        delete pool[address];
        return address;
    }

    return{
        create: initialize,
        read: getNode,
        update: putNode,
        delete: delNode,
        readAll: getAllNode
        // readKey: getKey()
    };
})();

export default memoryRepo;