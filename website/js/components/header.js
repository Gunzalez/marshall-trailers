const { computed, ref, watch } = Vue;

export default {
  props: {
    header: String,
  },
  setup(props) {
    return {
      header: props.header,
    };
  },
  template: `
    <div class="group-title">
      <h3>{{ header }}</h3>
    </div>
  `,
};
