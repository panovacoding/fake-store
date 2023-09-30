window.addEventListener('load', () => {
    
    const catalogList = document.getElementById('catalog-list');

    async function getAllItems() {
        let response = await fetch('https://fakestoreapi.com/products').then(res=>res.json());

        response.forEach((element) => {
            let catalogItem = `
                <li class="catalog-item" id=${element.id} data-category=${element.category}>
                    <div class="catalog-item__image-wrapper">
                        <img src=${element.image}>
                    </div>
                    <div class="catalog-item__info">                        
                        <div class="catalog-item__price">${element.price}<span> $</span></div>
                        <div class="catalog-item__rating">
                        ${element.rating.rate} (<span class="catalog-item__rating-count">${element.rating.count}</span>)
                        </div>
                        <div class="catalog-item__title">
                            <a href="#">${element.title}</a>
                        </div>
                        <div class="catalog-item__category">${element.category}</div>
                    </div>
                </li>
            `
        catalogList.innerHTML += catalogItem;
        
        })
    }
  
    getAllItems();

    const filterForm = document.querySelector('.filter-form')
    const checkboxesCategory = [...filterForm.querySelectorAll('input[name="category"')]

    
    filterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const checkboxesCheked = [];
        
        
        checkboxesCategory.forEach(cb => {
            if(cb.checked) {
                checkboxesCheked.push(cb);
            }
        });

        if(checkboxesCheked.length >= 1) {
            catalogList.innerHTML=""
        } else {
            catalogList.innerHTML=""
            getAllItems();
        }

        checkboxesCheked.forEach(cbc => {
            console.log(cbc.getAttribute('data-category'))

            async function getFiltered() {
                let response = await fetch('https://fakestoreapi.com/products').then(res=>res.json());
        
                response.forEach((element) => {
                    if(element.category === cbc.getAttribute('data-category')) {
                        let catalogItem = `
                            <li class="catalog-item" id=${element.id} data-category=${element.category}>
                                <div class="catalog-item__image-wrapper">
                                    <img src=${element.image}>
                                </div>
                                <div class="catalog-item__info">                        
                                    <div class="catalog-item__price">${element.price}<span> $</span></div>
                                    <div class="catalog-item__rating">
                                    ${element.rating.rate} (<span class="catalog-item__rating-count">${element.rating.count}</span>)
                                    </div>
                                    <div class="catalog-item__title">
                                        <a href="#">${element.title}</a>
                                    </div>
                                    <div class="catalog-item__category">${element.category}</div>
                                </div>
                            </li>
                        `
                    catalogList.innerHTML += catalogItem;
                    }
                
                })
            }

            getFiltered();

        })
        
    })

    filterForm.addEventListener('reset', () => {
        catalogList.innerHTML = ''
        getAllItems();
    })

})