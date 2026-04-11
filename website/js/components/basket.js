const { computed, watch, ref } = Vue;

export default {
  props: {
    selectedOptions: Array,
    initialOption: Object,
  },

  setup(props) {
    const selection = computed(() => {
      if (props.initialOption) {
        return [props.initialOption, ...props.selectedOptions];
      }
      return props.selectedOptions;
    });

    const totalPrice = computed(() => {
      const value = selection.value.reduce((total, option) => {
        const price = parseFloat(option.price.replace(/[^0-9.-]+/g, ""));
        return total + (isNaN(price) ? 0 : price);
      }, 0);
      return window.MT.utils.formatCurrency(value);
    });

    const formatPriceToCurrency = (price) => {
      const value = parseFloat(price.replace(/[^0-9.-]+/g, ""));
      return isNaN(value) ? price : window.MT.utils.formatCurrency(value);
    };

    return {
      selection,
      totalPrice,
      formatPriceToCurrency,
    };
  },
  template: `
    <div v-if="selection.length" class="options-basket">
        <div class="heading-wrapper">
          <div class="heading">
              <h2 class="title stepped-title">
                  <span class="step-number">Step 03:</span>
                  <span>Check your chosen specification / quote:</span>
              </h2>
          </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th class="image-cell">Image</th>
                    <th class="name-cell">Product name</th>
                    <th class="price-cell">Cost</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="option in selection" :key="option.id">
                    <td class="image-cell">
                      <img :src="option.image_url" :alt="option.title" class="image">
                    </td>
                    <td class="name-cell">
                      <span>{{ option.title }}</span>
                    </td>
                    <td class="price-cell">{{ formatPriceToCurrency(option.price) }}</td>
                </tr>
            </tbody>
        </table>
        <div class="basket-total">
          <span>Retail price total ex. VAT:</span>
          <span class="total-price">
            {{ totalPrice }}
          </span>
        </div>
    </div>
  `,
};
