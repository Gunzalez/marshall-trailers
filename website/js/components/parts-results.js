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

    watch(
      () => props.data,
      async (newResults) => {
        results.value = newResults;
        if (newResults && newResults.length) {
          await nextTick();
          window.MT.global.init();
        }
      },
      { deep: true },
    );

    return {
      results,
    };
  },
  template: `
    <div v-if="results">
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
