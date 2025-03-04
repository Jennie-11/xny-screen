import Layout from "@/page/index/";
export default [
  {
    name: "工作台",
    component: Layout,
    path: "/",
    redirect: "/xnyHome",
    children: [
      // {
      //   path: "home",
      //   name: "首页",
      //   meta: {
      //     i18n: "home",
      //   },
      //   component: () =>
      //     import(/* webpackChunkName: "views" */ "@/views/home/index"),
      // },
      {
        path: "xnyHome",
        name: "新能源应用材料事业部",
        meta: {
          i18n: "xnyHome",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/xnyHome/index"),
      },
    ],
  },
];
