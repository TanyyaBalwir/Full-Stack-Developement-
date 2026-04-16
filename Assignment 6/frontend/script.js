const API_BASE = "http://localhost:5001/api";
let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentUser = JSON.parse(localStorage.getItem("registeredUser")) || null;
const fallbackProducts = [
    {
        _id: "fallback-1",
        title: "T-Shirt",
        description: "Comfortable cotton t-shirt for daily wear.",
        price: 799,
        condition: "New",
        image: "tshirt.png"
    },
    {
        _id: "fallback-2",
        title: "Jeans",
        description: "Regular fit blue jeans with a simple look.",
        price: 1499,
        condition: "Good",
        image: "jeans.png"
    },
    {
        _id: "fallback-3",
        title: "Sneakers",
        description: "Stylish sneakers for college and casual use.",
        price: 1999,
        condition: "New",
        image: "sneakers.png"
    },
    {
        _id: "fallback-4",
        title: "Jacket",
        description: "Warm winter jacket with a trendy design.",
        price: 2499,
        condition: "New",
        image: "jacket.png"
    }
];

function showSection(sectionId) {
    document.querySelectorAll(".section").forEach((section) => {
        section.classList.remove("active-section");
    });

    document.getElementById(sectionId).classList.add("active-section");
}

function showMessage(targetId, text, type) {
    const target = document.getElementById(targetId);
    target.className = `alert alert-${type}`;
    target.textContent = text;

    setTimeout(() => {
        target.className = "alert d-none";
        target.textContent = "";
    }, 3000);
}

function getImagePath(product) {
    return `images/${product.image}`;
}

async function readJsonResponse(response) {
    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(
            text.startsWith("<!DOCTYPE")
                ? "Assignment 6 backend is not running on port 5001."
                : "Unexpected response from backend."
        );
    }

    return response.json();
}

function openShopForUser(user) {
    currentUser = user;
    localStorage.setItem("registeredUser", JSON.stringify(user));
    document.getElementById("registerPage").classList.add("d-none");
    document.getElementById("shopPage").classList.remove("d-none");

    const checkoutName = document.getElementById("checkoutName");
    const checkoutEmail = document.getElementById("checkoutEmail");
    checkoutName.value = user.name || "";
    checkoutEmail.value = user.email || "";
}

async function loadProducts() {
    try {
        const response = await fetch(`${API_BASE}/products`);
        const data = await readJsonResponse(response);
        if (Array.isArray(data) && data.length > 0) {
            products = data;
        } else {
            products = fallbackProducts;
        }
    } catch (error) {
        console.log(error);
        products = fallbackProducts;
    }

    displayProducts();
}

function displayProducts() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach((product) => {
        productList.innerHTML += `
            <div class="col-md-4">
                <div class="card mb-4 shadow">
                    <img src="${getImagePath(product)}" class="card-img-top" height="200" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">Rs.${product.price}</p>
                        <button class="btn btn-primary w-100" onclick="addToCart('${product._id}')">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

function addToCart(id) {
    const item = cart.find((product) => product.id === id);

    if (item) {
        item.quantity += 1;
    } else {
        const product = products.find((productItem) => productItem._id === id);
        if (!product) {
            return;
        }

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

function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const totalPrice = document.getElementById("totalPrice");

    if (!cartItems || !cartCount || !totalPrice) {
        return;
    }

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;

        cartItems.innerHTML += `
            <div class="card mb-3 p-3">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5>${item.name}</h5>
                        Rs.${item.price} x ${item.quantity}
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

function changeQty(id, change) {
    const item = cart.find((product) => product.id === id);
    if (!item) {
        return;
    }

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter((product) => product.id !== id);
    }

    updateCart();
}

async function handleUserSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
    };

    try {
        const response = await fetch(`${API_BASE}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await readJsonResponse(response);

        if (!response.ok) {
            throw new Error(data.message || "Unable to register user.");
        }

        openShopForUser({
            _id: data._id,
            name: data.name,
            email: data.email
        });
        showMessage("shopMessage", "Registration successful. You can start shopping now.", "success");
    } catch (error) {
        showMessage("statusMessage", error.message, "danger");
    }
}

async function handleCheckoutSubmit(event) {
    event.preventDefault();

    if (cart.length === 0) {
        showMessage("shopMessage", "Your cart is empty.", "warning");
        return;
    }

    const payload = {
        customerName: document.getElementById("checkoutName").value,
        customerEmail: document.getElementById("checkoutEmail").value,
        address: document.getElementById("checkoutAddress").value,
        userId: currentUser?._id || "",
        items: cart
    };

    try {
        const response = await fetch(`${API_BASE}/products/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await readJsonResponse(response);

        if (!response.ok) {
            throw new Error(data.message || "Unable to place order.");
        }

        cart = [];
        updateCart();
        document.getElementById("checkoutAddress").value = "";
        showSection("home");
        showMessage("shopMessage", "Order placed successfully and stored in MongoDB.", "success");
    } catch (error) {
        showMessage("shopMessage", error.message, "danger");
    }
}

document.getElementById("userForm").addEventListener("submit", handleUserSubmit);
document.getElementById("checkoutForm").addEventListener("submit", handleCheckoutSubmit);

if (currentUser) {
    openShopForUser(currentUser);
}

loadProducts();
updateCart();
