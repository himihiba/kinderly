const productsDB = [
    {
        id: 1,
        name: "Dino Surf Swim Shorts Bleu",
        brand: "CHICCO",
        price: 123,
        oldPrice: null,
        rating: 4,
        image: "img/listgirl4.svg",
        category: "Swimwear",
        colors: ["blue", "orange", "yellow"],
        sizes: ["3-6", "6-9", "9-12", "12-18"],
        description: "High quality swim shorts with dinosaur pattern. Perfect for summer days."
    },
    {
        id: 2,
        name: "Kurti Full Sleev",
        brand: "CHICCO",
        price: 200,
        oldPrice: 300,
        rating: 5,
        image: "img/listgirl2.svg",
        category: "Dresses",
        colors: ["white", "pink"],
        sizes: ["S", "M", "L"],
        description: "Elegant full sleeve kurti for special occasions."
    },
    {
        id: 3,
        name: "White Dress Floral",
        brand: "ZARA KIDS",
        price: 150,
        oldPrice: 180,
        rating: 5,
        image: "img/listgirl1.svg",
        category: "Dresses",
        colors: ["white"],
        sizes: ["2Y", "3Y", "4Y"],
        description: "Beautiful floral white dress."
    },
    {
        id: 4,
        name: "Striped Cotton Tee",
        brand: "H&M",
        price: 45,
        oldPrice: null,
        rating: 4,
        image: "img/listgirl3.svg",
        category: "Tops",
        colors: ["red", "blue"],
        sizes: ["S", "M", "L"],
        description: "Comfortable cotton tee for everyday wear."
    },
    {
        id: 5,
        name: "Summer Shorts",
        brand: "GAP",
        price: 85,
        oldPrice: 100,
        rating: 3,
        image: "img/listgirl4.svg",
        category: "Bottoms",
        colors: ["green", "beige"],
        sizes: ["4Y", "5Y"],
        description: "Durable shorts for active kids."
    },
    {
        id: 6,
        name: "Party Frock",
        brand: "MOTHERCARE",
        price: 250,
        oldPrice: null,
        rating: 5,
        image: "img/listgirl2.svg",
        category: "Dresses",
        colors: ["pink", "purple"],
        sizes: ["1Y", "2Y"],
        description: "Fancy frock for birthday parties."
    }
];


for (let i = 7; i <= 18; i++) {
    const template = productsDB[(i % 6)];
    productsDB.push({ ...template, id: i, name: template.name + " " + i });
}



const shadowHeader = () => {
    const header = document.querySelector('.header');
    if (header) {
        window.scrollY >= 50 ? header.classList.add('shadow-header') : header.classList.remove('shadow-header');
    }
}
window.addEventListener('scroll', shadowHeader);

const CartManager = {
    key: 'kinderly_cart',

    getCart() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    },

    saveCart(cart) {
        localStorage.setItem(this.key, JSON.stringify(cart));
        this.updateHeaderBadge();
    },

    addItem(product) {
        let cart = this.getCart();
        const existingItem = cart.find(item => item.id === product.id && item.size === product.size && item.color === product.color);

        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            cart.push(product);
        }

        this.saveCart(cart);
        alert('Product added to cart!');
    },

    removeItem(index) {
        let cart = this.getCart();
        cart.splice(index, 1);
        this.saveCart(cart);
    },

    updateQuantity(index, change) {
        let cart = this.getCart();
        if (cart[index]) {
            cart[index].quantity += change;
            if (cart[index].quantity < 1) cart[index].quantity = 1;
            this.saveCart(cart);
        }
    },

    clearCart() {
        localStorage.removeItem(this.key);
        this.updateHeaderBadge();
    },

    getTotalItems() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + item.quantity, 0);
    },

    getSubtotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    updateHeaderBadge() {
        const count = this.getTotalItems();
        const bagIcon = document.querySelector('ion-icon[name="bag-handle-outline"]');

        if (bagIcon && bagIcon.parentElement) {
            let badge = bagIcon.parentElement.querySelector('.cart-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'cart-badge';
                badge.style.cssText = `
                    position: absolute;
                    top: -5px;
                    right: -8px;
                    background-color: var(---main-yellow);
                    color: white;
                    font-size: 0.7rem;
                    width: 18px;
                    height: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    font-weight: bold;
                `;
                bagIcon.parentElement.style.position = 'relative';
                bagIcon.parentElement.appendChild(badge);
            }
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }
    }
};

const FavManager = {
    key: 'kinderly_favs',

    toggleFav(product) {
        let favs = JSON.parse(localStorage.getItem(this.key)) || [];
        const index = favs.findIndex(p => p.id === product.id);

        if (index > -1) {
            favs.splice(index, 1);
            alert("Removed from favorites");
        } else {
            favs.push(product);
            alert("Added to favorites");
        }
        localStorage.setItem(this.key, JSON.stringify(favs));
    }
};

document.addEventListener('DOMContentLoaded', () => {
    CartManager.updateHeaderBadge();

    const path = window.location.pathname;

    if (path.includes('category.html')) {
        renderCategoryGrid();
    }

    if (path.includes('product.html')) {
        loadProductDetails();
    }

    if (path.includes('cart.html')) {
        renderCartPage();
    }


    if (path.includes('checkout.html')) {
        renderCheckoutSummary();
        initCheckoutForm();
    }
});

function renderCategoryGrid() {
    const gridContainer = document.querySelector('.prod__container');
    if (!gridContainer) return;

    gridContainer.innerHTML = '';

    productsDB.forEach(product => {
        const card = document.createElement('a');
        card.href = `product.html?id=${product.id}`;
        card.className = 'product__card CARD2';

        let starsHTML = '';
        for (let i = 0; i < 5; i++) {
            starsHTML += i < product.rating ? '<span class="star">★</span>' : '<span class="star empty">★</span>';
        }

        card.innerHTML = `
            <div class="show__product">
                <div class="product__image">
                    <img src="${product.image}" alt="${product.name}" class="product_img">
                </div>
                <div class="icons_cont">
                    <ion-icon name="heart-outline" onclick="addToFavFromCard(${product.id}); event.preventDefault();"></ion-icon>
                    <ion-icon name="bag-handle-outline" onclick="addToCartFromCard(${product.id}); event.preventDefault();"></ion-icon>
                    <ion-icon name="image-outline"></ion-icon>
                </div>
            </div>
            
            <div class="takieem">
                <p class="brand_name">${product.brand}</p>
                <div class="stars">${starsHTML}</div>
            </div>
            <p class="product__name">${product.name}</p>
            <p class="price">$${product.price} ${product.oldPrice ? `<del>$${product.oldPrice}</del>` : ''}</p>
        `;
        gridContainer.appendChild(card);
    });
}

function loadProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));

    const product = productsDB.find(p => p.id === id);

    if (!product) {
        if (id) alert('Product not found');
        return;
    }

    document.title = `${product.name} - Kinderly`;

    const mainImg = document.getElementById('mainImage');
    const titleEl = document.getElementById('product-title');
    const brandEl = document.getElementById('product-brand');
    const priceEl = document.getElementById('product-price');
    const descEl = document.getElementById('product-desc');
    const colorsContainer = document.getElementById('colors-container');
    const sizesContainer = document.getElementById('sizes-container');
    const starsContainer = document.getElementById('rating-stars');

    if (mainImg) mainImg.src = product.image;
    if (titleEl) titleEl.innerText = product.name;
    if (brandEl) brandEl.innerText = product.brand;
    if (priceEl) priceEl.innerText = `${product.price} $`;
    if (descEl) descEl.innerText = product.description;

    if (colorsContainer && product.colors) {
        colorsContainer.innerHTML = product.colors.map((color, index) =>
            `<div class="color-swatch ${color} ${index === 0 ? 'active' : ''}" title="${color}" onclick="selectOption(this, '.color-swatch')"></div>`
        ).join('');
    }

    if (sizesContainer && product.sizes) {
        sizesContainer.innerHTML = product.sizes.map((size, index) =>
            `<div class="size-chip ${index === 0 ? 'active' : ''}" onclick="selectOption(this, '.size-chip')">${size}</div>`
        ).join('');
    }

    if (starsContainer) {
        let starsHTML = '';
        for (let i = 0; i < 5; i++) {
            starsHTML += i < product.rating ? '<span class="star">★</span>' : '<span class="star empty">★</span>';
        }
        starsContainer.innerHTML = starsHTML;
    }

    window.currentProduct = product;

    document.querySelectorAll('.thumbnail img').forEach(img => img.src = product.image);
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
        thumb.onclick = () => {
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            if (mainImg) mainImg.src = product.image;
        };
    });
    const firstThumb = document.querySelector('.thumbnail');
    if (firstThumb) firstThumb.classList.add('active');
}

window.selectOption = (element, selector) => {
    element.parentElement.querySelectorAll(selector).forEach(el => el.classList.remove('active'));
    element.classList.add('active');
};

window.addToCartFromCard = (id) => {
    const product = productsDB.find(p => p.id === id);
    if (product) {
        CartManager.addItem({
            ...product,
            size: product.sizes[0],
            color: product.colors[0],
            quantity: 1
        });
    }
};

window.addToFavFromCard = (id) => {
    const product = productsDB.find(p => p.id === id);
    if (product) FavManager.toggleFav(product);
};


function renderCartPage() {
    const container = document.querySelector('.cart-left');
    const summaryTotal = document.querySelector('.summary-row.total span:last-child');
    const summarySubtotal = document.querySelector('.summary-row:first-child span:last-child');
    const cart = CartManager.getCart();

    if (!container) return;
    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = '<p style="padding: 2rem; text-align: center; color: #666;">Your cart is empty.</p>';
        if (summaryTotal) summaryTotal.innerText = '0 $';
        if (summarySubtotal) summarySubtotal.innerText = '0 $';
        return;
    }

    cart.forEach((item, index) => {
        const itemHTML = `
            <div class="cart-item">
                <div class="cart-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <div class="item-header">
                        <h2 class="item-title">${item.name}</h2>
                        <p class="item-brand">${item.brand}</p>
                        <p class="item-size">${item.size} | ${item.color}</p>
                    </div>
                    <div class="item-footer">
                        <span class="item-price">${item.price} $</span>
                        <div class="qty-control">
                            <button class="qty-btn" onclick="updateCartItem(${index}, -1)">−</button>
                            <span class="qty-val">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateCartItem(${index}, 1)">+</button>
                        </div>
                    </div>
                </div>
                <button class="delete-btn" onclick="removeCartItem(${index})"><ion-icon name="trash-outline"></ion-icon></button>
            </div>
        `;
        container.innerHTML += itemHTML;
    });

    const total = CartManager.getSubtotal();
    if (summaryTotal) summaryTotal.innerText = `${total} $`;
    if (summarySubtotal) summarySubtotal.innerText = `${total} $`;
}

function renderCheckoutSummary() {
    const firstItem = document.querySelector('.order-item');
    if (!firstItem && !document.querySelector('.order-summary')) return;

    let listContainer;
    if (firstItem) {
        listContainer = firstItem.parentElement;
        const existingItems = listContainer.querySelectorAll('.order-item');
        existingItems.forEach(el => el.remove());
    } else {
        listContainer = document.querySelector('.order-summary');
    }

    const cart = CartManager.getCart();
    const couponSection = listContainer.querySelector('.coupon-section');

    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'order-item';
        div.innerHTML = `
            <div class="item-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <p class="item-title">${item.name}</p>
                <p class="item-brand">${item.brand}</p>
                <p class="item-size">${item.size}</p>
                <div class="item-price-qty">
                    <span class="item-price">${item.price} $</span>
                    <span style="font-size: 0.9rem; color: #666;">Qty: ${item.quantity}</span>
                </div>
            </div>
        `;
        listContainer.insertBefore(div, couponSection);
    });

    const total = CartManager.getSubtotal();
    const subtotalEl = document.querySelector('.totals-row span:last-child');
    const totalEl = document.querySelector('.totals-row.final span:last-child');

    if (subtotalEl) subtotalEl.innerText = `${total} $`;
    if (totalEl) totalEl.innerText = `${total} $`;
}

function initCheckoutForm() {
    const form = document.querySelector('.checkout-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.pay-btn');
            btn.innerText = "Processing...";
            btn.disabled = true;

            setTimeout(() => {
                alert('Order Placed Successfully! Thank you for shopping with Kinderly.');
                CartManager.clearCart();
                window.location.href = 'index.html';
            }, 1500);
        });
    }
}

window.updateCartItem = (index, change) => {
    CartManager.updateQuantity(index, change);
    renderCartPage();
};

window.removeCartItem = (index) => {
    CartManager.removeItem(index);
    renderCartPage();
};

document.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart-btn')) {
        const product = window.currentProduct;
        if (product) {
            const sizeChip = document.querySelector('.size-chip.active');
            const colorSwatch = document.querySelector('.color-swatch.active');
            const qtyVal = document.getElementById('quantity');

            CartManager.addItem({
                ...product,
                size: sizeChip ? sizeChip.innerText : product.sizes[0],
                color: colorSwatch ? colorSwatch.title : product.colors[0],
                quantity: parseInt(qtyVal ? qtyVal.innerText : 1)
            });
        }
    }
});