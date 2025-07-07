    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    $.getJSON("data/products.json", function (products) {
      if (wishlist.length === 0) {
        $("#emptyWishlist").show();
        return;
      }

      let html = "";

      wishlist.forEach(id => {
        const product = products.find(p => p.id == id);
        if (product) {
          html += `
           <div class="col-md-3 mb-3">
              <div class="card h-100 shadow-sm" style="font-size: 0.9rem;">
                
                <!-- Remove Button (Top-Right) -->
                <span class="position-absolute top-0 end-0 m-2" style="z-index: 1;">
                  <button class="btn wishlist-btn p-1" onclick="removeFromWishlist(${product.id})">
                    <i class="bi bi-x-lg"></i>
                  </button>
                </span>

                <!-- Product Image -->
                <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 160px; object-fit: contain;">
                
                <!-- Card Body -->
                <div class="card-body py-2 px-3">
                  
                  <!-- Product Name -->
                  <h6 class="card-title mb-1 text-truncate">${product.name}</h6>
                  
                  <!-- Price and Cart in Same Row -->
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="card-text mb-0">$${product.price}</p>
                    <button class="btn btn-sm btn-outline-dark" onclick="moveToCart(${product.id})">
                      <i class="fas fa-shopping-cart"></i>
                    </button>
                  </div>

                </div>
              </div>
            </div>



          `;
        }
      });

      $("#wishlistItems").html(html);
    });

    function removeFromWishlist(id) {
      // wishlist = wishlist.filter(item => item != id);
      // localStorage.setItem("wishlist", JSON.stringify(wishlist));
      
      removeFromWishlista(id);
      location.reload();

      // updateWishlistBadge();
    }

    function moveToCart(id) {
      // let cart = JSON.parse(localStorage.getItem("cart")) || [];
      // if (!cart.includes(id)) cart.push(id);
      // localStorage.setItem("cart", JSON.stringify(cart));

      addToCart(id);
      removeFromWishlist(id);
      location.reload()
      // updateCartBadge();
    }