let rawCart = JSON.parse(localStorage.getItem("cart")) || [];

let cart = rawCart.map(item => {
    if (typeof item === "number") {
        return { id: item, qty: 1 };
    }
    return item;
});
localStorage.setItem("cart", JSON.stringify(cart));

$.getJSON("data/products.json", function (products) {
    if (cart.length === 0) {
        $("#emptyMessage").removeClass("d-none");
        $(".place-order").attr("disabled", true).css("cursor", "not-allowed");
        return;
    }

    let total = 0;
    let itemCount = 0;
    let html = "";

    cart.forEach(item => {
        const product = products.find(p => p.id == item.id);
        if (product) {
            const subtotal = product.price * item.qty;
            total += subtotal;
            itemCount += item.qty;

            html += `
        <div class="d-flex align-items-center mb-3">
          <img src="${product.image}" class="product-img me-3" alt="${product.name}">
          <div>
            <strong>$${product.price.toFixed(2)}</strong><br>
            <small>${product.name}</small><br>
            <small>Qty: ${item.qty}</small><br>
            <small>Subtotal: $${subtotal.toFixed(2)}</small>
          </div>
        </div>
      `;
        }
    });

    $("#cartItems").html(html);
    $("#itemCount").text(itemCount);

    let summaryHtml = `
    <div class="d-flex justify-content-between">
      <span>Subtotal</span>
      <span>$${total.toFixed(2)}</span>
    </div>
    <div class="d-flex justify-content-between fw-bold mt-2">
      <span>TOTAL TO PAY</span>
      <span>$${total.toFixed(2)}</span>
    </div>
  `;

    $("#summaryTotal").html(summaryHtml);
});

// Enable "PLACE ORDER" only if email is added
$("input[type=email]").on("input", function () {
    const email = $(this).val().trim();
    if (email && cart.length > 0) {
        $(".place-order").removeAttr("disabled").css("cursor", "pointer");
    } else {
        $(".place-order").attr("disabled", true).css("cursor", "not-allowed");
    }
});




// Fetch current user from localStorage
let currentUser = localStorage.getItem("loggedInUser") || "";
$("#fullName").val(currentUser); // autofill

// When Place Order button clicked
$(".place-order").on("click", function () {

    const name = $("#fullName").val().trim();
    const phone = $("#phone").val().trim();
    const city = $("#city").val().trim();
    const email = $("#email").val().trim();

    // Clear previous error messages
    $("#nameError, #phoneError, #cityError, #emailError").text("");

    // Regex Patterns
    const namePattern = /^[a-zA-Z\s]{3,}$/;
    const phonePattern = /^\d{10}$/;
    const cityPattern = /^[a-zA-Z\s]{3,}$/;
    const emailPattern = /^[a-z0-9]+@+[a-z]+\.+[a-z]{2,3}$/;

    if (!namePattern.test(name)) {
        $("#nameError").text("Please enter a valid name (min 3 letters).");
        return
    }

    if (!phonePattern.test(phone)) {
        $("#phoneError").text("Please enter a valid 10-digit phone number.");
        return
    }

    if (!cityPattern.test(city)) {
        $("#cityError").text("Enter a valid city name.");
        return
    }

    if (!emailPattern.test(email)) {
        $("#emailError").text("Enter a valid email address.");
        return
    }

    



    const userInfo = { name, phone, city, email };
    const paymentMethod = "Cash on Delivery";

    // Load cart & product data
    const rawCart = JSON.parse(localStorage.getItem("cart")) || [];

    $.getJSON("data/products.json", function (products) {
        let cart = rawCart.map(item =>
            typeof item === "number" ? { id: item, qty: 1 } : item
        );

        let total = 0;
        let itemsHtml = "";

        cart.forEach(item => {
            const product = products.find(p => p.id == item.id);
            if (product) {
                const sub = product.price * item.qty;
                total += sub;

                itemsHtml += `
          <tr>
            <td>${product.name}</td>
            <td>${item.qty}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>$${sub.toFixed(2)}</td>
          </tr>
        `;
            }
        });

        const billHTML = `
      <h6><strong>Customer Info</strong></h6>
      <p>Name: ${userInfo.name}<br>
         Email: ${userInfo.email}<br>
         Phone: ${userInfo.phone}<br>
         Address: ${userInfo.city}</p>
      <hr>

      <h6><strong>Items</strong></h6>
      <table class="table table-bordered">
        <thead><tr><th>Product</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr></thead>
        <tbody>${itemsHtml}</tbody>
      </table>

      <div class="d-flex justify-content-between">
        <strong>Total:</strong> <strong>$${total.toFixed(2)}</strong>
      </div>
      <div class="mt-2">
        <strong>Payment:</strong> ${paymentMethod}
      </div>
    `;

        $("#billContent").html(billHTML);
        const billModal = new bootstrap.Modal(document.getElementById("billModal"));
        billModal.show();
    });


});


const confettiCanvas = document.getElementById('confetti-canvas');
            const myConfetti = confetti.create(confettiCanvas, {
                resize: true,
                useWorker: true,
            });

$("#confirmOrderBtn").on("click", function () {
    // Clear cart from localStorage
    localStorage.removeItem("cart");
  
    // Redirect to product page
    window.location.href = "products.html";
});
