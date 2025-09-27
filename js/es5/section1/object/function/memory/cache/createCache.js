function createCache(){
    // default value
    const key = "test";
    const value = "0xtest";
    const cache = new Map();
    return cache.set(key, value);
}

export default createCache;