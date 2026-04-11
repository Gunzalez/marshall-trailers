const {} = Vue;

export default {
  props: {
    specifications: Array,
  },
  emits: ["more-details-click", "not-my-marshall-click"],
  setup(props) {
    return {
      specifications: props.specifications,
    };
  },
  template: `
    <div class="serial-specs">
      <table class="specs-table">
          <tbody>
            <tr v-for="(spec, index) in specifications" :key="index">
              <th><span class="label">{{ spec.name }}</span></th>
              <td><span class="value">{{ spec.value }}</span></td>
            </tr>
          </tbody>
      </table>
      <div class="specs-actions">
        <a href="#" @click.prevent="$emit('more-details-click')" class="bttn btn_ToggleOptions Chevron-Right">More Details</a>
        <a href="#" @click.prevent="$emit('not-my-marshall-click')" class="body-link">Not Your Marshall?</a>
      </div>
    </div>
  `,
};
