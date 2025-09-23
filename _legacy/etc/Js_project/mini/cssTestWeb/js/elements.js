//요소 지정 함수 -> id
function getIDelement(ele_Id) {
  const button = document.querySelector(`#${ele_Id}`);
  return button;
}
//요소 지정 함수 -> class
function getCLelement(ele_Class) {
  const button = document.querySelector(`.${ele_Class}`);
  return button;
}

/**클릭 이벤트 함수*/

//click
function getClickEvent(Btn, fn) {
  return Btn.addEventListener('click', fn);
}
//change
function getCheckEvent(box, fn) {
  return box.addEventListener('change', fn);
}

/**Object -> only use Object, Expect Object2 */
const Object = getCLelement('Object');

//>-------------------------------------------------------------

/** padding_Btn */
const pPb = getIDelement('padding_plus_Btn');
const pRb = getIDelement('padding_reset_Btn');
const pMb = getIDelement('padding_minus_Btn');

let padding_size = 0;

/** padding_Click */

//Event
getClickEvent(pPb, () => {
  console.log('pPb Click!')
  Object.style.padding = `${padding_size += 10}px`;
}
);
getClickEvent(pRb, () => {
  console.log('pRb Click!')
  Object.style.padding = `${0}px`
  padding_size = 0;
}
);
getClickEvent(pMb, () => {
  console.log('pMb Click!')
  Object.style.padding = `${padding_size -= 10}px`

  if (0 > padding_size) {
    padding_size = 0;
  }
}
);

//>-------------------------------------------------------------

/** margin_Btn */ //->수정
const mRb = getIDelement('margin_R-Btn');
const mLb = getIDelement('margin_L_Btn');
const mUb = getIDelement('margin_U_Btn');
const mDb = getIDelement('margin_D_Btn');
const mResetb = getIDelement('margin_Reset_Btn');
// mMb.disabled = true;
//margin 시계방향 위쪽,오른쪽,아래,왼쪽
const ComputedStyle = window.getComputedStyle(Object);
console.log(ComputedStyle.margin);

/** margin_Click */

//value
let r_size = 0;
let l_size = 0;
let u_size = 0;
let d_size = 0;
//current 변수 - 이중 선언 -> 왜 변수로 지정하면 값이 전달되지 않는가?
//ex) currentRight = `${Margin_size += 10}px`

let currentRight = Object.style.marginRight;
let currentLeft = Object.style.marginLeft;
let currentTop = Object.style.marginTop;
let currentBottom = Object.style.marginBottom;

//window.getComputedStyle로 접근한 margin 값
let current_Right = ComputedStyle.marginRight;
let current_Left = ComputedStyle.marginLeft;
let current_Top = ComputedStyle.marginTop;
let current_Bottom = ComputedStyle.marginBottom;
//위 둘의 차이는?
//나중에 함수 구현으로 셋과 겟을 만들 예정


//Event
getClickEvent(mRb, () => {
  current_Right = Object.style.marginRight = `${r_size += 10}px`
  console.log(`${current_Right} => Right_Click!`);
});
getClickEvent(mLb, () => {
  current_Left = Object.style.marginLeft = `${l_size += 10}px`
  console.log(`${current_Left} => Left_Click!`);
});
getClickEvent(mUb, () => {
  current_Top = Object.style.marginTop = `${u_size += 10}px`
  console.log(`${current_Top} => Up_Click!`);
});
getClickEvent(mDb, () => {
  current_Bottom = Object.style.marginBottom = `${d_size += 10}px`
  console.log(`${current_Bottom} => Down_Click!`);
});
getClickEvent(mResetb, () => {
  console.log(`Reset_Click!`);
  current_Right = Object.style.marginRight = `${0}px`;
  current_Left = Object.style.marginLeft = `${0}px`;
  current_Top = Object.style.marginTop = `${0}px`;
  current_Bottom = Object.style.marginBottom = `${0}px`;
  r_size = 0;
  l_size = 0;
  u_size = 0;
  d_size = 0;
});

//>-------------------------------------------------------------

/** border_Btn */
const s_Check = getIDelement('solid');
const dot_Check = getIDelement('dotted');
const dash_Check = getIDelement('dashed');
const dou_Check = getIDelement('double');
const gr_Check = getIDelement('groove');

const bPb = getIDelement('border_plus_Btn');
const bRb = getIDelement('border_reset_Btn');
const bMb = getIDelement('border_minus_Btn');

/** border_Click */
//value
let border_size = 0;
let check = '';
// const box_solid = 'solid';
// const box_dotted = 'dotted';
// const box_dashed = 'dashed';
// const box_double = 'double';
// const box_groove = 'groove';
const boxes = ['solid', 'dotted', 'dashed', 'double', 'groove'];
//나머지 체크박스를 제외하는 함수... 어떻게 만들지? 고민..
const setClickBtn = (box) => {
  const checkboxes = document.getElementsByName('checkbox');
  checkboxes.forEach(element => {
    element.checked = false;
  });
  box.checked = true;
}

const clickEvent = (box, box_type) => {
  console.log(box.checked);

  if (box.checked != false) {
    console.log("check");
    Object.style.border = box_type;
  } else if (box.checked != true) {
    console.log("uncheck");
    Object.style.border = '';
  }
  check = box_type;
  console.log(check);
  setClickBtn(box);

  return check;
}

/**=> solid */
getClickEvent(s_Check, () => { clickEvent(s_Check, boxes[0]) });
/**=> dotted */
getClickEvent(dot_Check, () => { clickEvent(dot_Check, boxes[1]) });
/**=> dashed */
getClickEvent(dash_Check, () => { clickEvent(dash_Check, boxes[2]) });
/**=> double */
getClickEvent(dou_Check, () => { clickEvent(dou_Check, boxes[3]) });
/**=> groove */
getClickEvent(gr_Check, () => { clickEvent(gr_Check, boxes[4]) });

//Event

const resetFn = () => {
  border_size = 0;
  Object.style.border = `${border_size}px`;
};

const mathFn = (math) => {
  if (check != '') {
    console.log('bPb Click!');
    Object.style.border = `${math}px ${check}`;
  }
  else {
    console.log(`unchecked ${check}`);
  }
}

getClickEvent(bPb, () => { mathFn(border_size += 5); });
getClickEvent(bRb, resetFn);
getClickEvent(bMb, () => { mathFn(border_size -= 5); });