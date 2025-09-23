// Leave the next line, the form must be assigned to a variable named 'form' in order for the exercise test to pass
const form = document.querySelector('form');
const list = document.querySelector('#list');
form.addEventListener('submit', function (e) {
  // const productInput = document.querySelector('#product');
  // const qtyInput = document.querySelector('#qty');
  e.preventDefault();

  const pro = form.elements.product;
  const qty = form.elements.qty;
  // console.log(`${pro}, ${qty}`);

  add_li(pro.value, qty.value);
  pro.value = '';
  qty.value = '';
});


function add_li(pro, qty) {
  const cre_li = document.createElement("li");
  // cre_li.append(qty);
  // cre_li.append(` ${pro}`);
  // console.log(cre_li);
  // list.append(cre_li);

  list.appendChild(cre_li);
  cre_li.innerText = `${qty} ${pro}`


}
