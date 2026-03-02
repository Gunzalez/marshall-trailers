const { computed, ref } = Vue;

export default {
  props: {
    product: Object,
  },
  emits: ["buy-now-click", "add-to-basket-click"],

  setup(props) {
    const unitPrice = computed(() =>
      props.product ? props.product.unit_price : null,
    );

    const quantity = ref(1);

    return {
      unitPrice,
      imgLrg: props.product.imgUrlLarge,
      imgSrl: props.product.imgUrlSmall,
      id: props.product.id,
      quantity,
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
                    <select name="quantity-051-01-9080" id="quantity-051-01-9080" class="quantity select-input" v-model="quantity">
                        <option v-for="n in 120" :key="n" :value="n">{{ n }}</option>
                    </select>
                </div>
            </label>
            <div class="actions">
                <a href="#" class="btn_buyNow bttn" @click.prevent="$emit('buy-now-click', { id: id, quantity: quantity, unit_price: unitPrice })">
                    <span class="icon">
                        <i class="fa-regular fa-credit-card"></i>
                    </span>
                    <span>Buy Now</span>
                </a>

                <a href="#" class="btn_addBasket bttn" @click.prevent="$emit('add-to-basket-click', { id: id, quantity: quantity, unit_price: unitPrice })">
                    <span class="icon">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </span>
                    <span>Add</span>
                </a>
            </div>
        </div>
    </div>
  `,
};
