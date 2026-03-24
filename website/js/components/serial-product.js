const { computed, ref } = Vue;

export default {
  props: {
    product: Object,
  },
  emits: ["buy-now-click", "add-to-basket-click"],
  setup(props, { emit }) {
    const quantity = ref(1);
    const snSelectRef = ref(null);

    const valueFromSelect = () => {
      // jQuery selectric DOM manipulation stops v-model updating correctly
      // We get the value directly from the DOM element using ref
      return parseInt(snSelectRef.value.value, 10);
    };

    const onBuyNowClick = () => {
      props.product &&
        emit("buy-now-click", {
          id: props.product.id,
          quantity: valueFromSelect(),
          unit_price: props.product.unit_price,
        });
    };

    const onAddToBasketClick = () => {
      props.product &&
        emit("add-to-basket-click", {
          id: props.product.id,
          quantity: valueFromSelect(),
          unit_price: props.product.unit_price,
        });
    };

    const unitPrice = computed(() =>
      props.product ? props.product.unit_price : null,
    );

    return {
      unitPrice,
      quantity,
      snSelectRef,
      imgLrg: props.product.imgUrlLarge,
      imgSrl: props.product.imgUrlSmall,
      id: props.product.id,
      onBuyNowClick,
      onAddToBasketClick,
    };
  },
  template: `
    <div class="serial-product-card">
        <a :href="imgLrg" class="lc_lightbox_link image-link product-link">
            <img :src="imgSrl" :alt="product.part_no + ' ' + product.description" />
        </a>
        <div class="pricing">
            <div class="price-info">
                <span class="lbl">Cost per item:</span>
                <span class="value price">£{{ unitPrice }}</span>
            </div>
            <label>
                <span class="sr-only">Quantity:</span>
                <div class="styled-select">
                    <select :name="'quantity-' + id" :id="'quantity-' + id" class="quantity select-input" v-model="quantity" ref="snSelectRef">
                        <option v-for="n in 120" :key="n" :value="n">{{ n }}</option>
                    </select>
                </div>
            </label>
            <div class="actions">
                <button type="button" class="bttn" @click.prevent="onBuyNowClick">
                    <span class="icon">
                        <i class="fa-regular fa-credit-card"></i>
                    </span>
                    <span>Buy Now</span>
                </button>

                <button type="button" class="bttn" @click.prevent="onAddToBasketClick">
                    <span class="icon">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </span>
                    <span>Add To Basket</span>
                </button>
            </div>
        </div>
    </div>
  `,
};
