
function services_navigationIcons(navigate: string): string {

  switch (navigate) {
    case "Straight":
      return "/img/arows/top.png";
    case "Left":
      return "/img/arows/left.png";
    case "Right":
      return "/img/arows/right.png";
    case "SlightRight":
      return "/img/arows/rightTop.png";
    case "SlightLeft":
      return "/img/arows/topLeft.png";
    default:
      return "/img/arows/stop1.png";
  };
};

export default services_navigationIcons;


