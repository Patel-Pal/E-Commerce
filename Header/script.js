$(document).ready(function () {
  updateCartBadge();
  updateWishlistBadge();


//  $(".navbar-nav .nav-link").on("click", function () {
//     if ($(".navbar-toggler").is(":visible")) {
//       $("#abc").collapse("hide");
//     }
//   });

});


function updateCartBadge() {
  let rawCart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalItems = 0;

  rawCart.forEach(item => {
    if (typeof item === "number") {
      totalItems += 1;
    } else if (item.qty) {
      totalItems += item.qty;
    }
  });

  const $badge = $("#cartBadge");
  if ($badge.length) {
    $badge.text(totalItems);
    $badge.toggle(totalItems > 0); // Show or hide using jQuery
  }
}

function updateWishlistBadge() {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const count = wishlist.length;

  const $badge = $("#wishlistBadge");
  if ($badge.length) {
    $badge.text(count);
    $badge.toggle(count > 0);
  }
}
