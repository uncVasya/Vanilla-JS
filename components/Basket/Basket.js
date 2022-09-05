class Basket {
    handleClear() {
        ROOT_BASKET.innerHTML = '';
    }

    render () {
        const productsStore = localStorageUtil.getProducts();
        let htmlCatalog = ''; 
        let sumCatalog = 0;

        CATALOG.forEach(({id, title, price}) => {
            if (productsStore.indexOf(id) !== -1) {
                htmlCatalog += `
                <tr>
                    <td class="basket-element__title">${title}</td>
                    <td class="basket-element__price">💵 ${price.toLocaleString()} USD</td>
                </tr>
                `;
                sumCatalog += price;
            }
        });

        const html = `
            <div class="basket-container">
            <div class="basket__close" onclick="basketPage.handleClear()"></div>
            <table>
                    ${htmlCatalog}
                    <tr>
                    <td class="basket-element__title">TOTAL</td>
                    <td class="basket-element__price">💰 ${sumCatalog.toLocaleString()} USD</td>
                    </tr>
                </table>
            </div> 
        `
        ROOT_BASKET.innerHTML = html; 
    }
}

const basketPage = new Basket();