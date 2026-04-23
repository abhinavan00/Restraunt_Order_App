import menuItems from "./menuItems.js"

const main = document.getElementById('main')

function getMenuItems() {
    return menuItems.map(item => {
        const {price, name, ingredients, image, alt} = item
            return `
                <section class="item">
                    <div class="item-detail-div">
                        <img src="images/${image}" alt="${alt}" class="item-icon">
                        <div>
                            <p class="item-name">${name}</p>
                            <p class="item-desc">${ingredients}</p>
                            <p class="item-price">${price}</p>
                        </div>
                    </div>
                    <button class="add-btn">+</button>
                </section>
            `
        })
}

function render() {
    main.innerHTML = getMenuItems()
}

render()