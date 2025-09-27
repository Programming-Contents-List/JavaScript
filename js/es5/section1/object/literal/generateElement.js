// 요소를 만들어주는 리터럴

const object = {
    // default literal
    id : "myElement",
    name : "myElement",
    subName : "mySubElement",
    role : "myRole",
    type : "myType",

    // new literal : 은닉성이 보장되지 않는다.
    set : function(id, name, subName, role, type){
        id = id || this.id;
        name = name || this.name;
        subName = subName || this.subName;
        role = role || this.role;
        type = type || this.type;
        return {id, name, subName, role, type};
   },

    get: function(){
        return {
            id : this.id,
            name : this.name,
            subName : this.subName,
            role : this.role,
            type : this.type,
        };
    }
}

export default object;