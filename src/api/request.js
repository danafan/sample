import axios from './index'
// import md5 from 'js-md5';

//中间处理
export function middleWare(params,type) { 

  // for(let k in params){
  //   if(typeof(params[k])=='string' && params[k] != ""){
  //     params[k] = params[k].toString().replace(/(^\s*)|(\s*$)/g,"");
  //   }
  // }

  // var ding_user_id = !localStorage.getItem("ding_user_id")?'':localStorage.getItem("ding_user_id");
  // var login_token = !localStorage.getItem("login_token")?'':localStorage.getItem("login_token");
  // var secret_key = !localStorage.getItem("secret_key")?'':localStorage.getItem("secret_key");

  // // 生成签名
  // var sign_target = {
  //   ding_user_id:ding_user_id,
  //   login_token:login_token,
  //   secret_key:secret_key,
  //   timestamp:((new Date()).getTime()/1000).toString().split('.')[0]
  // }
  // var create_sign = {...params,...sign_target};
  // var keys = [];        // 所有键名
  // var sort_obj = {};    // 排好序的参数对象
  
  // // 键名数组
  // for(let key of Object.keys(create_sign)){ 
  //   keys.push(key);
  // }
  // // 键名排序
  // var sort_keys = keys.sort(); 
  // sort_keys.map(item => {
  //   var val = create_sign[item];
  //   sort_obj[item] = val;
  // })
  // var sign_arr = [];
  // for(let key in sort_obj){
  //   if(key != 'image' && key != 'file' && key.indexOf('remark') == -1 && key != "refuse_reason"){
  //     sign_arr.push(`${key}=${sort_obj[key]}`);
  //   }
  // }
  // //sign
  // var sign = md5(sign_arr.join('&'));

  //  //token
  //  var token_target = {
  //   login_token:login_token,
  //   secret_key:secret_key,
  //   timestamp:((new Date()).getTime()/1000).toString().split('.')[0]
  // } 
  // var Base64 = require('js-base64').Base64; 
  // var token_obj = {...token_target,...{sign:sign}};
  // var token = Base64.encode(JSON.stringify(token_obj));
  
  //组织参数
  // var req = {...params,...{userid:'16161349938228000'}};   
  var req = {...params,...{userid:'014017496357903146'}};   
  // var req = {...params,...{user_id:'15262575868677723'}};   
  // var req = {...params,...{}};   


  var get_arr = [];
  //post请求参数
  var form = new FormData();
  for(let key in req){
    form.append(key, req[key]);
    get_arr.push(`${key}=${req[key]}`);
  }
  //get请求参数
  var get_str = get_arr.join('&');
  return type == 'get'?get_str:form;
}

export default {
  post(path, params={}){
    var form = middleWare(params,'post');
    return axios.post(`${path}`, form);
  },
  get(path, params={}){
    var str = middleWare(params,'get');
    return axios.get(`${path}?${str}`);
  }
}
