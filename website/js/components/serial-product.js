const { computed, ref } = Vue;

export default {
  props: {
    id: String,
    part_no: String,
    title: String,
    price: String,
    weight: String || null,
    imageLarge: String || null,
    imageSmall: String || null,
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
      emit("buy-now-click", {
        id: props.id,
        quantity: valueFromSelect(),
        unit_price: props.price,
      });
    };

    const onAddToBasketClick = () => {
      emit("add-to-basket-click", {
        id: props.id,
        quantity: valueFromSelect(),
        unit_price: props.price,
      });
    };

    return {
      props,
      onBuyNowClick,
      onAddToBasketClick,
    };
  },
  template: `
    <div class="serial-product-card">
        <a v-if="props.imageLarge && props.imageSmall" :href="props.imageLarge" :title="props.part_no + ' ' + props.title" class="glightbox_solo image-link product-link" :data-gallery="'gallery-' + props.id">
            <img :src="props.imageSmall" :alt="props.part_no + ' ' + props.title" />
        </a>
        <div v-else class="no-image">
            <span>Image coming soon</span>
        </div>
        <div class="details">
              <div class="pricing">
                <div class="price-info">
                    <span class="value price">£{{ props.price }}</span>
                    <span class="lbl">Cost per item:</span>
                </div>
                <label>
                    <span class="sr-only">Quantity:</span>
                    <div class="styled-select">
                        <select :name="'quantity-' + props.id" :id="'quantity-' + props.id" class="quantity select-input" v-model="quantity" ref="snSelectRef">
                            <option v-for="n in 120" :key="n" :value="n">{{ n }}</option>
                        </select>
                    </div>
                </label>
            </div>
            <div class="button-actions">
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
