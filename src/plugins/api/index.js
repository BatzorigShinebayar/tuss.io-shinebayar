import axios from 'axios';import { reject } from 'lodash/collection';axios.interceptors.response.use(  (res) => {    if (res.status !== 200) {      return Promise.reject(res);    }    return res;  },  (error) => {    if (error.response) {      if (error.response.status === 401) {        console.error('Oops, this is a error.');        return;      }    } else {      console.log('Error', error.message);    }    return reject(error);  });// return Promiseexport function fetch(url, params) {  console.log(params);  return new Promise((resolve, reject) => {    axios      .get(url, {        headers: {          'Content-Type': 'application/json',          Authorization: this.$store.getters.token,        },      })      .then(        (response) => {          if (response) resolve(response.data);        },        (err) => {          console.log(err);        }      )      .catch((error) => {        console.log(error);        reject(error);      });  });}