const app = Vue.createApp({
    data() {
        return {
            cart: [],
            premium: true
        }
    },
    methods: {
        updateCart: function(id) {
            this.cart.push(id);
        }
    }
})
