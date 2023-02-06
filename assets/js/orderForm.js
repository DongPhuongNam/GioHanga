let e_province = document.getElementById("province");
let in_province = e_province.options[e_province.selectedIndex].text;
let e_district = document.getElementById("district");
let in_district = e_district.options[e_district.selectedIndex].text;
let e_town = document.getElementById("town");
let in_town = e_town.options[e_town.selectedIndex].text;
const btnClose = document.querySelector(".btnClose");

const listArr = getdata("keyLocalStorageItemCart");
function start() {
  getProvince(renderProvice);
  getDistrict(renderDistrict);
  getTown(renderTown);
}
start();
//////////////
function getProvince(callback) {
  let postApi = "https://provinces.open-api.vn/api/p/";
  fetch(postApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function getDistrict(callback) {
  let province_value = document.getElementById("province");
  let postApi2 = `https://provinces.open-api.vn/api/p/${
    Number(province_value.value) || 1
  }/?depth=2`;

  fetch(postApi2)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function getTown(callback) {
  let district_value = document.getElementById("district");
  let postApi3 = `https://provinces.open-api.vn/api/d/${
    Number(district_value.value) || 1
  }/?depth=2`;

  fetch(postApi3)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function renderProvice(location) {
  let province = document.getElementById("province");
  let htmls = location.map(function (index) {
    return `<option value="${index.code}">${index.name}</option>`;
  });
  province.innerHTML = htmls.join("");
}
function renderDistrict(location) {
  const district = document.getElementById("district");
  let htmls = location.districts.map(function (course) {
    return ` <option value="${course.code}" >${course.name}</option>`;
  });
  district.innerHTML = htmls.join("");
}
function renderTown(location) {
  const town = document.getElementById("town");
  let html = location.wards.map(function (index) {
    return ` <option value="${index.code}" >${index.name}</option>`;
  });
  town.innerHTML = html.join("");
}
///////////////
function provinceChange(e) {
  const province = document.getElementById("province");
  document.getElementById("district").disabled = false;
  province.value = e;
  getDistrict(renderDistrict);
}
function districtChange(e) {
  const district = document.getElementById("district");
  document.getElementById("town").disabled = false;
  district.value = e;
  getTown(renderTown);
}
function dateTime() {
  let curDate = new Date();
  let date =
    curDate.getDate() + "/" + curDate.getMonth() + "/" + curDate.getFullYear();
  return date;
}
function randomId() {
  let id = Math.floor(Math.random() * 99) + 1;
  let check = listArr.find((index) => index.id == id);
  if (check) {
    randomId();
  } else {
    return id;
  }
}

function addOrder() {
  let in_firstName = document.getElementById("firstName").value;
  let in_lastName = document.getElementById("lastName").value;
  let in_email = document.getElementById("email").value;
  let in_phone = document.getElementById("phone").value;
  let in_address = document.getElementById("address").value;
  let in_Message = document.getElementById("message").value;
  let e_province = callElementId("province");
  let in_province = e_province.options[e_province.selectedIndex].text;
  let e_district = callElementId("district");
  let in_district = e_district.options[e_district.selectedIndex].text;
  let e_town = callElementId("town");
  let in_town = e_town.options[e_town.selectedIndex].text;
  console.log(validate());
  if (validate()) {
    let objData = {
      id: randomId(),
      date: dateTime(),
      user: {
        name: {
          firstName: in_firstName,
          lastName: in_lastName,
        },
        email: in_email,
        phone: in_phone,
        address: {
          specific: in_address,
          town: in_town,
          district: in_district,
          province: in_province,
        },
        message: in_Message,
      },
      products: listArr,
      totalMoney: totalMoney(),
    };
    return objData;
  } else {
    return;
  }
}

async function changeValueProduct(data) {
  let listProduct = await getdata("keyLocalStorageListSP");
  for (let i = 0; i < listProduct.length; i++) {
    for (let j = 0; j < data.products.length; j++) {
      if (listProduct[i].id == data.products[j].id) {
        listProduct[i].amount =
          +listProduct[i].amount - +data.products[j].amount;
      }
    }
  }
  setdata("keyLocalStorageListSP", listProduct);
  getdata("keyLocalStorageListSP");
}

async function postOrder() {
  try {
    let data = await addOrder();
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    changeValueProduct(data);
    await fetch(url, options);
    await localStorage.removeItem("keyLocalStorageItemCart");
    resetForm();
    renderProductCart();
    document.getElementById("form-user").style.display = "none";
  } catch (error) {
    console.log(error);
  }
}
