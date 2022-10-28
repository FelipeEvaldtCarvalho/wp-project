function championFunction(str) {
  switch (str) {
    case "Tank":
      return "Tanque";
    case "Support":
      return "Suporte";
    case "Mage":
      return "Mago";
    case "Assassin":
      return "Assassino";
    case "Marksman":
      return "Atirador";
    case "Fighter":
      return "Lutador";
    default:
      return str;
  }
}
export default championFunction;
