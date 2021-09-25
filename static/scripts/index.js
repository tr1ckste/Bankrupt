let MY_LOGIN = null;

const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
};

const getData = async url => {
  let result;
  fetch(url)
    .then((response) => {
    return response.json();
    })
    .then((data) => {
      result = data;
    });
  return result;
};
