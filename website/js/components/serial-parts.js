const { computed, ref, watch } = Vue;

export default {
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
        </div>
  `,
};
