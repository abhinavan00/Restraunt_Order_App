import { menuItems, cartItems} from "./menuItems.js"

const itemsContainer = document.getElementById('items-container')
const selectedItemsContainer = document.getElementById('selected-items-container')
const totalValue = document.getElementById('total-value')
const checkoutSection = document.getElementById('checkout-section')
const paymentModal = document.getElementById('payment-modal')

/* ============
    Event listners
=============== */
document.addEventListener('click', function(e) {
    if(e.target.dataset.add) {
        addItemToCart(e.target.dataset.add)
    } else if (e.target.dataset.remove) {
        removeItemFromCart(e.target.dataset.remove)
    } else if (e.target.id === 'checkout-btn') {
        // Payment Modal
        paymentModal.style.display = 'flex'
    } 
})

/* ============
    Add item to cart
=============== */
function addItemToCart(itemName) {
    menuItems.filter(item => {
        if(item.name === itemName) {
            cartItems.push(item)
            manageCartItems(item)
        } 
    })
    calculateTotal(cartItems)

}

/* ===============
    Remove item from Cart
================== */
function removeItemFromCart(itemId) {

    menuItems.filter(item => {
        if(item.name === itemId) {
            const index = cartItems.indexOf(item)
            if (index > -1) {
                cartItems.splice(index, 1)
            }
            manageCartItems(item)
        }
    })
    calculateTotal(cartItems)
}

/* ==============
    Manage cart items
================= */
function manageCartItems(item) {
    const qty = cartItems.filter(cartItem => cartItem === item).length

    if(qty === 0) {
        document.getElementById(item.name).remove()
    } else if(qty === 1 && !document.getElementById(item.name)) {
        selectedItemsContainer.innerHTML += `
                    <div class="selected-items" id="${item.name}">
                        <div>
                            <p class="selected-item-name">${item.item_icon} ${item.name}</p>
                            <p class="item-quantity" id="${item.name}-quantity">${qty}</p>
                            <button 
                                class="remove-item-btn" 
                                data-remove= "${item.name}"
                            >
                                remove
                            </button>
                        </div>
                        <p class="selected-item-price">$${item.price}</p>
                    </div>
                `
    } else {
        document.getElementById(`${item.name}-quantity`).textContent = `${qty}`
    }
}

/* ==============
    Calculate Total price
================= */
function calculateTotal(cartItems) {

    const total = cartItems.reduce((total, current) => {
        return total + current.price
    }, 0)

    totalValue.textContent = total

    checkoutSection.style.display = Number(totalValue.textContent) > 0 ? 'block' : 'none'

}

/* ==============
    Order Confirmation Msg
================= */
paymentModal.addEventListener('submit', function(e) {
    e.preventDefault()
    const formData = new FormData(paymentModal)
    const customerName = formData.get('customer-name')
    paymentModal.style.display = 'none'

    checkoutSection.innerHTML = `
        <p class="confrm-msg" id="confrm-msg">
            Thanks, ${customerName}! Your order is on its way!
        </p>
    `
})

/* =================
    Get list of menu items
==================== */
function getMenuItems() {
    
    return menuItems.map(item => {
        const {price, name, ingredients, image, alt} = item

            return `
                <div class="item">
                    <div class="item-detail-div">
                        <p 
                            class="item-icon ${item.name}" 
                            role="img" 
                            aria-label="${item.aria_label}"
                        >
                            ${item.item_icon}
                        </p>
                        <div>
                            <p class="item-name">${name}</p>
                            <p class="item-desc">${ingredients}</p>
                            <p class="item-price">$${price}</p>
                        </div>
                    </div>
                    <button class="add-btn" data-add="${name}">+</button>
                </div>
            `
        }).join('')

}

/* ==============
    render menu items to DOM
================= */
function render() {
    itemsContainer.innerHTML = getMenuItems()
}

render()