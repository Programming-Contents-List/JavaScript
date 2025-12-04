/**
 * @title 노드 객체
 * @description 메모리 블록을 표현하는 데이터 구조.
 *              VirtualMemory에서 관리되는 단위 객체이다.
 * @remark model의 type을 담당한다.
 * @typedef {Object} MemoryNode
 * @property {string} address - 고유 주소 (0x + timestamp + random)
 * @property {*} value - 저장된 값
 * @property {number} refCount - 참조 카운트 (GC용)
 * @property {string} createdAt - 생성 시간
 * @property {string} updatedAt - 업데이트 시간
 * @property {string} lastAccess - 마지막 접근 시간
 */

/** @type {MemoryNode} */
var node = {
    address: "",
    value: "",
    refCount: 0,
    createdAt: "",
    updatedAt: "",
    lastAccess: ""
}