function renderMenu(category) {
    const items = menu[category];
    let html = '';
    items.forEach((item, index) => {
        html += `
            <div class="menu-item" id="menu-${category}-${index}">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <p>$${item.price.toFixed(2)}</p>
                <button onclick="addToBasketByIndex('${category}', ${index})">Add to Basket</button>
            </div>
        `;
    });
    return html;
}

document.getElementById('burger').innerHTML += renderMenu('burger');
document.getElementById('pizza').innerHTML += renderMenu('pizza');
document.getElementById('salads').innerHTML += renderMenu('salads');