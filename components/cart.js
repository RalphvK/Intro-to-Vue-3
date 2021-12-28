app.component('cart', {
    props: {
        cart: {
            required: true
        }
    },
    template: /*html*/`
        <ul class="cart-items">
            <li v-for="(item, index) in cart" :key="index">
                <strong>{{ index }}</strong> ({{item.quantity}})
            </li>
        </ul>
    `
});