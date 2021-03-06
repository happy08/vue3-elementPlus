/*
 * @Author: zhanghan
 * @Date: 2020-08-26 11:29:40
 * @LastEditors: zhanghan
 * @LastEditTime: 2020-08-26 12:05:24
 * @Descripttion: 
 */
import axios from "axios";
import {
  ElMessage

} from "element-plus";

const axiosConfig = {};

axiosConfig.ajax = function () {
  //正式接口基础配置
  const service = axios.create({
    baseURL: "/api",
    timeout: 1800000
  });
  //添加请求响应拦截器
  addInterceptors(service);
  return service;
};

axiosConfig.ajaxtest = function () {
  //外网测试接口基础配置
  const service = axios.create({
    baseURL: process.env.NODE_ENV === "production" ?
      "http://rap2api.taobao.org/" : "/test",
    timeout: 1800000
  });
  //添加请求响应拦截器
  addInterceptors(service);
  return service;
};

axiosConfig.ajaxmock = function () {
  //本地mock测试接口基础配置
  const service = axios.create({
    timeout: 1800000
  });
  //添加请求响应拦截器
  addInterceptors(service);
  return service;
};

const addInterceptors = service => {
  //添加请求拦截器
  interceptorsRequest(service);
  //添加相应拦截器
  interceptorsResponse(service);
};

//添加请求拦截器
const interceptorsRequest = service => {
  service.interceptors.request.use(
    config => {
      // 在发送请求之前做些什么
      console.log("添加请求拦截器", config);
      return config;
    },
    error => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );
};
//添加响应拦截器
const interceptorsResponse = service => {
  service.interceptors.response.use(
    response => {
      // 对响应数据做点什么
      const res = response.data;
      console.log("添加响应拦截器", response);
      if (res.state !== 200) {
        //有错误提示
        ElMessage({
          type: "error",
          message: res.message,
          duration: 3 * 1000
        });
        //检测是否登录超时,301登录超时状态码
        if (res.state === 301) {
          //校测到超时，主动退出登录
          store.dispatch("LogOut");
        }
      }
      return res;
    },
    error => {
      //有错误提示
      ElMessage({
        type: "error",
        message: "服务器请求无响应！请联系后端处理。错误信息：" + error,
        duration: 3 * 1000
      });
      // 对响应错误做点什么
      return Promise.reject(error);
    }
  );
};

export default axiosConfig;
