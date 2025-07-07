// Get the product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// Fetch the product data
$.getJSON("data/products.json", function (products) {
    const product = products.find(p => p.id == productId);

    if (!product) {
        $("#productDetail").html("<div class='alert alert-danger'>Product not found.</div>");
        return;
    }

    const html = `
                    <div class="row">
                        <div class="col-md-6">
                            <img src="${product.image}" class="img-fluid rounded" alt="${product.name}">
                            </div>
                                <div class="col-md-6">
                                    <h2>${product.name}</h2>
                                    <p class="fs-4 text-success">$${product.price}</p>
                                    <p class="text-muted">Category: ${product.category}</p>
                                    <p class="mt-3">${product.description}</p>
                                <div class="d-flex gap-3 mt-4">
                                <button class="btn btn-outline-dark " onclick="addToCart(${product.id})">Add to Cart</button>
                                <button class="btn btn-secondary" onclick="addToWishlist(${product.id})">Add to Wishlist</button>
                            </div>
                        </div>
                    </div>
                    `;


    $("#productDetail").html(html);
});

// Add to Cart
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.includes(id)) cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    // showMessage("Product added to cart!");

    location.reload()

    // updateCartBadge();
}

// Add to Wishlist
function addToWishlist(id) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!wishlist.includes(id)) wishlist.push(id);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    // showMessage("Product added to wishlist!");
    location.reload()
    // console.log("Wishlist:", localStorage.getItem("wishlist"));
    // updateWishlistBadge();

}








