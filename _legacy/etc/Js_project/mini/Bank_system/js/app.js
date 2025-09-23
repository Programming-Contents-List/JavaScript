//App은 통합관계이다. 여기서 기능 구현이 되어야한다. 다시말해서 클릭구현의 스크립트를 가져오는 방식이 아니라 직접적으로 넣어야 하는가?
import { My_money } from "./money_Mgr.js";

// console.log(`check first Money = ${My_money.money}`);
My_money.get_money(My_money.money);
// console.log(`check second Money = ${My_money.money}`);
My_money.set_money(10);

console.log(`check third Money = ${My_money.money}`);
