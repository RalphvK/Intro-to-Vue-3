app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        },
        cart: {
            type: Array,
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
                    <span v-show="variantCartQuantity > 0">({{ variantCartQuantity }})</span>
                </button>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariantId: 0,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
              { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
              { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 },
            ]
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariantId].id);
        },
        updateVariant(index) {
            this.selectedVariantId = index
        }
    },
    computed: {
        selectedVariant() {
            return this.variants[this.selectedVariantId];
        },
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariantId].image
        },
        inStock() {
            return this.variants[this.selectedVariantId].quantity > 0;
        },
        shipping() {
            if (this.premium) {
                return 'free';
            } else {
                return 2.99;
            }
        },
        variantCartQuantity() {
            if (typeof this.cart == 'undefined' || !Array.isArray(this.cart)) { return null; }
            var occurrences = 0;
            this.cart.forEach(element => {
                console.log(element, this.selectedVariant.id)
                if (element == this.selectedVariant.id) {
                    occurrences++;
                }
            });
            console.log(occurrences);
            return occurrences;
        }
    }
});