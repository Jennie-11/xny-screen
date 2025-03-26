import Layout from "@/page/index/";
export default [
  {
    path: "/xnyHome",
    redirect: "/xnyHome1",
  },
  {
    path: "/xnyHomecustomer",
    redirect: "/xnyHomecustomer5",
  },
  {
    path: "/xnyHomecustomer:lineId",
    name: "新能源应用材料事业部",
    meta: {
      i18n: "xnyHomecustomer",
    },
    component: () =>
      import(/* webpackChunkName: "views" */ "@/views/xnyHome/customer"),
  },
  {
    name: "首页",
    component: Layout,
    path: "/",
    redirect: "/xnyHome",
    children: [
      {
        path: "xnyHome:lineId",
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
