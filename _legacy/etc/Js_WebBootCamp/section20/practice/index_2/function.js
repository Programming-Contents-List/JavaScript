function capitalize(str) {
  // re_Str = str[0].toUpperCase();
  re_Str = str.replace(str[0], str[0].toUpperCase());
  console.log(re_Str);
  return re_Str;
}

capitalize("eggplant");
capitalize('pamplemousse') // "Pamplemousse"
capitalize('squid') //"Squid"