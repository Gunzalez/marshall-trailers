const { computed, onMounted } = Vue;

export default {
  props: {
    specification: Array,
  },
  emits: ["not-my-marshall-click"],
  setup(props, { emit }) {
    return {
      props,
    };
  },
  template: `
    <div class="serial-specs">
      <div class="serial-specs-wrapper">
        <div class="specs-table-wrapper">
            <table class="specs-table">
              <tbody>
                <tr v-for="(spec, index) in props.specification" :key="index">
                  <th valign="top"><span class="label">{{ spec.name }}</span></th>
                  <td valign="top"><span class="value">{{ spec.value }}</span></td>
                </tr>
              </tbody>
            </table>
            <div id="scroll-anchor"></div>
        </div>
        <div class="scroll-indicator"></div>
      </div>
      <div class="specs-actions">
        <a href="#" @click.prevent="$emit('not-my-marshall-click')" class="bttn btn_ToggleOptions Chevron-Right">Not My Marshall?</a>
      </div>
    </div>
  `,
};
