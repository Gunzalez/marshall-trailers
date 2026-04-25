const { computed, onMounted } = Vue;

export default {
  props: {
    specification: Array,
  },
  emits: ["more-details-click", "not-my-marshall-click"],
  setup(props, { emit }) {
    return {
      props,
    };
  },
  template: `
    <div class="serial-specs">
      <table class="specs-table">
          <tbody>
            <tr v-for="(spec, index) in props.specification" :key="index">
              <th valign="top"><span class="label">{{ spec.name }}</span></th>
              <td valign="top"><span class="value">{{ spec.value }}</span></td>
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
