export default {
    data() {
        return {
            categoryIds: null,
            cartItems: null,
            cartUniqueCats: null,
        }
    },
    computed: {
    },
    methods: {
        calculation(discounts, cartItems, preTotal) {
            let amount = 0;
            this.categoryIds = [];
            this.cartItems = cartItems;
            this.cartUniqueCats = this.getUniqueCats();
            this.cartItems.forEach(cartItem => {
                this.categoryIds.push(cartItem.category_id);
            });

            discounts.forEach(discount => {
                let isFitReqs = this.checkRequirements(discount);
                if (isFitReqs) {
                    amount = discount.value.type === 'perc' ? (discount.value.amount / 100 * preTotal) : discount.value.amount;
                }
            });
            return amount;
        },

        checkRequirements(discount) {
            /** requirements.target.categories: -1 - diff cats, 0 - any cats even the same cat, x > 0 - categories */
            let allCheck = discount.requirements.map(item => {
                let fitCurrent = false; // does cart fits current discount requirements

                switch (item.target.categories[0]) {
                    case -1 :
                        fitCurrent = this.diffCategories(item.products);
                        break
                    case 0 :
                        fitCurrent = this.anyCategory(item.products);
                        break
                    default :
                        fitCurrent = this.directCategories(item.products);
                }
                return fitCurrent;
            });
            return allCheck.findIndex(item => item === false) === -1; // if any requirement don't fits return false
        },
        getUniqueCats() {
            let ids = this.cartItems.map(ci => ci.category_id);
            return [...new Set(ids)];
        },
        diffCategories(products) {
            let checkCats = this.cartUniqueCats.length > 1; // check requirement of fitting to different categories
            let checkProds = this.cartItems.length >= products; // check requirement of fitting to products quantity
            return checkCats && checkProds;
        },
        anyCategory( products) {
            return this.cartItems.length >= products; // check requirement of fitting to products quantity
        },
        directCategories(products) {
            let prodsInCats = this.cartUniqueCats.map(category => {
                return this.cartItems.find(prod => prod.category_id === category);
            });

            return prodsInCats.length >= products;
        },
    },
}