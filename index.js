import menuItems from "./menuItems.js"

const itemsContainer = document.getElementById('items-container')
const selectedItemsContainer = document.getElementById('selected-items-container')
const totalValue = document.getElementById('total-value')
const checkoutSection = document.getElementById('checkout-section')
const paymentModal = document.getElementById('payment-modal')

// event listners
document.addEventListener('click', function(e) {
    if(e.target.dataset.add) {
        addItemToCart(e.target.dataset.add)
    } else if (e.target.dataset.remove) {
        removeItemFromCart(e.target.dataset.remove)
    } else if (e.target.id === 'checkout-btn') {
        displayPaymentModal()
    } 
})


// Calculate Total price
function calculateTotal(price) {    
    totalValue.textContent = `${Number(totalValue.textContent) + price}`
    
    checkoutSection.style.display = Number(totalValue.textContent) > 0 ? 'block' : 'none'

}

// Function for adding item to cart
function addItemToCart(itemName) {
    menuItems.filter(item => {
        if(item.name === itemName) {
            // item.uuid = crypto.randomUUID()
            selectedItemsContainer.innerHTML += `
                <div class="selected-items" id="${item.name}">
                    <div>
                        <p class="selected-item-name">${item.name}</p>
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

            calculateTotal(item.price)
        } 
    })
}

// Function for removing item from Cart
function removeItemFromCart(itemId) {
    document.getElementById(itemId).remove()
    menuItems.filter(item => {
        if (item.name === 'Pizza' && item.name === itemId) {
            calculateTotal(-item.price)
        } else if (item.name === 'Hamburger' && item.name === itemId) {
            calculateTotal(-item.price)
        } else if (item.name === 'Beer' && item.name === itemId) {
            calculateTotal(-item.price)
        }
    })
}

// Payment Modal
function displayPaymentModal(e) {
    document.getElementById('payment-modal').style.display = 'flex'
    
}

// Order Confirmation Msg
paymentModal.addEventListener('submit', function(e) {
    e.preventDefault()
    const formData = new FormData(paymentModal)
    console.log(formData)
})

// Get list of menu items
function getMenuItems() {
    
    return menuItems.map(item => {
        const {price, name, ingredients, image, alt} = item

            return `
                <div class="item">
                    <div class="item-detail-div">
                        <img src="images/${image}" alt="${alt}" class="item-icon">
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

// render menu items to DOM
function render() {
    itemsContainer.innerHTML = getMenuItems()
}

render()