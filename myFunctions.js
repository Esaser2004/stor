let shoppingCart = [];

function calculateTotalPrice() {
    let total = 0;
    for (let i = 0; i < shoppingCart.length; i++) {
        total += shoppingCart[i].price * shoppingCart[i].quantity;
    }
    return total;
}

function addToCart(product) {
    const existingProductIndex = shoppingCart.findIndex(item => item.name === product.name);

    if (existingProductIndex !== -1) {
        shoppingCart[existingProductIndex].quantity += 1;
    } else {
        shoppingCart.push(product);
    }

    updateCartCount();
    updateCartDisplay(); 99
}

function removeFromCart(index) {
    shoppingCart.splice(index, 1);
    updateCartDisplay();
    updateCartCount();
}

function updateCartDisplay() {
    const cartContainer = document.getElementById('shopping-cart');
    let cartHTML = '<h3>Shopping Cart</h3>';

    if (shoppingCart.length === 0) {
        cartHTML += '<p>Your cart is empty.</p>';
    } else {
        for (let i = 0; i < shoppingCart.length; i++) {
            const item = shoppingCart[i];
            cartHTML += `
            <div class="cart-item">
                <span>${item.name} - ${item.price}</span>
                <div class="cart-buttons">
                    <button onclick="decrementQuantity(${i})">-</button>
                    <input class="quantity-input" type="text" value="${item.quantity}" disabled>
                    <button onclick="incrementQuantity(${i})">+</button>
                    <button onclick="removeFromCart(${i})">Remove</button>
                </div>
            </div>
        `;
        }

        const totalPrice = calculateTotalPrice();
        cartHTML += `<p id="total-price">Total Price: ${totalPrice}</p>`;
    }

    cartHTML += '<button onclick="cancelCart()">Cancel</button>';
    cartHTML += '<button onclick="showBuyForm()">Continue</button>';

    cartContainer.innerHTML = cartHTML;
}

function cancelCart() {
    shoppingCart = [];
    updateCartCount();
    updateCartDisplay();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = shoppingCart.reduce((total, item) => total + item.quantity, 0);
}

function showBuyForm() {
    console.log('Show Buy Form button clicked');
    
    const buyForm = document.getElementById('buy-form');
    
    buyForm.style.display = 'block';
}
function hideBuyForm() {
    console.log('Hide Buy Form button clicked');
    
    const buyForm = document.getElementById('buy-form');
    
    buyForm.style.display = 'none';
}
function buy() {
    const totalPrice = calculateTotalPrice();
    const confirmationMessage = `Total Price: $${totalPrice}\n\nAdditional Information: Add any relevant information here.`;

    const userConfirmed = window.confirm(confirmationMessage);

    if (userConfirmed) {
      
        console.log('Purchase completed!');
        shoppingCart = [];
        updateCartCount();
        updateCartDisplay();
        hideBuyForm();
    } else {
      
        console.log('Purchase canceled.');
    }
}
