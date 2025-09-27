import createCache from "../../../function/memory/cache/createCache.js";

const generateCache = {
    // init: createCache,  // 프로퍼티이기 때문에 은닉성이 보장 되지 않는다.
    get: function(){
        // createCache가 왜 필요한가? 그냥 여기서 프로퍼티에 객체를 생성하면 되는거 아닌가?
        const cache = createCache();
        return cache.get("test");
    }
}

export default generateCache;