import menuItems from "./menuItems.js"

const itemsContainer = document.getElementById('items-container')

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
                    <button class="add-btn">+</button>
                </div>
            `
        }).join('')
}

function render() {
    itemsContainer.innerHTML = getMenuItems()
}

render()