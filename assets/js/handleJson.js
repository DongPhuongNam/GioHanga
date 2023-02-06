async function getdataJSon() {
  try {
    const data = await getList(url);
    await renderOrder(data);
  } catch (error) {
    console.log(error);
  }
}
getdataJSon();
async function renderOrder(data) {
  let htmls = ``;

  data.map(function (index, i) {
    htmls += `<div class="cart-product">
            <span>${index.date}</span>
            <div class="customer-information">
              <span>${index.user?.name.firstName} ${index.user?.name.lastName}</span><br />
              <span>${index.user?.phone}</span><br />
              <span>${index.user?.address?.specific} - ${index.user?.address?.town} - ${index.user?.address?.district} - ${index.user?.address?.province}</span>
            </div>
            
            <div class="list-product">
              <span>${index.products.length}</span>
              <i class="bx bxs-chevron-down" onclick="clickProduct('${i}')">
              
              </i>     
            </div>
              <span>${index.totalMoney}</span>
              <span>Đã hoàn thành</span>
              <div class="manipulation">
                <i class="bx bx-trash" onclick="deleteOrder(${index.id})"></i>
              </div>
          </div>`;
    return htmls;
  });
  document.getElementById("list-products").innerHTML = htmls;
}
async function clickProduct(index) {
  const data = await getList(url);
  const products_Order = document.querySelector(".box-product");
  let html = `${data[index].products.map((value) => {
    return `
                  <div class="cart-product" >
                      <img class="image-product" src="${value.image}" alt="" />
                      <p class="name-product">${value.name}</p>
                      <p class="price-product">${value.price}</p>
                      <span class="amount">${value.amount}</span>
                      <p class="taltol-monney">${
                        Number(value.price) * Number(value.amount)
                      }</p>
                  </div>`;
  })}`;
  products_Order.classList.toggle("open");

  products_Order.addEventListener("click", () =>
    products_Order.classList.remove("open")
  );
  document.querySelector(".order-details").innerHTML = html;
}

async function UpdateValueAmount(id) {
  let listProduct = await getdata("keyLocalStorageListSP");
  const data = await getList(url);
  for (let i = 0; i < data.length; i++) {
    if ((data[i].id = id)) {
      for (let j = 0; j < listProduct.length; j++) {
        console.log(data[i].products);
        console.log(listProduct[j].id);
        for (let x = 0; x < data[i].products.length; x++) {
          console.log(data[i].products[x].id);
          if (listProduct[j].id == data[i].products[x].id) {
            console.log("object");
            listProduct[j].amount =
              +listProduct[j].amount + +data[i].products[x].amount;
          }
        }
      }
    }
  }

  setdata("keyLocalStorageListSP", listProduct);
  getdata("keyLocalStorageListSP");
}

async function deleteOrder(id) {
  try {
    let options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    await UpdateValueAmount(id);
    await fetch(url + "/" + id, options);
    await getdataJSon();
  } catch (error) {
    console.log(error);
  }
}
