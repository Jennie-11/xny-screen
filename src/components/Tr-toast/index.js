import Vue from "vue";
import comfirm from "./Tr-toast.vue";
let newInstance = null;
//将vue组件变为构造函数
let ConfirmConstructor = Vue.extend(comfirm);
let init = (options) => {
  //实例化组件
  newInstance = new ConfirmConstructor();
  //合并配置选项
  Object.assign(newInstance, options);
  //加载dom

  document.body.appendChild(newInstance.$mount().$el);
};
let caller = (options) => {
  //options 为调用组件方法时传入的配置选项
  if (!newInstance) {
    init(options);
  }
  return newInstance.show(() => {
    newInstance = null;
  });
};
export default {
  install(vue) {
    vue.prototype.$textShow = caller;
  },
};
