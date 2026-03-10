const { computed, ref } = Vue;

export default {
  props: {
    data: Object,
  },
  emits: ["buy-now-click", "add-to-basket-click"],
  setup(props, { emit }) {
    const quantity = ref(1);
    const snSelectRef = ref(null);

    const onBuyNowClick = () => {
      props.data &&
        emit("buy-now-click", {
          id: props.data.id,
          quantity: quantity.value,
          unit_price: props.data.unit_price,
        });
    };

    const onAddToBasketClick = () => {
      props.data &&
        emit("add-to-basket-click", {
          id: props.data.id,
          quantity: quantity.value,
          unit_price: props.data.unit_price,
        });
    };

    const costPerPrice = computed(() => {
      const val = props.data ? props.data.cost_per_item : null;
      return window.MT.utils.formatCurrency(val);
    });

    return {
      quantity,
      costPerPrice,
      snSelectRef,
      id: props.data.id,
      notes: props.data.notes,
      partNo: props.data.part_no,
      imgLrg: props.data.imgUrlLarge,
      imgSrl: props.data.imgUrlSmall,
      unitWeight: props.data.unit_weight,
      machines: props.data.machines,
      categories: props.data.categories,
      description: props.data.description,
      relatedItems: props.data.related_items,
      onBuyNowClick,
      onAddToBasketClick,
    };
  },
  template: `
    <div class="result">
        <a :href="imgLrg" class="lc_lightbox_link spare-thumbnail">
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
                        <a :href="item.url" class="lc_lightbox_link_text">{{ item.part_no }}</a>
                        <span>{{ item.description }}</span>
                        <button type="button" @click.prevent="" class="btn_addBasket bttn">
                            <span class="icon">
                                <i class="fa-solid fa-cart-shopping"></i>
                            </span>
                            <span>Add</span>
                        </button>
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
                <span class="lbl">Cost per item:</span>
                <span class="val price">{{ costPerPrice }}</span>
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
                <button class="btn_addBasket bttn" @click.prevent="onAddToBasketClick">
                    <span class="icon">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </span>
                    <span>Add</span>
                </button>
            </li>
        </ul>
    </div>
  `,
};
