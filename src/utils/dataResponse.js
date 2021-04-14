export const responseSuccess = data => {
  if (typeof data == 'string') {
    data = data.replace(/[\u0080-\uFFFF]+/g, '');
    return JSON.parse(data);
  } else {
    return data;
  }
};

export const responseFailed = err => {
  let error =
    (err && err.response && err.response.data) || (err && err.message);
  console.log(error, typeof error);
  if (error == 'unexpected end of stream') {
    return 'Something went wrong';
  } else {
    error = JSON.parse(error.replace(/[\u0080-\uFFFF]+/g, ''));
    return error ? error.message : 'Something went wrong';
  }
};
