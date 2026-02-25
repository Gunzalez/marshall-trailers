const { computed, ref, watch } = Vue;

export default {
  props: {
    option: Object,
    isSelected: Boolean,
    messages: Array, // { id: String, text: String }[]
  },
  emits: ["click"],

  setup(props, { emit }) {
    const option = ref(props.option);

    const handleClick = () => {
      if (props.messages.length === 0) {
        emit("click", props.option);
      }
    };

    const convertedPrice = computed(() => {
      if (option.value && option.value.price) {
        return window.MT.utils.formatCurrency(option.value.price);
      }
      return option.value.price;
    });

    const isDisabled = computed(() => {
      return props.messages.length > 0;
    });

    watch(
      () => props.option,
      (newOption) => {
        option.value = newOption;
      },
      { deep: true },
    );

    return {
      option,
      isDisabled,
      handleClick,
      convertedPrice,
    };
  },
  template: `
    <div class="option-card" @click.prevent="handleClick" :class="{ 'selected': option.isSelected, 'disabled': isDisabled }" role="button" :aria-disabled="isDisabled">
      <h5 class="line-clamp-2 title">{{ option.title }}</h5>

      <div class="details">
        <div class="image-copy-wrapper">
          <img :src="option.image_url" :alt="option.title" class="image" />
          <div class="meta">
            <div class="option_no">
                <span class="label">Option No:</span>
                <span class="value">{{ option.option_no }}</span>
            </div>
            <p class="price">{{ convertedPrice }}</p>
          </div>
        </div>
        <div class="copy-wrapper">
          <p class="text">{{ option.description }}</p>
        </div>
      </div>

      <span class="bttn" :class="{ 'btn_Add': !option.isSelected, 'btn_Remove': option.isSelected }">
        <template v-if="option.isSelected">
          <span>Remove</span>
          <i class="fa-solid fa-minus"></i>
        </template>
        <template v-else>
          <span>Click to add</span>
          <i class="fa-solid fa-plus"></i>
        </template>
      </span>

      <div v-if="isDisabled" class="option-card-overlay">
        <div class="overlay-content">
          <p v-for="msg in messages" :key="msg.id" class="message">{{ msg.text }}</p>
        </div>
      </div>

    </div>
  `,
};
