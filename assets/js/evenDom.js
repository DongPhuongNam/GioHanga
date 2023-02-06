const url = "http://localhost:3000/Order";
const getList = async (url) => {
  let response = await fetch(url);
  let data = await response.json();
  return data;
};
//set get data local
function setdata(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}
function getdata(key) {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}

function callElementId(id) {
  return document.getElementById(id);
}
