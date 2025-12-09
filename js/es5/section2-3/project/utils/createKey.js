/**
 * @description 난수로 생성된 키값 생성
 */
function createKey(){
    var random = Math.random();
    var key = '0x'+random;
    return key.replace(".", "i").slice(0, 10);
}

export default createKey
