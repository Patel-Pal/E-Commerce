let products = [];

$(document).ready(function () {

    $.getJSON("data/products.json", function (data) {
        products = data;
        renderProducts("all");
    });


    // Open Sidebar
    let isSidebarOpen = false;

    $("#openFilterSidebar").on("click", function () {
        if (isSidebarOpen) {
            $("#filterSidebar").fadeOut();
            $("body").css("overflow", "auto");
        } else {
            $("#filterSidebar").fadeIn();
            $("body").css("overflow", "hidden");
        }
        isSidebarOpen = !isSidebarOpen;
    });

    // Close Sidebar
    $("#closeSidebar").on("click", function () {
        $("#filterSidebar").fadeOut();
        $("body").css("overflow", "auto"); // Restore scroll
        isSidebarOpen = false;
    });



    $("#advancedFilterForm").on("submit", function (e) {
        e.preventDefault();

        const selectedCategory = $("#filterCategory").val();
        const selectedPrice = $("#filterPrice").val();
        const keyword = $("#searchInput").val().toLowerCase();

        $("#filterSidebar").fadeOut();
        $("body").css("overflow", "auto");

        renderProducts(selectedCategory, keyword, 1, selectedPrice);
    });



    // Handle category filter
    $(".nav-link").on("click", function (e) {
        e.preventDefault();
        $(".nav-link").removeClass("active");
        $(this).addClass("active");
        const category = $(this).data("category");
        const keyword = $("#searchInput").val().toLowerCase();
        renderProducts(category, keyword);
    });

    // Handle live search
    $("#searchInput").on("input", function () {
        const keyword = $(this).val().toLowerCase();
        const category = $(".nav-link.active").data("category") || "all";
        renderProducts(category, keyword);
    });

    // Render products
    function renderProducts(category = "all", keyword = "", currentPage = 1, priceRange = "all") {

        let filtered = products;

        // Category filter
        if (category !== "all") {
            filtered = filtered.filter(p => p.category === category);
        }

        // Keyword filter
        if (keyword) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(keyword));
        }

        // Price range filter
        if (priceRange !== "all") {
            if (priceRange.includes("-")) {
                const [min, max] = priceRange.split("-").map(Number);
                filtered = filtered.filter(p => p.price >= min && p.price <= max);
            } else {
                const min = parseInt(priceRange);
                filtered = filtered.filter(p => p.price >= min);
            }
        }


        const itemsPerPage = 8;
        const totalPages = Math.ceil(filtered.length / itemsPerPage);
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = filtered.slice(start, end);

        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        let html = "";

        paginatedItems.forEach(product => {
            const isInWishlist = wishlist.includes(product.id);
            html += `
            <div class="col-6 col-md-3 mb-3 cards">
                <div class="card h-100 position-relative d-flex flex-column">
                    <span class="position-absolute top-0 end-0 m-1 " style="z-index: 1;">
                    <button class="btn wishlist-btn border-0 p-1" data-id="${product.id}">
                        <i class="bi ${isInWishlist ? 'bi-heart-fill' : 'bi-heart'} fs-5 text-danger"></i>
                    </button>
                    </span>

                    <!-- Product Image -->
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 150px; object-fit: contain;">

                    <!-- Card Body -->
                    <div class="card-body d-flex flex-column justify-content-between p-2 flex-grow-1">
                    <div>
                        <h6 class="card-title mb-1 text-truncate">${product.name}</h6>
                        <p class="card-text mb-2 small">$${product.price}</p>
                    </div>

                    <!-- Stable View Button -->
                    <a href="product-detail.html?id=${product.id}" class="btn btn-outline-dark btn-sm w-100 mt-auto">View</a>
                </div>
            </div>
            </div>


        `;
        });

        $("#productList").html(html);

        // Render pagination buttons
        let paginationHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const isActive = i === currentPage
            const activeClass = isActive ? "active" : "";
            const textColor = isActive ? "text-white" : "text-dark";
            const bgColor = isActive ? "bg-dark border-secondary" : "";
            paginationHTML += `
             <li class="page-item ${activeClass}">
                    <a class="page-link mx-1 rounded ${textColor} ${bgColor}" href="#" data-page="${i}">${i}</a>
            </li>
        `;
        }
        $("#pagination").html(paginationHTML);

        // Attach pagination click event
        $(".page-link").off("click").on("click", function (e) {
            e.preventDefault();
            const page = parseInt($(this).data("page"));
            renderProducts(category, keyword, page);
        });

        // Attach wishlist button click
        $(".wishlist-btn").off("click").on("click", function () {
            const id = parseInt($(this).data("id"));
            let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

            if (wishlist.includes(id)) {
                wishlist = wishlist.filter(item => item !== id);
            } else {
                wishlist.push(id);
            }

            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            renderProducts(category, keyword, currentPage); // Keep current page

            // console.log("Wishlist:", localStorage.getItem("wishlist"));
            // updateWishlistBadge();

            location.reload()

        });
    }




});
