const { computed, onMounted, watch } = Vue;

export default {
  props: {
    options: Array,
    initialOption: Object,
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

    const totalPrice = computed(() => {
      const value = selection.value.reduce((total, option) => {
        const price = parseFloat(option.price.replace(/[^0-9.-]+/g, ""));
        return total + (isNaN(price) ? 0 : price);
      }, 0);
      return window.MT.utils.formatCurrency(value);
    });

    const convertedPrice = (price) => {
      const value = parseFloat(price.replace(/[^0-9.-]+/g, ""));
      return isNaN(value) ? price : window.MT.utils.formatCurrency(value);
    };

    return {
      selection,
      totalPrice,
      convertedPrice,
    };
  },
  template: `
    <div v-if="options.length" class="options-basket">
        <div class="heading-wrapper">
          <div class="heading">
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
                    <td class="image-cell">
                      <img :src="option.image_url" :alt="option.title" class="image">
                    </td>
                    <td class="name-cell">
                      <span>{{ option.title }}</span>
                      <span class="desktop-only description">{{ option.description }}</span>
                    </td>
                    <td class="price-cell">{{ convertedPrice(option.price) }}</td>
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
