const { computed, onMounted } = Vue;

export default {
  props: {
    selection: Array,
  },

  setup() {
    onMounted(() => {
      console.log("Basket mounted");
    });
  },
  template: `
    <div v-if="selection.length" class="options-basket">
        <div class="heading-wrapper">
          <div class="heading">
              <div class="action-step">Step 03.</div>
              <h2 class="title">Check your chosen specification / quote:</h2>
          </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Product name</th>
                    <th class="price">Cost</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="option in selection" :key="option.id">
                    <td class="imagery"><img :src="option.image_url" :alt="option.title" class="image"></td>
                    <td class="name">
                      <span>{{ option.title }}</span>
                      <span class="desktop-only description">{{ option.description }}</span>
                    </td>
                    <td class="price">{{ option.price }}</td>
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
