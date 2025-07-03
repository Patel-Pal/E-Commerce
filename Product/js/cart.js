// let cart = JSON.parse(localStorage.getItem("cart")) || [];

//     $.getJSON("data/products.json", function(products) {
//       if (cart.length === 0) {
//         $("#emptyMessage").show();
//         return;
//       }

//       let total = 0;
//       let html = "";

//       cart.forEach(id => {
//         const product = products.find(p => p.id == id);
//         if (product) {
//           total += product.price;
//           html += `
//             <div class="col-md-3 mb-3">
//               <div class="card h-100 shadow-sm" style="font-size: 0.9rem;">
//               <span class="position-absolute top-0 end-0 m-2" onclick="removeFromCart(${product.id})" style="z-index: 1;">
//                         <button class="btn wishlist-btn" data-id="${product.id}">
//                             <i class="bi bi-x-lg"></i>
//                         </button>
//                     </span>
//                 <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 160px; object-fit: contain;">
//                 <div class="card-body py-2 px-3">
//                   <h5 class="card-title mb-1 text-truncate">${product.name}</h5>
//                   <p class="card-text mb-0">$${product.price}</p>

//                 </div>
//               </div>
//             </div>
//           `;
//         }
//       });

//       html += `
//         <div class="col-12">
//           <div class="alert alert-info text-end">
//             <strong>Total: $${total}</strong>
//           </div>
//         </div>
//       `;

//       $("#cartItems").html(html);
//     });

//     function removeFromCart(id) {
//       cart = cart.filter(item => item != id);
//       localStorage.setItem("cart", JSON.stringify(cart));
//       location.reload();
//     }






let rawCart = JSON.parse(localStorage.getItem("cart")) || [];

// Ensure all items have id + qty
let cart = rawCart.map(item => {
  if (typeof item === "number") {
    return { id: item, qty: 1 }; // convert old structure
  }
  return item;
});
localStorage.setItem("cart", JSON.stringify(cart));

$.getJSON("data/products.json", function (products) {
  if (cart.length === 0) {
    $("#emptyMessage").removeClass("d-none");
    return;
  }

  let total = 0;
  let totalItems = 0; 
  let html = "";

  cart.forEach(item => {
    const product = products.find(p => p.id == item.id);
    if (product) {
      const subtotal = product.price * item.qty;
      total += subtotal;
      totalItems += item.qty;

      html += `
        <div class="cart-card d-flex align-items-start mb-3 border rounded p-3 shadow-sm">
          <img src="${product.image}" class="product-img me-3" style="width:100px; height:120px; object-fit:contain;">
          <div class="flex-grow-1">
            <h5 class="mb-1">${product.name}</h5>
            <p class="mb-1 text-muted">Description goes here...</p>
            <p class="mb-1">Size <strong>XL</strong> / Color <strong>Maroon</strong></p>
            <p><strong>$${product.price}</strong> <span class="old-price ms-2 text-muted text-decoration-line-through">$${product.price + 10}</span></p>
            <div class="d-flex align-items-center">
              <input type="number" class="form-control mx-2 text-center" style="width: 60px;" min="1" value="${item.qty}" onchange="manualInput(${product.id}, this.value)">
              <button class="icon-btn btn btn-sm btn-link text-danger ms-3" onclick="removeFromCart(${product.id})"><i class="bi bi-trash"></i></button>

            </div>
            <p class="mb-0 mt-2">Subtotal: <strong>$${subtotal}</strong></p>
          </div>
        </div>
  `;

}
});


$("#carts").html(html);

let summery = "";

summery += `
        <div class="d-flex justify-content-between mb-2">
          <span>Total</span><strong>$${total}</strong>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span>number Item</span><strong>${totalItems}</strong>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span>Tax</span><strong>$0.00</strong>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span>Shipping</span><strong class="text-danger">Free</strong>
        </div>
         <hr>
        <div class="d-flex justify-content-between mb-3">
          <span><strong>Total</strong></span><strong>$${total}</strong>
        </div>`



$("#summery").html(summery);


  // $("#cartItems").html(html);
});

// Functions
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

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
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function manualInput(id, value) {
  const qty = parseInt(value);
  if (isNaN(qty) || qty < 1) return;

  cart = cart.map(item => {
    if (item.id === id) {
      return { ...item, qty };
    }
    return item;
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

