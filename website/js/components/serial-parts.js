const { ref, watch, nextTick } = Vue;

import RecursiveContainer from "./serial-recursive.js";

export default {
  components: {
    RecursiveContainer,
  },
  props: {
    selectedCategoryName: String,
    parts: Object || null,
  },
  emits: ["buy-now-click", "add-to-basket-click"],
  setup(props) {
    const parts = ref(null);
    const scrollRef = ref(null);
    const selectedCategoryName = ref("");

    const scrollToSecondaryPartCategory = async () => {
      await nextTick();
      scrollRef.value.scrollIntoView({ behavior: "smooth" });
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

    watch(
      () => props.selectedCategoryName,
      (newName) => {
        selectedCategoryName.value = newName;
      },
    );

    return {
      parts,
      scrollRef,
      selectedCategoryName,
    };
  },
  template: `
    <div v-if="parts" class="section">
        <h2 id="secondary-part-category" class="stepped-title deep-underline" ref="scrollRef">
            <span class="step-number">Step 02:</span>
            <span>Select secondary part category</span>
        </h2>
        <form id="serial-parts-form" class="form serial-parts-form">
          <div class="strikethrough-title">
              <h3 class="main-title">{{ selectedCategoryName }}: {{ parts.length }} result{{ parts.length !== 1 ? 's' : '' }} found.</h3>
          </div>
          <RecursiveContainer v-for="(part, index) in parts" :key="index" :node="part" :depth="1"
            @buy-now-click="$emit('buy-now-click', $event)"
            @add-to-basket-click="$emit('add-to-basket-click', $event)" />
        </form>
    </div>
  `,
};
