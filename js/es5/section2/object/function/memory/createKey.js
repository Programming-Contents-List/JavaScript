/**
 * 나누수로 생성된 키값 생성
 */
function createKey(){
    const random = Math.random();
    const key = `0x${random}`;
    return key.replace(".", "i").slice(0, 10);
}

export default createKey;
