import menuItems from "./menuItems.js"

const itemsContainer = document.getElementById('items-container')
const selectedItemsContainer = document.getElementById('selected-items-container')
const totalValue = document.getElementById('total-value')


document.addEventListener('click', function(e) {
    if(e.target.id === 'Pizza') {
        addPizzaToCart()
    } else if(e.target.id === 'Hamburger') [
        addHamburgerToCart()
    ]
})

function addPizzaToCart() {
    menuItems.filter(item => {
        if(item.name === 'Pizza') {
            selectedItemsContainer.innerHTML += `
                <div class="selected-items">
                    <div>
                        <p class="selected-item-name">${item.name}</p>
                        <button class="remove-item-btn">remove</button>
                    </div>
                    <p class="selected-item-price">${item.price}</p>
                </div>
            `    
        }
    })
}

function addHamburgerToCart() {
    menuItems.filter(item => {
        if(item.name === 'Hamburger') {
            selectedItemsContainer.innerHTML += `
                <div class="selected-items">
                    <div>
                        <p class="selected-item-name">${item.name}</p>
                        <button class="remove-item-btn">remove</button>
                    </div>
                    <p class="selected-item-price">${item.price}</p>
                </div>
            `
        }
    })
}

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
                            <p class="item-price">${price}</p>
                        </div>
                    </div>
                    <button class="add-btn" id="${name}">+</button>
                </div>
            `
        }).join('')

}

function render() {
    itemsContainer.innerHTML = getMenuItems()
}

render()