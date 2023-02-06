let cartProduct = [
  {
    id: 1,
    name: "Bò cuộn phô mai",
    image: "./assets/image/bo-cuon-pho-mai.jpg",
    price: 100000,
    amount: 10,
  },
  {
    id: 2,
    name: "Gà nem chả rán",
    image: "./assets/image/image1.jpg",
    price: 120000,
    amount: 5,
  },
  {
    id: 3,
    name: "Gỏi bò Nam Định",
    image: "./assets/image/image2.jpg",
    price: 160000,
    amount: 8,
  },
  {
    id: 4,
    name: "Bò thái lát mỏng",
    image: "./assets/image/image3.jpg",
    price: 190000,
    amount: 1,
  },
  {
    id: 5,
    name: "Sườn xào chua ngọt",
    image: "./assets/image/image4.jpg",
    price: 200000,
    amount: 5,
  },
  {
    id: 6,
    name: "Cháo quẩy hải phòng",
    image: "./assets/image/image8.png",
    price: 300000,
    amount: 2,
  },
  {
    id: 7,
    name: "Cháo quẩy hải phòng",
    image: "./assets/image/image8.png",
    price: 100000,
    amount: 3,
  },
  {
    id: 8,
    name: "Cháo quẩy hải phòng",
    image: "./assets/image/image8.png",
    price: 400000,
    amount: 4,
  },
];
//setdata("keyLocalStorageListSP", cartProduct);
let listProduct = getdata("keyLocalStorageListSP");

function renderProduct() {
  let html = ``;
  listProduct.map((index) => {
    console.log(index.amount);
    if (Number(index.amount) <= 0) {
      console.log("object");
      html += `<div class="item hide"></div>`;
    } else {
      html += `  
    <div class="item">
          <img src="${index.image}" alt="" />
          <div class="name">${index.name}</div>
          <div class="stars">
            <i class='bx bxs-star' ></i>
            <i class='bx bxs-star' ></i>
            <i class='bx bxs-star' ></i>
            <i class='bx bxs-star' ></i>
            <i class='bx bxs-star' ></i>
          </div>
          <div class="price">
            <span>${index.price} VNĐ</span>
            <span>SL: ${index.amount}</span>  
          </div>
          <button class="add-cart" onclick="addCart('${index.id}','${index.name}','${index.image}','${index.price}','${index.amount}')"><i class='bx bxs-cart-add'></i></button>
        </div>`;
    }
  });

  document.getElementById("list-products").innerHTML = html;
}
function addCart(getid, getname, getimage, getprice, getamount) {
  let listArr = getdata("keyLocalStorageItemCart");
  let itrem = listArr.find((el) => el.id === getid);

  if (itrem) {
    for (let i = 0; i < listArr.length; i++) {
      if (listArr[i].id === getid) {
        if (listArr[i].amount < getamount) {
          listArr[i].amount = Number(listArr[i].amount) + 1;
        } else {
          alert("het mon an");
        }
      }
    }
  } else {
    listArr.push({
      id: getid,
      name: getname,
      image: getimage,
      price: getprice,
      amount: 1,
    });
  }

  setdata("keyLocalStorageItemCart", listArr);
}

window.addEventListener("onload", renderProduct());
