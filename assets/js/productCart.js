const btnBuy = document.querySelector("#btnBuy");
const btnPurchased = document.querySelector(".btnPurchased");
const productCart = getdata("keyLocalStorageItemCart");

btnBuy.addEventListener("click", () => {
  document.getElementById("form-user").style.display = "block";
});

function totalMoney() {
  return productCart.reduce((total, item) => {
    total = total + item.price * item.amount;
    return total;
  }, 0);
}
function renderProductCart() {
  const productCart = getdata("keyLocalStorageItemCart");
  let html = ` <div class="cart-product cart-title">
                <p>Ảnh Sản Phẩm</p>
                <p>Tên sản phẩm</p>
                <p>Giá tiền</p>
                <p>Số Lượng</p>
                <p>Thành tiền</p>
                <p>Thao tác</p>
              </div>`;
  let sum = 0,
    tatol = 0;
  if (productCart.length > 0) {
    productCart.map((index, id) => {
      html += `<div class="cart-product" id="${id}">
                <img class="image-product" src="${index.image}" alt="" />
                <p class="name-product">${index.name}</p>
                <p class="price-product">${index.price}</p>
                <div class="amount-product">
                    <i id="reduce" class="bx bx-minus" onclick="changeProduct(${id},false)"></i>
                    <input type="text" name="amountValue" id="amountValue" value="${
                      index.amount
                    }"/>
                    <i id="increasing" class="bx bx-plus-medical" onclick="changeProduct(${id},true)"></i>
                </div>
                <p class="taltol-monney">${
                  Number(index.price) * Number(index.amount)
                }</p>
                <i class="bx bx-trash" onclick="deleteProduct(${id})"></i>
            </div>`;
      tatol += index.amount;
    });
  } else {
    html = `<img src="./assets/image/empty-cart.webp" alt="">`;
    document.querySelector(".summary").style.display = "none";
  }
  document.getElementById("list-products").innerHTML = html;
  sum = totalMoney();

  document.getElementById(
    "sumProduct"
  ).innerHTML = ` Tổng số lượng sản phẩm: ${tatol} <br> Tổng tiền: ${sum} `;
}
function changeProduct(index, check) {
  let arr = [...productCart];
  let listProduct = getdata("keyLocalStorageListSP");
  if (check === true) {
    listProduct.map((value) => {
      if (value.id == arr[index].id) {
        if (arr[index].amount < value.amount) {
          arr[index].amount = Number(arr[index].amount) + 1;
          setdata("keyLocalStorageItemCart", arr);
          renderProductCart();
        } else {
          alert("mon an dat gioi han");
        }
      }
    });
  } else {
    if (arr[index].amount <= 1) {
      deleteProduct(index);
      renderProductCart();
    } else {
      arr[index].amount = Number(arr[index].amount) - 1;
      setdata("keyLocalStorageItemCart", arr);
      renderProductCart();
    }
  }
}

function deleteProduct(index) {
  let result = confirm("Do you want to delete?");

  if (result) {
    productCart.splice(index, 1);
    setdata("keyLocalStorageItemCart", productCart);
    renderProductCart();
    alert("Delete successful");
  } else {
    return;
  }
}
function deleteProductCart() {
  localStorage.removeItem("keyLocalStorageItemCart");
}
function closeForm() {
  document.getElementById("form-user").style.display = "none";
}
window.addEventListener("onload", renderProductCart());
