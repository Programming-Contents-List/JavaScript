import elementManager from "./section2-3/object/literal/memory/elementManager.js";
import memoryRepo from "./section2-3/project/repository/memoryRepo.js";

elementManager.initialize();
// elementManager.set("key", "value");
var node = elementManager.setValue("Tester");

var memoryNode = memoryRepo.create(node);

var nodeAddress = memoryRepo.readAll();
// value가 undefined로 나온다. 해당 부분 수정이 필요하다.
console.log(memoryRepo.read(memoryNode));
console.log(nodeAddress);
