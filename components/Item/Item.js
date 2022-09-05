class Item {
    constructor() {
        this.classTitleActive = 'item-element__btn_active';
        this.labelAdd = 'Добавить в корзину';
        this.labelRemove = 'Удалить из корзины';
        // this.img = 
    }

    handleClear() {
        ROOT_ITEM.innerHTML = '';
    }

    handleSetImg(img){
        document.querySelector('.item-container__main-imag').src = img;
    }

    handleSetLocationStorage(element, id) {
        const {pushProduct, products} = localStorageUtil.putProducts(id);
        
        if (pushProduct) {
            element.classList.add(this.classTitleActive);
            element.innerHTML = this.labelRemove;
        } else {
            element.classList.remove(this.classTitleActive);
            element.innerHTML = this.labelAdd;
        }

        headerPage.render(products.length);
    }

    render(productId) {
        const productsStore = localStorageUtil.getProducts();
        const [{id, title, images, price, priceold, descr, quantity}] = CATALOG.filter(el => el.id == productId )
        let activeClass = '';
        let activeText = '';
        let htmlImages = '';
        let img = images?.[0].img;

        images.forEach(element => {
            let img_s = element?.img;
            htmlImages += `
                <img class="item-container__small-imag" src="${img_s}" onclick="itemPage.handleSetImg('${img_s}')" >
            `;
        });
        
        if(productsStore.indexOf(id) === -1) {
            activeText = this.labelAdd;
        } else {
            activeClass = ' ' + this.classTitleActive;
            activeText = this.labelRemove;
        }
        const html = `
        <div class="item-container">
            <div class="item__close" onclick="itemPage.handleClear()"></div>
            <div class="item-container__images">
                <img class="item-container__main-imag" src="${img}">
                <div class="item-container__images-list">
                    ${htmlImages}
                </div>
            </div>
            <div class="item-container__info">
                <div>
                    <div class="item-container__title">${title}</div>
                    <div class="item-container__chapter">Коротко о товаре</div>
                    <div class="item-container__descr">${descr}</div>
                </div>        
                <div>    
                    <div class="item-container__quantity">В наличии  ${quantity} шт.</div>
                    <div class="item-pricebox">
                        <span class="item-container__price">💵 ${price.toLocaleString()} USD</span>
                        <span class="item-container__priceold">💵 ${priceold.toLocaleString()} USD</span>
                    </div>
                    <button class="item-element__btn${activeClass}" onclick="itemPage.handleSetLocationStorage(this, '${id}')">${activeText}</button>
                </div>    
            </div>
        </div>

        `
        ROOT_ITEM.innerHTML = html;
    }
}

const itemPage = new Item();