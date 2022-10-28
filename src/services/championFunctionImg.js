function championFunctionImg(str) {
  switch (str) {
    case "Tanque":
      return "https://i.imgur.com/jZy2IA6.png";
    case "Suporte":
      return "https://i.imgur.com/O2LOsQI.png";
    case "Mago":
      return "https://i.imgur.com/mk6MZRw.png";
    case "Assassino":
      return "https://i.imgur.com/RxBGcfv.png";
    case "Atirador":
      return "https://i.imgur.com/jHj6G8a.png";
    case "Lutador":
      return "https://i.imgur.com/r8Pe3UF.png";
    default:
      return str;
  }
}
export default championFunctionImg;
