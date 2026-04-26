export default {
  props: {
    header: String,
  },
  setup(props) {
    return {
      props,
    };
  },
  template: `
    <div class="strikethrough-title">
      <h3>{{ props.header }}</h3>
    </div>
  `,
};
