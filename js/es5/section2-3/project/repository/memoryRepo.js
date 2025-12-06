import createKey from '../../object/function/memory/createKey.js';

var memoryRepo = (function(){
    var pool = {};

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

    function putNode(address, value, lastAccess, refCount){
        pool[address] = {
            address: address,
            value: value,
            refCount: refCount,
            createdAt: getNode(address).createdAt,
            updatedAt: Date.now(),
            lastAccess: lastAccess
        }
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
        // readKey: getKey()
    };
})();

export default memoryRepo;