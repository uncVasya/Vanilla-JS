class Products {
    constructor() {
        this.classTitleActive = 'products-element__btn_active';
        this.labelAdd = 'Добавить в корзину';
        this.labelRemove = 'Удалить из корзины';
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

    handleSetItem(id) {
        itemPage.render(id);
    }

    render() {
        const productsStore = localStorageUtil.getProducts();
        let htmlCatalog = '';

        CATALOG.forEach(({id, title, priceold, price, images}) => {
            let activeClass = '';
            let activeText = '';
            let img = images?.[0].img;
            
            if(productsStore.indexOf(id) === -1) {
                activeText = this.labelAdd;
            } else {
                activeClass = ' ' + this.classTitleActive;
                activeText = this.labelRemove;
            }

            htmlCatalog += `
                <li class="products-element">
                    <span class="products-element__title" onclick="productsPage.handleSetItem('${id}')">${title}</span>
                    <img class="products-element__img" src="${img}">

                    <div class="products-pricebox">
                        <span class="products-element__priceold">💵 ${priceold.toLocaleString()} USD</span>
                        <span class="products-element__price">💵 ${price.toLocaleString()} USD</span>
                    </div>
                    
                    <button class="products-element__btn${activeClass}" onclick="productsPage.handleSetLocationStorage(this, '${id}')">${activeText}</button>
                </li>
            `
        });
        const html = `
            <ul class="products-container">
                ${htmlCatalog}
            <ul>
        `;
        ROOT_PRODUCTS.innerHTML = html;
    }
}

const productsPage = new Products();