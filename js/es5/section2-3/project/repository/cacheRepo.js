// 해당 코드에는 LRU가 동작할 `자료구조`만 존재, 그렇다면 자료 구조란 무엇인가?
// cacheRepo는 외부에서 접근이 불가능 해야하나? IIFE 방식으로 작성해야하나?
// B 방식으로 구현 추후에 A 방식 추가, map을 직접 구현

var cacheRepo = (function(){
    var cache = {}  //model, momory 값을 복사 - Dictionary, 단, 순서가 보장되지 않음.
    var order = []  //cache의 순위 즉, history, 앞의 값이 가장 오래됨. 단, 순서는 보장됨.
    var maxSize = 10;

    function get(key){
        if(cache.hasOwnProperty(key)){
            // 제거하고
            removeFromOrder(key);
            // 다시 기입
            order.push(key);
            // 동기화 완료
            return cache[key];
        } else {
            return null;
        }
    }

    function set(key, node){
        if(cache.hasOwnProperty(key)){
            cache[key] = node;
            // 제거하고
            removeFromOrder(key);
            // 다시 기입
            order.push(key);
            // 동기화 완료
        } else {    // 만약 새로운 값이라면 수행하는 것인가? 기존에 있는 값을 수정 하는데 왜 용량을 확인하지?
            // removeFromOrder(key);
            if(order.length >= maxSize){    // 용량이 초과
                // order에서 앞에 값을 추출(앞의 값은 오래된 값)
                var oldestKey = order.shift();
                // 해당 닶을 이제 캐시에서도 제거
                delete cache[oldestKey];
            } 
            // 지정한 값에 수정한 node를 추가
            cache[key] = node;
            order.push(key);
        } 
    }

    /** 제거할 key 값을 order에서 순회하고 제거하는 로직 */
    function removeFromOrder(key){
        for(var i = 0; i < order.length; i++){
            if(order[i] === key){
                // key가 있는 바로 그 위치를 제거
                order.splice(i, 1);
                break
            }
        }
    }

    return{
        get: get,
        set: set,
        remove: removeFromOrder
        // gcRemove: removeFromCache
    }

})();

module.exports = cacheRepo;