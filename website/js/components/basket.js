const { computed, onMounted, watch } = Vue;

export default {
  props: {
    options: Array,
    initialOption: Object, // The initial machine
  },

  setup(props) {
    const selection = computed(() => {
      if (props.initialOption) {
        return [
          props.initialOption,
          ...props.options.filter((option) => option.isSelected),
        ];
      }
      return props.options.filter((option) => option.isSelected);
    });

    onMounted(() => {
      console.log("Basket mounted");
    });

    watch(
      () => props.options,
      (newOptions) => {
        console.log("Options updated:", newOptions);
      },
      { deep: true },
    );

    return {
      selection,
    };
  },
  template: `
    <div v-if="options.length" class="options-basket">
        <div class="heading-wrapper">
          <div class="heading">
              <div class="action-step">Step 03.</div>
              <h2 class="title">Check your chosen specification / quote:</h2>
          </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th class="image-cell"></th>
                    <th class="name-cell">Product name</th>
                    <th class="price-cell">Cost</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="option in selection" :key="option.id">
                    <td class="image-cell"><img :src="option.image_url" :alt="option.title" class="image"></td>
                    <td class="name-cell">
                      <span>{{ option.title }}</span>
                      <span class="desktop-only description">{{ option.description }}</span>
                    </td>
                    <td class="price-cell">{{ option.price }}</td>
                </tr>
            </tbody>
        </table>

        <div class="basket-total">
          <span>Retail price total ex. VAT:</span>
          <span class="total-price">
            {{ selection.reduce((total, option) => total + parseFloat(option.price.replace(/[^0-9.-]+/g, "")), 0).toLocaleString("en-US", { style: "currency", currency: "GBP" }) }}
          </span>
        </div>

    </div>
  `,
};
