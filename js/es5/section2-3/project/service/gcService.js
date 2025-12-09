/** 
 * memoryRepo의 모든 노드를 순회 
 * 삭제할 때, cacheRepo의 값도 제거
 * memoryRepo.pool 직접 접근 허용?
 */

import memoryRepo from "../repository/memoryRepo";
import cacheRepo  from "../repository/cacheRepo";

var gcService = (function(){
    function collect(){
        var memoryAll = memoryRepo.readAll();

        // memroyAll의 key 값만 address안에 들어간다.
        for (var address in memoryAll){
            // 여기서 continue는 가짜 키를 건너뛰고 다음 반복으로 넘어가라는 의도, 즉, 방해(false)되는 요소는 건너 뛰고 반복동작을 하라는 뜻이다.
            if(!memoryAll.hasOwnProperty(address)) continue;
            var node = memoryAll[address];
            // 여기서 node가 false일 경우가 있나?
            if(!node) continue;
            // 타입 체크는 추후에 추가 예정
            if(node.refCount === 0){
                memoryRepo.delete(address);
                cacheRepo.gcRemove(address);
            }
        }
    }

    return{
        collect: collect,
    }
})();

export default gcService;