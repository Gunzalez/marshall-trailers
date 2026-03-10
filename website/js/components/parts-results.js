const { ref, watch, nextTick } = Vue;

import PartsResult from "./parts-result.js";

export default {
  components: {
    PartsResult,
  },
  props: {
    data: Array || null,
  },
  emits: ["buy-now-click", "add-to-basket-click"],
  setup(props) {
    const results = ref(null);
    const sectionRef = ref(null);

    const scrollToSection = async () => {
      await nextTick();
      sectionRef.value.scrollIntoView({ behavior: "smooth" });
    };

    watch(
      () => props.data,
      async (newResults) => {
        results.value = newResults;
        if (newResults && newResults.length) {
          scrollToSection();

          await nextTick();
          window.MT.global.init();
        }
      },
      { deep: true },
    );

    return {
      results,
      sectionRef,
    };
  },
  template: `
    <div v-if="results" ref="sectionRef" class="parts-results-section">

        <h2 class="results-title">
          <span class="count">{{ results.length }}</span>
          <span class="text">Item{{ results.length === 1 ? '' : 's'}} found.</span>
        </h2>

        <div class="result-items">
          <PartsResult v-for="(result, index) in results" 
            :key="index" 
            :data="result" 
            @buy-now-click="$emit('buy-now-click', $event)" 
            @add-to-basket-click="$emit('add-to-basket-click', $event)" />
        </div>
        
    </div>
  `,
};
