let products = [];
let cart = [];

$(document).ready(function () {
  const rawCart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = rawCart.map(item => typeof item === "number" ? { id: item, qty: 1 } : item);

  $.getJSON("data/products.json", function (data) {
    products = data;
    renderCart();
  });
});

function renderCart() {
  localStorage.setItem("cart", JSON.stringify(cart));

  if (cart.length === 0) {
    $("#carts").html("");
    $("#summery").html("");
    $("#emptyMessage").removeClass("d-none");
    return;
  }

  let total = 0;
  let totalItems = 0;
  let html = "";

  cart.forEach(item => {
    const product = products.find(p => p.id == item.id);
    if (!product) return;

    const subtotal = product.price * item.qty;
    total += subtotal;
    totalItems += item.qty;

    html += `
      <div class="cart-card d-flex align-items-start mb-3 border rounded p-2 p-md-3 shadow-sm">
        <img src="${product.image}" class="product-img me-2 me-md-3" style="width: 80px; height: 100px; object-fit: contain;" alt="${product.name}">
        <div class="flex-grow-1">
          <h5 class="mb-1 fs-6 fs-md-5">${product.name}</h5>
          <p><strong>$${product.price}</strong> <span class="old-price ms-2 text-muted text-decoration-line-through">$${product.price + 10}</span></p>
          <div class="d-flex align-items-center">
            <input type="number" class="form-control mx-1 mx-md-2 text-center" style="width: 50px; font-size: 0.9rem;" min="1" value="${item.qty}" onchange="manualInput(${product.id}, this.value)">
            <button class="icon-btn btn btn-sm btn-link text-danger ms-2" onclick="removeFromCart(${product.id})"><i class="bi bi-trash"></i></button>
          </div>
          <p class="mb-0 mt-1 mt-md-2 fs-6">Subtotal: <strong>$${subtotal.toFixed(2)}</strong></p>
        </div>
      </div>
    `;
  });

  $("#carts").html(html);

  const summary = `
    <div class="summary-box">
      <h5 class="mb-3">Order Summary</h5>
      <div class="summary-section mt-4">
        <div class="d-flex justify-content-between mb-2 fs-6 fs-md-5">
          <span>Total</span><strong>$${total.toFixed(2)}</strong>
        </div>
        <div class="d-flex justify-content-between mb-2 fs-6 fs-md-5">
          <span>Number of Items</span><strong>${totalItems}</strong>
        </div>
        <div class="d-flex justify-content-between mb-2 fs-6 fs-md-5">
          <span>Tax</span><strong>$0.00</strong>
        </div>
        <div class="d-flex justify-content-between mb-2 fs-6 fs-md-5">
          <span>Shipping</span><strong class="text-danger">Free</strong>
        </div>
        <hr class="my-2">
        <div class="d-flex justify-content-between mb-3 fs-6 fs-md-5">
          <span><strong>Total</strong></span><strong>$${total.toFixed(2)}</strong>
        </div>
      </div>
      <input class="form-check-input" type="radio" name="paymentMethod" id="codOption" value="cod" checked>
      <label class="form-check-label mb-3" for="codOption">
        Cash on Delivery (Default)
      </label>
      <a href="/Product/checkOut.html">
        <button class="btn btn-dark w-100 mb-3">Proceed to Checkout</button>
      </a>
    </div>`;

  $("#summery").html(summary);
}


function removeFromCart(id) {
  removeFromCarta(id)
 
location.reload()
 
}

// Update Quantity +/-
function updateQuantity(id, action) {
  cart = cart.map(item => {
    if (item.id === id) {
      let qty = item.qty;
      if (action === 'increase') qty++;
      else if (action === 'decrease' && qty > 1) qty--;
      return { ...item, qty };
    }
    return item;
  });
  renderCart();
}

//  Manual input
function manualInput(id, value) {
  const qty = parseInt(value);
  if (isNaN(qty) || qty < 1) return;
  cart = cart.map(item => (item.id === id ? { ...item, qty } : item));
  renderCart();
}
