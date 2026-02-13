const products = [
    { id: 1, name: "Jacket", price: 1999, image: "images/jacket.png" },
    { id: 2, name: "T-Shirt", price: 799, image: "images/tshirt.png" },
    { id: 3, name: "Jeans", price: 1499, image: "images/jeans.png" },
    { id: 4, name: "Sneakers", price: 2499, image: "images/sneakers.png" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* Show SPA Sections */
function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active-section");
    });

    document.getElementById(sectionId).classList.add("active-section");
}

/* Display Products */
function displayProducts() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach(product => {
        productList.innerHTML += `
            <div class="col-md-3 mb-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" height="250">
                    <div class="card-body text-center">
                        <h5>${product.name}</h5>
                        <p class="price">₹${product.price}</p>
                        <button class="btn btn-dark" onclick="addToCart(${product.id})">
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
        const product = products.find(product => product.id === id);
        cart.push({ ...product, quantity: 1 });
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
                        <button class="btn btn-sm btn-success" onclick="changeQty(${item.id}, 1)">+</button>
                        <button class="btn btn-sm btn-danger" onclick="changeQty(${item.id}, -1)">-</button>
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

/* Initialize */
displayProducts();
updateCart();
