const { computed, ref, watch } = Vue;

import RecursiveContainer from "./serial-recursive.js";

export default {
  components: {
    RecursiveContainer,
  },
  props: {
    parts: Object,
  },
  emits: ["buy-now-click", "add-to-basket-click"],
  setup(props) {
    console.log(props.parts);
    return {
      parts: props.parts,
    };
  },
  template: `
    <div class="section body-copy">
        <h3 id="secondary-part-category" class="underlined stepped-title">
            <span class="step-number">Step 02:</span>
            <span>Select secondary part category</span>
        </h3>

        <form id="serial-parts-form" class="form">
          <RecursiveContainer :node="parts" :depth="1"
            @buy-now-click="$emit('buy-now-click', $event)"
            @add-to-basket-click="$emit('add-to-basket-click', $event)" />
        </form>
    </div>
  `,
};
