import { fetch } from '@/plugins/api/index';export default {  getJsonData(url, params) {    return fetch(url, params);  },  fetchOptionsData(url, labelField, valueField, params) {    const promise = fetch(url, params).then((data) => {      if (data && data.length > 0) {        const options = [];        data.forEach((ele) => {          const obj = {};          obj.optionLabel = ele[labelField];          obj.optionValue = ele[valueField];          obj.disabled = ele.disabled;          options.push(obj);        });        return options;      }    });    return promise;  },};