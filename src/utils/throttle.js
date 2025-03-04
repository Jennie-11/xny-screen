let temp = null;
const throttleFn = (fn, time, firstRequest) => {
  //3. 通过闭包保存一个 "防抖阀" 默认为false

  //5.  开启定时器
  if (firstRequest) {
    temp = null;
  }
  if (temp) {
    console.log("防抖阀设置为true");

    return;
  } else {
    temp = true;
    console.log("内容变更");
    setTimeout(() => {
      fn.apply(this);
      console.log("内容变更");

      //6. 将外部传入的函数的执行放在setTimeout中
      //7. 最后在setTimeout执行完毕后再把标记'防抖阀'为false(关键)  表示可以执行下一次循环了。当定时器没有执行的时候标记永远是true，在开头被return掉
      temp = null;
    }, time);
  }

  // }
  // };
};
export const throttle = (callback, time) => {
  window.addEventListener("resize", throttleFn(callback, time));
};
