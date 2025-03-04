let clientWidth = window.innerWidth / 1920;
// let innerHeight = window.innerHeight / 1920;

export const bgPsFun = (x, y) => {
  let domStyle = `background-position: ${clientWidth * x}px ${
    clientWidth * y
  }px;`;
  return domStyle;
};
export const vhFun = (value, key) => {
  let domStyle = `${key}: ${(value / 1080) * 100}vh;`;
  return domStyle;
};
export const activeClass = (status, status1 = 1, status2 = 2) => {
  return status == status1 ? "ff7Active" : status == status2 ? "ff0Active" : "";
};
