const header = document.querySelector("#header");
const footer = document.querySelector("#footer");

header.innerHTML = `
            <a href="" class="logo">
          <img src="./assets/image/logo.png" alt="" />
        </a>
        <div id="menu">
          <div class="item">
            <a href="./index.html">Trang chủ</a>
          </div>
          <div class="item">
            <a href="./cartProduct.html">Sản phẩm</a>
          </div>
          <div class="item">
            <a href="">Blog</a>
          </div>
          <div class="item">
            <a href="">Liên hệ</a>
          </div>
        </div>
        <div id="actions">
          <div class="item">
            <a href="./purchase.html">
              <img src="./assets/image/user.png" alt="" />
            </a>
          </div>
          <div class="item">
            <a href="./cartProduct.html">
               <img src="./assets/image/cart.png" alt="" />
            </a>
           
          </div>
        </div>
`;
footer.innerHTML = ` <h3>hello</h3>`;
