const { computed, ref } = Vue;

export default {
  props: {
    data: Object,
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

    const onBuyNowRelatedClick = (relatedItem) => {
      props.data &&
        emit("buy-now-click", {
          id: relatedItem.id,
          quantity: 1,
          price: parseFloat(relatedItem.price),
        });
    };

    const onAddToBasketRelatedClick = (relatedItem) => {
      props.data &&
        emit("add-to-basket-click", {
          id: relatedItem.id,
          quantity: 1,
          price: parseFloat(relatedItem.price),
        });
    };

    const onBuyNowClick = () => {
      props.data &&
        emit("buy-now-click", {
          id: props.data.id,
          quantity: valueFromSelect(),
          price: parseFloat(props.data.price),
        });
    };

    const onAddToBasketClick = () => {
      props.data &&
        emit("add-to-basket-click", {
          id: props.data.id,
          quantity: valueFromSelect(),
          price: parseFloat(props.data.price),
        });
    };

    const costPerUnit = computed(() => {
      const val = props.data ? props.data.price : null;
      return window.MT.utils.formatCurrency(val);
    });

    return {
      quantity,
      costPerUnit,
      snSelectRef,
      id: props.data.id,
      notes: props.data.notes,
      partNo: props.data.part_no,
      imageLarge: props.data.imageLarge,
      imageSmall: props.data.imageSmall,
      unitWeight: props.data.unit_weight,
      products: props.data.products,
      categories: props.data.categories,
      title: props.data.title,
      relatedItems: props.data.related,
      onBuyNowRelatedClick,
      onAddToBasketRelatedClick,
      onBuyNowClick,
      onAddToBasketClick,
    };
  },
  template: `
    <div class="result">
        <a v-if="imageLarge && imageSmall" :href="imageLarge" :title="partNo + ' - ' + title" class="glightbox_solo spare-thumbnail" :data-gallery="'part-' + id">
            <img :src="imageSmall" :alt="title">
        </a>
        <div v-else class="coming-soon">
            <p>Image Coming Soon</p>
        </div>
        <div class="details">
            <h3 class="title">
                <div>
                    <span class="lbl">Part no:</span>
                    <span class="val">{{ partNo }}</span>
                </div>
                <div>
                    <span class="lbl">Description:</span>
                    <span class="val">{{ title }}</span>
                </div>
            </h3>
            <div v-if="products && products.length > 0" class="products-wrapper">
                <h4 class="header">Products:</h4>
                <ul class="products-list">
                    <li v-for="(product, index) in products" :key="index">
                        <template v-if="product.slug">
                            <a :href="product.slug" :title="product.title">{{ product.title }}</a>
                        </template>
                        <template v-else>
                            <span>{{ product.title }}</span>
                        </template>
                    </li>
                </ul>
            </div>
            <div v-if="categories.length > 0" class="categories-wrapper">
                <h4 class="header">Component categories:</h4>
                <ul class="categories-list">
                    <li v-for="(category, index) in categories" :key="index">
                        {{ category }}
                    </li>
                </ul>
            </div>
            <div v-if="notes && notes.length > 0" class="notes">
                <h4 class="header">Notes:</h4>
                <div class="notes-list">
                    <template v-if="Array.isArray(notes)">
                        <p v-for="(note, index) in notes" :key="index">
                        {{ note }}
                    </p>
                    </template>
                    <p v-else>
                        {{ notes }}
                    </p>
                </div>
            </div>
            <div v-if="relatedItems && relatedItems.length > 0" class="related-items">
                <h4 class="header">Related items:</h4>
                <ul class="related-items-list">
                    <li v-for="(item, index) in relatedItems" :key="index">
                        <a :href="item.image" :title="item.part_no + ' - ' + item.title" class="glightbox_text" :data-gallery="'related-item-' + id + '-' + item.part_no">{{ item.part_no }}</a>
                        <span>{{ item.title }}</span>
                        <div class="actions">
                            <button type="button" class="bttn secondary-buy" @click.prevent="onBuyNowRelatedClick(item)">
                                <span class="icon">
                                    <i class="fa-regular fa-credit-card"></i>
                                </span>
                                <span>Buy Now</span>
                            </button>
                            <button type="button" @click.prevent="onAddToBasketRelatedClick(item)" class="bttn secondary-buy">
                                <span class="icon">
                                    <i class="fa-solid fa-cart-shopping"></i>
                                </span>
                                <span>Add To Basket</span>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <ul class="pricing">
            <li v-if="unitWeight">
                <span class="lbl">Unit weight:</span>
                <span class="val">{{ unitWeight }}</span>
            </li>
            <li>
                <span class="lbl">Cost per unit:</span>
                <span class="val price">{{ costPerUnit }}</span>
            </li>
            <li class="add-to-basket">
                <div class="select-box">
                    <select :id="'quantity-' + id" 
                        :name="'quantity-' + id" 
                        class="quantity select-input" 
                        v-model="quantity" ref="snSelectRef">
                            <option v-for="n in 120" :value="n">{{ n }}</option>
                    </select>
                </div>
                <button type="button" class="bttn" @click.prevent="onBuyNowClick">
                    <span class="icon">
                        <i class="fa-regular fa-credit-card"></i>
                    </span>
                    <span>Buy Now</span>
                </button>
                <button type="button" @click.prevent="onAddToBasketClick" class="bttn">
                    <span class="icon">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </span>
                    <span>Add To Basket</span>
                </button>
            </li>

            
        </ul>
    </div>
  `,
};
