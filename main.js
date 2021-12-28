const app = Vue.createApp({
    data() {
        return {
            premium: true
        }
    },
    setup() {
        const cart = Vue.ref({});
        return { cart };
    },
    methods: {
        // modify the cart quantity for the given id by the given quantity
        modifyCartItem: function(id, quantity) {
            if (!Object.hasOwnProperty.call(this.cart, id)) {
                this.cart[id] = {
                    quantity: quantity
                }
            } else {
                this.cart[id].quantity += quantity;
            }
        },
    },
    computed: {
        cartQuantity: function() {
            var totalQty = 0;
            for (const index in this.cart) {
                if (Object.hasOwnProperty.call(this.cart, index)) {
                    const item = this.cart[index];
                    totalQty += item.quantity;
                }
            }
            return totalQty;
        }
    },
    watch: {
        cart: {
            deep: true,
            handler() {
                console.log('test');
            }
        }
    }
})
