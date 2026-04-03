const { ref, watch, nextTick } = Vue;

import RecursiveContainer from "./serial-recursive.js";

export default {
  components: {
    RecursiveContainer,
  },
  props: {
    parts: Object || null,
  },
  emits: ["buy-now-click", "add-to-basket-click"],
  setup(props) {
    const parts = ref(null);
    const secondaryPartCategory = ref(null);

    const scrollToSecondaryPartCategory = async () => {
      await nextTick();
      secondaryPartCategory.value.scrollIntoView({ behavior: "smooth" });
    };

    watch(
      () => props.parts,
      (newParts) => {
        parts.value = newParts;
        if (newParts) {
          scrollToSecondaryPartCategory();
        }
      },
      { deep: true },
    );

    return {
      parts,
      secondaryPartCategory,
    };
  },
  template: `
    <div v-if="parts" class="section">
        <h2 id="secondary-part-category" class="underlined stepped-title" ref="secondaryPartCategory">
            <span class="step-number">Step 02:</span>
            <span>Select secondary part category</span>
        </h2>
        <form id="serial-parts-form" class="form">
          <RecursiveContainer :node="parts" :depth="1"
            @buy-now-click="$emit('buy-now-click', $event)"
            @add-to-basket-click="$emit('add-to-basket-click', $event)" />
        </form>
    </div>
  `,
};
