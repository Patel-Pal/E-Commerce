
function showToast(message, type = "dark") {
    const toastEl = document.getElementById("toastMessage");
  const toastBody = document.getElementById("toastText");


  toastBody.textContent = message;
  toastEl.className = `toast align-items-center text-bg-${type} border-0`;

  const toast = new bootstrap.Toast(toastEl, { delay: 2000 });
  toast.show();
}

// ✅ Utility: Parse JSON from localStorage
function getStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// ✅ Utility: Save JSON to localStorage
function setStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}



// ✅ Add to cart (with quantity support)
function addToCart(id) {
  let cart = getStorage("cart");

  // Ensure format: [{ id, qty }]
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
    showToast("Quantity increased 🛒", "info");
  } else {
    cart.push({ id, qty: 1 });
    showToast("Added to cart ✅", "success");
  }

  setStorage("cart", cart);
  updateCartBadge();
  
}


// ✅ Add to wishlist
function addToWishlist(id) {
  let wishlist = getStorage("wishlist");
  if (!wishlist.includes(id)) {
    wishlist.push(id);
    showToast("Added to wishlist ❤️", "success");
  } else {
    showToast("Already in wishlist", "info");
  }
  setStorage("wishlist", wishlist);
  updateWishlistBadge();
  
}


// ✅ Remove from wishlist
function removeFromWishlista(id) {
  let wishlist = getStorage("wishlist").filter(item => item !== id);
  setStorage("wishlist", wishlist);
  updateWishlistBadge();
  showToast("Removed from wishlist ❌", "danger");
  // location.reload()
}


// ✅ Remove from cart
function removeFromCarta(id) {
  let cart = getStorage("cart").filter(item => item.id !== id);
  setStorage("cart", cart);
  updateCartBadge();
  showToast("Item removed from cart 🛒", "danger");
  console.log("outside "+cart)
  // location.reload()
}


// ✅ Badge Updaters
function updateCartBadge() {
  const cart = getStorage("cart");
  const total = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  const $badge = $(".cartBadge");
  $badge.text(total);
  $badge.toggle(total > 0);
}

function updateWishlistBadge() {
  const count = getStorage("wishlist").length;
  const $badge = $(".wishlistBadge");
  $badge.text(count);
  $badge.toggle(count > 0);
}





