// 해당 코드에는 LRU가 동작할 `자료구조`만 존재, 그렇다면 자료 구조란 무엇인가?
// cacheRepo는 외부에서 접근이 불가능 해야하나? IIFE 방식으로 작성해야하나?
// B 방식으로 구현 추후에 A 방식 추가, map을 직접 구현

var cacheRepo = (function(){
    var cache = {}  //model, momory 값을 복사 - Dictionary
    var order = []  //cache의 순위 즉, history, 앞의 값이 가장 오래됨.
    var maxSize = 10;

    function get(key){
        if(cache.hasOwnProperty(key)){
            removeFromOrder(key);
            order.push(key);
            return cache[key];
        } else {
            return null;
        }
    }

    function set(key, node){
        if(cache.hasOwnProperty(key)){
            cache[key] = node;
            removeFromOrder(key);
            order.push(key);
        } else {
            // removeFromOrder(key);
            if(order.length >= maxSize){    // 용량이 초과
                var oldestKey = order.shift();
                delete cache[oldestKey];
            } 
            cache[key] = node;
            order.push(key);
        } 
    }

    function removeFromOrder(key){
        for(var i = 0; i < order.length; i++){
            if(order[i] === key){
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