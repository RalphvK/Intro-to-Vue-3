app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        },
        cart: {
            required: false
        }
    },
    template:
    /*html*/`
    <div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <img v-bind:src="image">
            </div>
            <div class="product-info">
                <h1>{{ title }}</h1>

                <p v-if="inStock">In Stock</p>
                <p v-else>Out of Stock</p>

                <p>Shipping: {{ shipping }}</p>
                
                <product-details :details="details"></product-details>

                <div v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariant(index)" class="color-circle"
                    :style="{ backgroundColor: variant.color }">
                </div>

                <button class="button" :class="{ disabledButton: !inStock }" :disabled="!inStock" @click="addToCart">
                    Add to Cart 
                    <span v-show="variantCartQty > 0">({{ variantCartQty }})</span>
                </button>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariantKey: 0,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
              { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
              { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 20 },
            ]
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariantKey].id, 1);
        },
        updateVariant(index) {
            this.selectedVariantKey = index
        }
    },
    computed: {
        selectedVariant() {
            return this.variants[this.selectedVariantKey];
        },
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariantKey].image
        },
        inStock() {
            return this.variants[this.selectedVariantKey].quantity > 0;
        },
        shipping() {
            if (this.premium) {
                return 'free';
            } else {
                return 2.99;
            }
        },
        variantCartQty() {
            if (typeof this.cart == 'object' && typeof this.cart[this.variants[this.selectedVariantKey].id] !== 'undefined') {
                return this.cart[this.variants[this.selectedVariantKey].id].quantity;
            } else {
                return 0;
            }
        }
    },
    watch: {
        cart() {
            console.log('cart changed');
        }
    }
});