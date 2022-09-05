function render() {
    const prodactsStore = localStorageUtil.getProducts();
    
    headerPage.render(prodactsStore.length);
    productsPage.render();
}

render ();

// let test = fetch('https://store.tildacdn.com/api/tgetproduct/')
//                 .then(res => res.json())
//                 .then(body => console.log(body))
//                 .catch(error => {
//                     console.log(error)
//                 });
                
