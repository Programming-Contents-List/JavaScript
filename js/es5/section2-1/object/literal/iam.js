import { default as MyConsole } from "./console.js";
import Dog from "../constructor/dog.js";
/**
 * 프로퍼티 = 객체의 상태를 구성하는 특징
 * 객체 리터럴 방식
 */
const iam ={
    name : "dongwookim",    //상태
    age : 30,               //상태
    job : "developer",
    abilities : ["javascript", "html", "css"],
    myDog : new Dog().name = "Tom",
    programming : function(){
        MyConsole.log("I love programming");
        // closer : 자연스러운 문법 구조, 인지하고 사용하지는 않는다.
        const test = "closer";
        const introduce = () => {
            MyConsole.log("my name is " + this.name)
            return test;
        };
        
        // 객체 리터럴 방식
        const iSay ={
            isMyname : this.name,
            isMyage : this.age,
        }
        return {introduce, iSay, test};
    },
    legacy : function(){
        this.name = "legacy";
        const legacy = "this is legacy, Not Object just reference for store data(value)"
        return legacy;
    }
}

/* -------------------------------main----------------------------- */

MyConsole.log(iam.name);
console.log("1-");
iam.programming();
console.log("2-");
iam.programming().introduce();
console.log("3-");
MyConsole.log(iam.programming().introduce());
console.log("4-");
MyConsole.log(iam.programming().iSay.isMyname);
console.log("5-");
MyConsole.log(iam.myDog);

/* -------------------------------print----------------------------- */
/**
 * dongwookim
 * 1-
 * I love programming
 * 2-
 * I love programming
 * my name is dongwookim
 * 3-
 * I love programming
 * my name is dongwookim
 * closer
 * 4-
 * I love programming
 * dongwookim
 * 5-
 * Tom
 */