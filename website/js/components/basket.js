const { computed, onMounted } = Vue;

export default {
  props: {
    selection: Array,
  },
  emits: ["remove"],

  setup(props, { emit }) {
    const handleRemove = (option) => {
      emit("remove", option);
    };

    onMounted(() => {
      console.log("Basket mounted");
    });

    return {
      handleRemove,
    };
  },
  template: `
    <div v-if="selection.length" class="options-basket">
        <h2 class="title">Check your chosen specification / quote:</h2>
        
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Product name</th>
                    <th>Cost</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="option in selection" :key="option.id">
                    <td class="imagery"><img :src="option.image_url" :alt="option.title" class="image"></td>
                    <td class="name">
                      <span>{{ option.title }}</span>
                      <span class="desktop-only">{{ option.description }}</span>
                    </td>
                    <td class="price">{{ option.price }}</td>
                </tr>
            </tbody>
        </table>

        <div class="basket-total">
          <span>Total:</span>
          <span class="total-price">
            {{ selection.reduce((total, option) => total + parseFloat(option.price.replace(/[^0-9.-]+/g, "")), 0).toLocaleString("en-US", { style: "currency", currency: "USD" }) }}
          </span>
        </div>

    </div>
  `,
};
