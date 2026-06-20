function renderBasket() {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const basketContainer = document.getElementById('basket-container');
    basketContainer.innerHTML = '';
    if (basket.length === 0) {
        basketContainer.innerHTML = '<p>Your basket is empty.</p>';
        return;
    } else {
        const table = document.createElement('table');
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
        `;
        table.appendChild(headerRow);
        let totalPrice = 0;
        basket.forEach((item, index) => {
            const row = document.createElement('tr');
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><button onclick="removeFromBasket(${index})">Remove</button></td>
            `;
            table.appendChild(row);
        });
        const totalRow = document.createElement('tr');
        totalRow.innerHTML = `
            <td colspan="3"><strong>Total</strong></td>
            <td><strong>$${totalPrice.toFixed(2)}</strong></td>
            <td></td>
        `;
        table.appendChild(totalRow);
        basketContainer.appendChild(table);
    }
}

function addToBasket(product) {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const existingItemIndex = basket.findIndex(item => item.id === product.id);
    if (existingItemIndex !== -1) {
        basket[existingItemIndex].quantity += 1;
    } else {
        basket.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('basket', JSON.stringify(basket));
}

function removeFromBasket(index) {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    basket.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(basket));
    renderBasket();
}

