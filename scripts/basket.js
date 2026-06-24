function renderBasket() {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const basketContainer = document.getElementById('basket');
    const basketSummary = document.getElementById('basketSummary');
    const checkoutButton = document.getElementById('checkoutButton');
    basketContainer.innerHTML = '';
    basketSummary.innerHTML = '';

    if (basket.length === 0) {
        basketContainer.innerHTML = renderEmptyBasket();
        checkoutButton.textContent = 'Buy now';
        return;
    }

    let subtotal = 0;
    basket.forEach((item, index) => {
        basketContainer.innerHTML += renderBasketItem(item, index);
        subtotal += item.price * item.quantity;
    });

    const deliveryFee = 4.99;
    const total = subtotal + deliveryFee;
    basketSummary.innerHTML = renderBasketSummary(subtotal, deliveryFee, total);
    checkoutButton.textContent = `Buy now (${formatPrice(total)})`;
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
    renderBasket();
    renderAllMenus();
}

function addOneToBasket(itemId) {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const itemIndex = basket.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        basket[itemIndex].quantity += 1;
        localStorage.setItem('basket', JSON.stringify(basket));
        renderBasket();
        renderAllMenus();
    }
}

function addToBasketByIndex(category, index) {
    const product = {
        ...menu[category][index],
        id: `${category}-${index}`
    };

    addToBasket(product);
}

function removeFromBasket(index) {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    basket.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(basket));
    renderBasket();
    renderAllMenus();
}

// function openCheckout() {
//     const basket = JSON.parse(localStorage.getItem('basket')) || [];

//     const container = document.getElementById('checkoutItems');
//     const totalText = document.getElementById('checkoutTotal');

//     container.innerHTML = '';

//     let total = 0;

//     basket.forEach(item => {
//         container.innerHTML += renderCheckoutItem(item);
//         total += item.price * item.quantity;
//     });

//     totalText.innerHTML = renderCheckoutTotal(total);


//     if (typeof window.hideMobileBasketPanel === 'function') {
//         window.hideMobileBasketPanel();
//     }

//     document.getElementById('checkoutModal').classList.remove('hidden');
// }

function openCheckout() {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];

    const container = document.getElementById('checkoutItems');
    const totalText = document.getElementById('checkoutTotal');

    container.innerHTML = '';

    let total = 0;

    basket.forEach(item => {
        container.innerHTML += renderCheckoutItem(item);
        total += item.price * item.quantity;
    });

    totalText.innerHTML = renderCheckoutTotal(total);


    if (typeof window.hideMobileBasketPanel === 'function') {
        window.hideMobileBasketPanel();
    }

    document.getElementById('checkoutModal').classList.remove('hidden');
}

function init() {
    renderAllMenus();
    renderBasket();
}

window.addEventListener('DOMContentLoaded', init);


function enableMobileBasketToggle() {
    const basketPanel = document.querySelector('.basket');
    const navBasketBtn = document.getElementById('navBasket');
    if (!basketPanel || !navBasketBtn) return;

    const mobileQuery = window.matchMedia('(max-width: 760px)');

    function showBasket() {
        basketPanel.classList.add('mobile-visible');
        setTimeout(() => document.body.addEventListener('click', outsideClick, true), 0);
    }

    function hideBasket() {
        basketPanel.classList.remove('mobile-visible');
        document.body.removeEventListener('click', outsideClick, true);
    }


    window.hideMobileBasketPanel = hideBasket;

    function outsideClick(e) {
        if (e.target.closest('.basket')) return;
        if (e.target.closest('#navBasket')) return;
        if (e.target.closest('.bottom-nav')) return;
        hideBasket();
    }

    navBasketBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (!mobileQuery.matches) return;
        if (basketPanel.classList.contains('mobile-visible')) hideBasket(); else showBasket();
    });

    mobileQuery.addEventListener('change', (ev) => {
        if (!ev.matches) {

            hideBasket();
            basketPanel.style.display = '';
        } else {

            hideBasket();
        }
    });

    if (mobileQuery.matches) hideBasket();
}

window.addEventListener('DOMContentLoaded', () => {
    enableMobileBasketToggle();
    window.addEventListener('resize', enableMobileBasketToggle);
});



window.addEventListener('DOMContentLoaded', setupNavIconFallback);

function preventBottomNavOverlap() {
    const bottomNav = document.getElementById('bottomNav');
    const footer = document.querySelector('footer');
    if (!bottomNav || !footer) return;

    function updateBottomNav() {
        const footerRect = footer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const minBottom = 12;
        let bottom = minBottom;

        if (footerRect.top < viewportHeight) {
            bottom = Math.max(minBottom, viewportHeight - footerRect.top + minBottom);
        }

        bottomNav.style.bottom = `${bottom}px`;
    }

    window.addEventListener('scroll', updateBottomNav);
    window.addEventListener('resize', updateBottomNav);
    updateBottomNav();
}

window.addEventListener('DOMContentLoaded', preventBottomNavOverlap);

window.confirmOrder = function () {
    localStorage.removeItem('basket');
    renderBasket();
    renderAllMenus();
    closeModal();
    alert("Bestellung erfolgreich!");
};

window.closeModal = function () {
    document.getElementById('checkoutModal').classList.add('hidden');
};