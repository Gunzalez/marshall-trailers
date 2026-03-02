const { ref, onMounted } = Vue;

export default {
  name: "RecursiveContainer",
  props: {
    node: Object,
    depth: {
      type: Number,
      default: 1,
    },
  },
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
                    <span>
                        <strong :style="{ color: depth > 3 ? '#e67e22' : '#2c3e50' }">
                            {{ node.title }}
                        </strong>
                    </span>
                    <i class="fa-solid fa-chevron-right"></i>
                </div>
                <span class="underline"></span>
            </template>
            <div v-if="isOpen" class="container-content">
                <div v-if="node.product" class="product-card">
                    <div class="product-info">
                        <strong>{{ node.product.details }}</strong>
                        <span class="price">{{ node.product.price }}</span>
                    </div>
                </div>

                <div v-if="node.containers && node.containers.length">
                    <recursive-container 
                        v-for="(sub, idx) in node.containers" 
                        :key="idx" 
                        :node="sub" 
                        :depth="depth + 1">
                    </recursive-container>
                </div>
            </div>
        </div>
    `,
};
