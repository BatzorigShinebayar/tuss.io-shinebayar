import Vue from 'vue';
import store from '@/store';
import axios from 'axios';

Vue.filter('get_employee_info', function (value) {
  if (!value) return '';
  let retval = value;
  for (const emp of store.getters.company.employees) {
    if (emp.partner__id === value) {
      retval = emp.partner__name + ' ' + emp.partner__last_name;
    }
  }
  return retval;
});

Vue.filter('get_employee_pict', function (value) {
  if (!value) return '';
  let retval = value;
  for (const emp of store.getters.company.employees) {
    if (emp.partner__id === value) {
      retval = emp.partner__picture;
    }
  }
  return retval;
});

Vue.filter('get_department_full_name', function (value) {
  if (!value) return '';
  let retval = value;
  for (const dep of store.getters.company.department) {
    if (dep.id === value) {
      retval = dep.short_name + ' - ' + dep.name;
    }
  }
  return retval;
});

Vue.filter('get_department_short_name', function (value) {
  if (!value) return '';
  let retval = value;
  for (const dep of store.getters.company.department) {
    if (dep.id === value) {
      retval = dep.short_name;
    }
  }
  return retval;
});

Vue.filter('get_department_name', function (value) {
  if (!value) return '';
  let retval = value;
  for (const dep of store.getters.company.department) {
    if (dep.id === value) {
      retval = dep.name;
    }
  }
  return retval;
});

Vue.filter('get_algorithm_full_name', function (value) {
  if (!value) return '';
  let retval = value;
  for (const algorithm of store.getters.company.algorithm) {
    if (algorithm.id === value) {
      retval = algorithm.code + ' - ' + algorithm.name;
    }
  }
  return retval;
});

Vue.filter('get_algorithm_code', function (value) {
  if (!value) return '';
  let retval = value;
  for (const algorithm of store.getters.company.algorithm) {
    if (algorithm.id === value) {
      retval = algorithm.code;
    }
  }
  return retval;
});

Vue.filter('get_algorithm_name', function (value) {
  if (!value) return '';
  let retval = value;
  for (const algorithm of store.getters.company.algorithm) {
    if (algorithm.id === value) {
      retval = algorithm.name;
    }
  }
  return retval;
});

Vue.filter('get_algorithm_stage_groups', function (value) {
  if (!value) return '';
  let retval = value;
  for (const algorithm of store.getters.company.algorithm) {
    if (algorithm.id === value) {
      retval = algorithm.stage_groups;
    }
  }
  return retval;
});

Vue.filter('get_function_full_name', function (value) {
  if (!value) return '';
  let retval = value;
  for (const org_function of store.getters.company.function) {
    if (org_function.id === value) {
      retval = org_function.code + ' - ' + org_function.name;
    }
  }
  return retval;
});

Vue.filter('get_function_code', function (value) {
  if (!value) return '';
  let retval = value;
  for (const org_function of store.getters.company.function) {
    if (org_function.id === value) {
      retval = org_function.code;
    }
  }
  return retval;
});

Vue.filter('get_function_name', function (value) {
  if (!value) return '';
  let retval = value;
  for (const org_function of store.getters.company.function) {
    if (org_function.id === value) {
      retval = org_function.name;
    }
  }
  return retval;
});

Vue.filter('get_key_info_category', function (value) {
  if (!value) return '';
  let retval = value;
  for (const key_info_category of store.getters.company.key_info_categories) {
    if (key_info_category.id === value) {
      retval = key_info_category.name;
    }
  }
  return retval;
});
Vue.filter('get_key_info_category_code', function (value) {
  if (!value) return '';
  let retval = value;
  for (const key_info_category of store.getters.company.key_info_categories) {
    if (key_info_category.id === value) {
      retval = key_info_category.code;
    }
  }
  return retval;
});

Vue.filter('get_diagnosis_template', function (value) {
  if (!value) return '';
  let retval = value;
  for (const diagnosis_template of store.getters.company.diagnosis_templates) {
    if (diagnosis_template.id === value) {
      retval = diagnosis_template.name;
    }
  }
  return retval;
});

Vue.filter('get_task_type_full_name', function (value) {
  if (!value) return '';
  let retval = value;
  for (const task_type of store.getters.company.task_type) {
    if (task_type.id === value) {
      retval = task_type.code + ' - ' + task_type.name;
    }
  }
  return retval;
});

Vue.filter('get_task_type_name', function (value) {
  if (!value) return '';
  let retval = value;
  for (const task_type of store.getters.company.task_type) {
    if (task_type.id === value) {
      retval = task_type.name;
    }
  }
  return retval;
});

Vue.filter('get_task_type_code', function (value) {
  if (!value) return '';
  let retval = value;
  for (const task_type of store.getters.company.task_type) {
    if (task_type.id === value) {
      retval = task_type.code;
    }
  }
  return retval;
});

Vue.filter('get_regulation_full_name', function (value) {
  if (!value) return '';
  let retval = value;
  for (const regulation of store.getters.company.regulations) {
    if (regulation.id === value) {
      retval = regulation.short_name + ' - ' + regulation.name;
    }
  }
  return retval;
});

Vue.filter('get_regulation_short_name', function (value) {
  if (!value) return '';
  let retval = value;
  for (const regulation of store.getters.company.regulations) {
    if (regulation.id === value) {
      retval = regulation.short_name;
    }
  }
  return retval;
});

Vue.filter('get_regulation_name', function (value) {
  if (!value) return '';
  let retval = value;
  for (const regulation of store.getters.company.regulations) {
    if (regulation.id === value) {
      retval = regulation.name;
    }
  }
  return retval;
});

Vue.filter('date', function (value) {
  if (!value) return '';
  let retval = new Date(value).toISOString().slice(0, 10).replaceAll('/', '-');
  return retval;
});

Vue.filter('datetime', function (value) {
  if (!value) return '';
  const tmp_date = new Date(value);
  let month = tmp_date.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  let date = tmp_date.getDate();
  if (date < 10) {
    date = '0' + date;
  }
  let hour = tmp_date.getHours();

  if (hour < 10) {
    hour = '0' + hour;
  }
  let min = tmp_date.getMinutes();
  if (min < 10) {
    min = '0' + min;
  }
  let sec = tmp_date.getSeconds();
  if (sec < 10) {
    sec = '0' + sec;
  }
  const str_date =
    tmp_date.getFullYear() +
    '-' +
    month +
    '-' +
    date +
    ' ' +
    hour +
    ':' +
    min +
    ':' +
    sec;
  return str_date;
});

Vue.filter('get_duty_full_info', (value) => {
  if (!value) return '';
  let retval = value;
  const get_duty_url = `/api/duty/${value}/`;

  axios
    .get(get_duty_url)
    .then((response) => {
      retval =
        response.data.regulation.short_name +
        ' - ' +
        response.data.code +
        ' - ' +
        response.data.name;
      console.log('1 ***************************************');
      console.log('1 get_duty_full_info');
      console.log(retval);
      console.log('1 ***************************************');
    })
    .catch(() => {
      document.location.history.back();
    });
  console.log('2 ***************************************');
  console.log('2 get_duty_full_info');
  console.log(retval);
  console.log('2 ***************************************');
  return retval;
});

Vue.filter('get_duty_type_code', function (value) {
  if (!value) return '';
  let retval = value;
  for (const key_info_category of store.getters.company.duty_type) {
    if (key_info_category.id === value) {
      retval = key_info_category.code;
    }
  }
  return retval;
});

Vue.filter('get_duty_type_name', function (value) {
  if (!value) return '';
  let retval = value;
  for (const key_info_category of store.getters.company.duty_type) {
    if (key_info_category.id === value) {
      retval = key_info_category.name;
    }
  }
  return retval;
});

Vue.filter('get_weekday', function (value) {
  if (!value) return '';
  let retval = value;

  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  let dated_value = new Date(value)
  retval = weekday[dated_value.getDay()];

  return retval;
});

Vue.filter('splite_date', function (value) {
  if (!value) return '';
  const tmp_date = new Date(value);

  let hour = tmp_date.getHours();
  if (hour < 10) {
    hour = '0' + hour;
  }

  let min = tmp_date.getMinutes();
  if (min < 10) {
    min = '0' + min;
  }

  let sec = tmp_date.getSeconds();
  if (sec < 10) {
    sec = '0' + sec;
  }

  const str_date =
    hour +
    ':' +
    min +
    ':' +
    sec;
  return str_date;
});

// eslint-disable-next-line
function formatDate(date) {
  return (
    date.getFullYear() +
    '/' +
    (date.getMonth() + 1) +
    '/' +
    date.getDate() +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes()
  );
}
