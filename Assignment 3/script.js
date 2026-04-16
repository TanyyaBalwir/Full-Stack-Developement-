let products = []; // 🔥 now comes from backend
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* Show SPA Sections */
function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active-section");
    });

    document.getElementById(sectionId).classList.add("active-section");
}

/* 🔥 Fetch Products from Backend */
function fetchProducts() {
    fetch("http://localhost:5000/api/products")
        .then(res => res.json())
        .then(data => {
            products = data; // store backend products
            displayProducts();
        })
        .catch(err => console.log(err));
}

/* Display Products */
function displayProducts() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach(product => {
        productList.innerHTML += `
            <div class="col-md-3 mb-4">
                <div class="card">
                    <img src="http://localhost:5000/uploads/${product.image}" class="card-img-top" height="250">
                    <div class="card-body text-center">
                        <h5>${product.title}</h5>
                        <p class="price">₹${product.price}</p>
                        <button class="btn btn-dark" onclick="addToCart('${product._id}')">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

/* Add to Cart */
function addToCart(id) {
    const item = cart.find(product => product.id === id);

    if (item) {
        item.quantity += 1;
    } else {
        const product = products.find(product => product._id === id);

        cart.push({
            id: product._id,
            name: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    updateCart();
}

/* Update Cart */
function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const totalPrice = document.getElementById("totalPrice");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        cartItems.innerHTML += `
            <div class="card mb-3 p-3">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5>${item.name}</h5>
                        ₹${item.price} × ${item.quantity}
                    </div>
                    <div>
                        <button class="btn btn-sm btn-success" onclick="changeQty('${item.id}', 1)">+</button>
                        <button class="btn btn-sm btn-danger" onclick="changeQty('${item.id}', -1)">-</button>
                    </div>
                </div>
            </div>
        `;
    });

    cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
    totalPrice.innerText = total;
}

/* Change Quantity */
function changeQty(id, change) {
    const item = cart.find(product => product.id === id);
    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== id);
    }

    updateCart();
}

/* Place Order */
function placeOrder(event) {
    event.preventDefault();
    alert("Order placed successfully! 🎉");
    cart = [];
    updateCart();
    showSection("home");
}

/* 🔥 Initialize */
fetchProducts();   // instead of displayProducts()
updateCart();