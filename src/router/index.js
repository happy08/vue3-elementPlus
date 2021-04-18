import { createRouter, createWebHistory } from 'vue-router'
//import Home from '../views/Home.vue'

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]



//export default router


//import Router from "vue-router";


import Layout from "@/views/layout/layout";

export const commontRouterMap = [
  {
    path: "/",
    name: "default",
    //redirect: "/home/index",
    component: Layout
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index")
  },

];

export const localRouterMap = [
  // 本地后台菜单路由
  {
    path: "/adminMenu",
    name: "adminMenu",
    hidden: false,
    component: Layout,
    meta: {
      title: "本地菜单测试",
      icon: "el-icon-menu"
    },
    children: [
      {
        path: "menu1",
        name: "menu1",
        hidden: false,
        meta: {
          title: "本地菜单测试1",
          icon: "el-icon-menu",
          role: ["0", "1"] //可访问的角色名称
        },
        component: () => import("@/views/userpower1/1-1")
      },
      {
        path: "menu2",
        name: "menu2",
        hidden: false,
        meta: {
          title: "本地菜单测试2",
          icon: "el-icon-menu",
          role: ["0"] //可访问的角色名称
        },
        component: () => import("@/views/userpower1/1-2")
      }
    ]
  },
  //本地后台页面路由
  {
    path: "/adminPage",
    name: "adminPage",
    component: Layout,
    children: [
      {
        path: "page1",
        name: "page1",
        component: () => import("@/views/userpower1/1-1")
      },
      {
        path: "page2",
        name: "page2",
        component: () => import("@/views/userpower1/1-2")
      }
    ]
  }
];

export const asyncRouterMap = [

];

//错误页路由
export const errorRouterMap = [
  {
    path: "/:w+",
    name: "error-404",
    meta: {
      title: "404-页面不存在"
    },
    component: () => import("@/views/error-page/404")
  },
  {
    path: "/403",
    name: "error-403",
    meta: {
      title: "403-权限不足"
    },
    component: () => import("@/views/error-page/403")
  },
  {
    path: "/500",
    name: "error-500",
    meta: {
      title: "500-服务端错误"
    },
    component: () => import("@/views/error-page/500")
  }
];

// //实例化vue的时候只挂载commontRouterMap
// const createRouter = () =>
//   new Router({
//     // mode: 'history', // require service support
//     scrollBehavior: () => ({
//       y: 0
//     }),
//     routes: [...commontRouterMap] //初始化先注入公共页面路由
//   });
// const router = createRouter();

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...commontRouterMap]
})

//重置路由
export function resetRouter() {
  const newRouter = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: []
  });
  console.log('newRouter.matcher', router, newRouter.match);
  //router.matcher = newRouter.matcher; // reset router
}



// Router.addRoute({
//   path: "/403",
//   name: "error-403",
//   meta: {
//     title: "403-权限不足"
//   },
//   component: () => import("@/views/error-page/403")
// });

export default router; 
