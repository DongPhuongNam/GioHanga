const form = document.querySelector("form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const province = document.getElementById("province");
const district = document.getElementById("district");
const town = document.getElementById("town");
const address = document.getElementById("address");

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
  const small = formControl.querySelector("small");
  small.innerText = "";
}

function checkEmail(input) {
  let check = false;
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    showSuccess(input);
    check = true;
  } else {
    showError(input, "Email is not valid");
    check = false;
  }
  return check;
}

function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
      isRequired = false;
    } else {
      showSuccess(input);
      isRequired = true;
    }
  });

  return isRequired;
}

function checkLength(input, min, max) {
  let check = false;
  if (input.value.length < min || input.value.length > max) {
    showError(input, `${getFieldName(input)} character error (${min}-${max})`);
    check = false;
  } else {
    showSuccess(input);
    check = true;
  }
  return check;
}
function checkPhone(input) {
  let check = false;
  const re = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
    check = true;
  } else {
    showError(input, "Phone is not valid");
    check = false;
  }
  return check;
}
function checkSelect(input) {
  let check = false;
  if (input.disabled == false) {
    showSuccess(input);
    check = true;
  } else {
    showError(input, "No address selected");
    check = false;
  }
  return check;
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
function validate() {
  let isRequired = checkRequired([firstName, lastName, email, phone, address]);

  if (
    !isRequired ||
    !checkLength(firstName, 2, 15) ||
    !checkLength(lastName, 2, 15) ||
    !checkLength(address, 2, 15) ||
    !checkEmail(email) ||
    !checkPhone(phone) ||
    !checkSelect(province) ||
    !checkSelect(district) ||
    !checkSelect(town)
  ) {
    return false;
  } else {
    return true;
  }
}
function resetForm() {
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("address").value = "";
  document.getElementById("message").value = "";
  e_province.value = 1;
  e_district.disabled = true;
  e_town.disabled = true;
}
