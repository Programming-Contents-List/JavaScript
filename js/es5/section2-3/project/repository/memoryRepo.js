import createKey from '../../object/function/memory/createKey.js';
import node from '../model/node.js';

var memoryRepo = (function(){
    var pool = (function(){
        var memoryNode = node;  // alias
        return{
            initialize: (
                var date = toString(new Date.now()),

                function(){ // instance/create
                address: createKey;
                value: "initialize value";
                refCount: 0;
                createdAt: date;
                updatedAt: "";
                lastAccess: "";
            }),
            getKey: function(){
                return this.memoryNode.address;
            },
            getNode: function(){
                return this.memoryNode;
            },
            putNode: function(value, refCount, updatedAt, lastAccess){
                address: this.memoryNode.address;
                value: value;
                refCount: refCount;
                createdAt: this.date;
                updatedAt: updatedAt;
                lastAccess: lastAccess; 
            },
            delNode: function(address){
                if(this.memoryNode.address === address){
                    memoryNode.pop();
                }
            }
        }
    })

    return{
        create: pool.initialize(),
        read: this.getNode(),
        update: this.putNode(),
        delete: this.delNode(),
        readKey: this.getKey()
    };
})();
