const { computed, ref, watch } = Vue;

import RecursiveContainer from "./serial-recursive.js";

export default {
  components: {
    RecursiveContainer,
  },
  props: {
    parts: Object,
  },
  emits: ["part-click"],
  setup(props) {
    console.log(props.parts);
    return {
      parts: props.parts,
    };
  },
  template: `
    <div class="section body-copy">
        <h3 class="underlined">Select secondary part category</h3>
        <RecursiveContainer :node="parts" :depth="1"></RecursiveContainer>
    </div>
  `,
};
