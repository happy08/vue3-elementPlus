import mockTest from "@/api/test/mock";
// import {
//   resetRouter
// } from "@/router";

// import cookie from "@/utils/cookie.js";
// import cookie from "js-cookie";
import GLOBAL from "@/utils/constVal";

let app = GLOBAL.APP_NAME;
let userName = app + "userName";
const user = {
  state: {
    token: localStorage.getItem(app), //获取token
    rolename: "", //用户角色名称
    username: localStorage.getItem(userName), //用户昵称
    avatar: "", //用户头像
    roles: "" //用户角色类型
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_ROLENAME: (state, rolename) => {
      state.rolename = rolename;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_USERNAME: (state, username) => {
      state.username = username;
    }
  },
  getters: {
    gettoken: state => state.token,
    getroles: state => state.roles,
    getavatar: state => state.avatar,
    rolename: state => state.rolename,
    username: state => state.username
  },
  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        mockTest.login(username, userInfo.password).then(response => {
          console.log('response', response)
          if (response.state === 200) {
            // localStorage.setItem(app, response.result, 60); //60为 1分钟
            localStorage.setItem(userName, username);
            localStorage.setItem(app, response.result);
            commit("SET_USERNAME", username);
            commit("SET_TOKEN", response.result);
            resolve(response);
          } else {
            reject(response);
          }
        });
      });
    },
    // // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        mockTest.getInfo(state.token).then(response => {
          if (response) {
            const data = response.result;
            commit("SET_ROLES", data.roles);
            commit("SET_ROLENAME", data.rolename);
            commit("SET_AVATAR", data.avatar);
            resolve(response);
          } else {
            reject(response);
          }
        });
      });
    },
    //退出登录
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        mockTest
          .logout(state.token)
          .then(() => {
            commit("SET_TOKEN", "");
            commit("SET_USERNAME", "");
            commit("SET_ROLES", "");
            commit("SET_USERNAME", "");
            commit("removeAllTab");
            commit("CLEAR_ADDROUTERS", []); //清除动态注入的路由
            localStorage.removeItem(app);
            localStorage.removeItem(userName);
            //resetRouter();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // remove token
    resetToken({
      commit
    }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        commit("SET_ROLES", "");
        localStorage.removeItem(app);
        resolve();
      });
    }
  }
};
export default user;
