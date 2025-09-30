/**
 * 최대한 캐시를 추상적으로 만들어야 한다. 정말 생성만 하는 하나의 행동만 가지고 있다.
 * 그렇다면, 생성이 후, get은 어디서 하는가? - get은 literal에서 동작하며 거기서 key와 value의 값을 관리할 수 있게 한다.
 * 왜 set을 return 하는가? 변수는 은닉성이 보장되기 때문에 그렇다. 물론, literal 내부에서도 선언할 수 있지만, 책임원칙에 따라 분리하는게 맞다고 판단 된다.
 * 따러서, createCache를 사용하는 literal에서는 외부로 부터 createCache를 호출 할 수 없어야 한다.
 * 
 * @todo 현재 전역 cache를 생성하기 전에 cache의 데이터를 확인할 수 있는 코드를 구현한다. 그렇다면 cache = new Map()이 아마도 매개변수로 받아서 하나의 map을 바라 봐야하지 않을까?
 */
function createCache(key, value){
    const cache = new Map();
    cache.set(key, value);
    return cache;
}

export default createCache;