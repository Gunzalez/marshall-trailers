const { ref, onMounted, watch, computed } = Vue;

import ProductCard from "./serial-product.js";

export default {
  name: "RecursiveContainer",
  components: {
    ProductCard,
  },
  props: {
    node: Object,
    depth: {
      type: Number,
      default: 1,
    },
  },
  emits: ["buy-now-click", "add-to-basket-click"],
  setup(props) {
    const isListOpen = ref(false);
    const isBuyableOpen = ref(false);

    watch(
      () => props.node,
      () => {
        isListOpen.value = false;
        isBuyableOpen.value = false;
      },
    );

    const toggleBuyable = () => {
      isBuyableOpen.value = !isBuyableOpen.value;
    };

    const toggleList = () => {
      isListOpen.value = !isListOpen.value;
    };

    const hasChildren = computed(() => {
      return props.node.children && props.node.children.length > 0;
    });

    return {
      props,
      isListOpen,
      hasChildren,
      isBuyableOpen,
      toggleList,
      toggleBuyable,
    };
  },
  template: `
        <div class="container-wrapper" :class="{ ['level-' + props.depth]: true, buyableOpen: isBuyableOpen, listOpen: isListOpen }">
            <div class="container-header">
                <template v-if="node.is_buyable">
                    <div class="item-title product-title">
                        <span class="part_no">Part: {{ node.part_no }}</span>
                        <span>{{ node.title }}</span>
                    </div>
                </template>
                <template v-else>
                    <span class="item-title list-title">{{ node.title }}</span>
                </template>

                <div class="actions">
                    <button type="button" class="toggle-button" :disabled="!node.is_buyable" :class="{ open: isBuyableOpen, disabled: !node.is_buyable }" @click.prevent="toggleBuyable">
                        <i v-if="!isBuyableOpen" class="fa-solid fa-chevron-right"></i>
                        <i v-else class="fa-solid fa-chevron-down"></i>
                    </button>
                    <button type="button" class="toggle-button" :disabled="!hasChildren" :class="{ open: isListOpen, disabled: !hasChildren }" @click.prevent="toggleList">
                        <i v-if="!isListOpen" class="fa-solid fa-bars"></i>
                        <i v-else class="fa-solid fa-xmark text-xl"></i>
                    </button>
                </div>
            </div>
            <span class="underline"></span>
            <div class="container-content">
                
                <ProductCard v-show="node.is_buyable && isBuyableOpen"
                    :id="node.id" 
                    :part_no="node.part_no" 
                    :title="node.title" 
                    :price="node.price" 
                    :weight="node.weight" 
                    :quantity="node.quantity"
                    :imageLarge="node.imageLarge" 
                    :imageSmall="node.imageSmall" 
                    :is_buyable="node.is_buyable"
                    @buy-now-click="$emit('buy-now-click', $event)"
                    @add-to-basket-click="$emit('add-to-basket-click', $event)" />

                <div v-show="hasChildren && isListOpen" class="children-containers">
                    <recursive-container 
                        v-for="(child, idx) in node.children" 
                        :key="idx" 
                        :node="child" 
                        :depth="depth + 1"
                        @buy-now-click="$emit('buy-now-click', $event)"
                        @add-to-basket-click="$emit('add-to-basket-click', $event)">
                    </recursive-container>
                </div>

            </div>
        </div>
    `,
};
