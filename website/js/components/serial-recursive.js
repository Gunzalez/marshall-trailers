const { ref, onMounted } = Vue;

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
    const isOpen = ref(false);
    const isTopLevel = ref(props.depth === 1);
    const toggle = () => {
      isOpen.value = !isOpen.value;
    };

    onMounted(() => {
      if (isTopLevel.value) {
        isOpen.value = true;
      }
    });

    return { isOpen, toggle, isTopLevel, props };
  },
  template: `
        <div class="container-wrapper" :class="{ 'top-level': isTopLevel }">
            <template v-if="isTopLevel">
                <div class="fixed-header">
                    <div class="strikethrough-title">
                        <h3>{{ node.title }}</h3>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="container-header" @click="toggle" :class="{ open: isOpen }">
                    <div>
                        <div v-if="node.product">
                            <div class="product-title">
                                <span class="part_no">Part No: {{ node.product.part_no }}</span>
                                <strong>{{ node.product.description }}</strong>
                            </div>
                        </div>
                        <div v-else>
                            <span class="container-title">{{ node.title }}</span>
                        </div>
                    </div>
                    <i class="fa-solid fa-chevron-right"></i>
                </div>
                <span class="underline"></span>
            </template>
            <div v-if="isOpen" class="container-content">
                
                <ProductCard v-if="node.product" :product="node.product"
                    @buy-now-click="$emit('buy-now-click', $event)"
                    @add-to-basket-click="$emit('add-to-basket-click', $event)" />

                <div v-if="node.containers && node.containers.length">
                    <recursive-container 
                        v-for="(sub, idx) in node.containers" 
                        :key="idx" 
                        :node="sub" 
                        :depth="depth + 1"
                        @buy-now-click="$emit('buy-now-click', $event)"
                        @add-to-basket-click="$emit('add-to-basket-click', $event)">
                    </recursive-container>
                </div>
            </div>
        </div>
    `,
};
