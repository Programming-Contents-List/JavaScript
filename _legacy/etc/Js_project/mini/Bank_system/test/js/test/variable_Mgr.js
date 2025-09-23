export const My_money = {
  money: 100,

  get_money() {
    console.log(this.money);
    return this.money;
  },

  add(m) {
    this.money += m;
    return this.money;
  }
}