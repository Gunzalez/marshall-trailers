const { computed, onMounted } = Vue;

export default {
  props: {
    specifications: Object,
  },
  emits: ["more-details-click", "not-my-marshall-click"],
  setup(props) {
    const formattedSpecifications = computed(() => {
      return Object.entries(props.specifications).map(([name, value]) => {
        return { name, value };
      });
    });

    return {
      formattedSpecifications,
    };
  },
  template: `
    <div class="serial-specs">
      <table class="specs-table">
          <tbody>
            <tr v-for="(spec, index) in formattedSpecifications" :key="index">
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
