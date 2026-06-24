

function renderMenu(category) {
    const items = menu[category];
    let html = '';
    items.forEach((item, index) => {
        html += renderMenuTemplate(category, item, index);
    });
    return html;
}

function getBasketQuantity(category, index) {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const id = `${category}-${index}`;
    const item = basket.find((entry) => entry.id === id);
    return item ? item.quantity : 0;
}

function renderMenuTemplate(category, item, index) {
    const quantity = getBasketQuantity(category, index);
    const buttonLabel = quantity > 0 ? `Added ${quantity}` : 'Add produkt to basket';

    return `
            <div class="menu-item" id="menu-${category}-${index}">
                <div class="menu-item-image">
                    <img src="./assets/img/${item.image}" alt="${item.name}">
                </div>
                <div class="menu-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                </div>
                <div class="menu-item-price">
                    <span>${formatPrice(item.price)}</span>
                    <button onclick="addToBasketByIndex('${category}', ${index})">${buttonLabel}</button>
                </div>
            </div>`;
}

function renderBasketItem(item, index) {
    return `
        <div class="basket-item">
            <div class="basket-item-left">
                <div class="basket-item-label">${item.quantity} x ${item.name}</div>
                <div class="basket-item-controls">
                    <button class="basket-item-trash" onclick="removeFromBasket(${index})">🗑</button>
                    <span class="basket-item-qty">${item.quantity}</span>
                    <button class="basket-item-add" onclick="addOneToBasket('${item.id}')">+</button>
                </div>
            </div>
            <div class="basket-item-price">${formatPrice(item.price)}</div>
        </div>`;
}

function renderBasketSummary(subtotal, delivery, total) {
    return `
        <div class="basket-summary-row">
            <span>Subtotal</span>
            <span>${formatPrice(subtotal)}</span>
        </div>
        <div class="basket-summary-row">
            <span>Delivery fee</span>
            <span>${formatPrice(delivery)}</span>
        </div>
        <div class="basket-summary-divider"></div>
        <div class="basket-summary-row basket-summary-total">
            <span>Total</span>
            <span>${formatPrice(total)}</span>
        </div>`;
}

function renderEmptyBasket() {
    return `
    <p class="basket-empty">Nothing here yet Go ahead and choose something delicious!</p>
        <img class="basket-empty-img" src="./assets/icon/shopping_cart.svg" alt="shopping cart">
    `;
}

function renderCheckoutItem(item) {
    const itemTotal = item.price * item.quantity;
    return `
    <p>${item.name} x ${item.quantity} = ${formatPrice(itemTotal)}</p>
    `;
}

function formatPrice(value) {
    return `${value.toFixed(2).replace('.', ',')}€`;
}

function renderCheckoutTotal(total) {
    return `<strong>Total: ${formatPrice(total)}</strong>`;
}

function renderAllMenus() {
    document.getElementById('burger').innerHTML = renderMenu('burger');
    document.getElementById('pizza').innerHTML = renderMenu('pizza');
    document.getElementById('salads').innerHTML = renderMenu('salads');
}