const {} = Vue;

export default {
  props: {
    title: String,
    specifications: Array,
  },
  emits: ["more-details-click"],
  setup(props) {
    return {
      title: props.title,
      specifications: props.specifications,
    };
  },
  template: `
    <div class="quick-specs block-level">
        <div class="specs-content">
            <h1 class="title">{{ title }}</h1>
            <ul>
                <li v-for="(spec, index) in specifications" :key="index">
                    <span class="label">{{ spec.name }}</span>
                    <span class="value">{{ spec.value }}</span>
                </li>
            </ul>
            <div class="more-details">
                <a href="#" @click.prevent="$emit('more-details-click')">More Details</a>
            </div>
        </div>
    </div>
  `,
};
