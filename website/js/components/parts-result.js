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
          sid: relatedItem.sid,
          quantity: 1,
          price: parseFloat(relatedItem.price),
        });
    };

    const onAddToBasketRelatedClick = (relatedItem) => {
      props.data &&
        emit("add-to-basket-click", {
          sid: relatedItem.sid,
          quantity: 1,
          price: parseFloat(relatedItem.price),
        });
    };

    const onBuyNowClick = () => {
      props.data &&
        emit("buy-now-click", {
          sid: props.data.sid,
          quantity: valueFromSelect(),
          price: parseFloat(props.data.cost_per_item),
        });
    };

    const onAddToBasketClick = () => {
      props.data &&
        emit("add-to-basket-click", {
          sid: props.data.sid,
          quantity: valueFromSelect(),
          price: parseFloat(props.data.cost_per_item),
        });
    };

    const costPerUnit = computed(() => {
      const val = props.data ? props.data.cost_per_item : null;
      return window.MT.utils.formatCurrency(val);
    });

    return {
      quantity,
      costPerUnit,
      snSelectRef,
      id: props.data.sid,
      notes: props.data.notes,
      partNo: props.data.part_no,
      imgLrg: props.data.imgUrlLarge,
      imgSrl: props.data.imgUrlSmall,
      unitWeight: props.data.unit_weight,
      machines: props.data.machines,
      categories: props.data.categories,
      description: props.data.description,
      relatedItems: props.data.related_items,
      onBuyNowRelatedClick,
      onAddToBasketRelatedClick,
      onBuyNowClick,
      onAddToBasketClick,
    };
  },
  template: `
    <div class="result">
        <a :href="imgLrg" :title="partNo + ' - ' + description" class="lc_lightbox_link spare-thumbnail">
            <img :src="imgSrl" :alt="description">
        </a>
        <div class="details">
            <h3 class="title">
                <div>
                    <span class="lbl">Part no:</span>
                    <span class="val">{{ partNo }}</span>
                </div>
                <div>
                    <span class="lbl">Description:</span>
                    <span class="val">{{ description }}</span>
                </div>
            </h3>
            <div v-if="machines && machines.length > 0" class="machines-wrapper">
                <h4 class="header">Machines:</h4>
                <ul class="machines-list">
                    <li v-for="(machine, index) in machines" :key="index">
                        <template v-if="machine.link">
                            <a :href="machine.link" :title="machine.name">{{ machine.name }}</a>
                        </template>
                        <template v-else>
                            <span>{{ machine.name }}</span>
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
                    <p v-for="(note, index) in notes" :key="index">
                        {{ note }}
                    </p>
                </div>
            </div>
            <div v-if="relatedItems && relatedItems.length > 0" class="related-items">
                <h4 class="header">Related items:</h4>
                <ul class="related-items-list">
                    <li v-for="(item, index) in relatedItems" :key="index">
                        <a :href="item.url" :title="item.part_no + ' - ' + item.description" class="lc_lightbox_link_text">{{ item.part_no }}</a>
                        <span>{{ item.description }}</span>
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
            <li>
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
