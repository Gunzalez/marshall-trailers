const { computed, ref, watch, onMounted } = Vue;

export default {
  props: {
    option: Object,
  },
  emits: ["option-click"],
  setup(props, { emit }) {
    const option = ref(null);

    const convertedPrice = computed(() => {
      if (option.value && option.value.price) {
        return window.MT.utils.formatCurrency(option.value.price);
      }
      return option.value.price;
    });

    const isDisabled = computed(() => {
      return (
        option.value &&
        (option.value.messages.length > 0 || option.value.combos.length > 0)
      );
    });

    const combinedMessages = computed(() => {
      if (option.value) {
        const messages = option.value.messages || [];
        const combos = option.value.combos || [];
        return [...messages, ...combos];
      }
      return [];
    });

    const handleClick = () => {
      if (!isDisabled.value) {
        emit("option-click", props.option);
      }
    };

    watch(
      () => props.option,
      (newOption) => {
        option.value = newOption;
      },
      { deep: true },
    );

    onMounted(() => {
      option.value = props.option;
    });

    return {
      option,
      isDisabled,
      convertedPrice,
      combinedMessages,
      handleClick,
    };
  },
  template: `
    <div v-if="option" class="option-card" @click.prevent="handleClick" :class="{ 'selected': option.isSelected, 'disabled': isDisabled }" role="button" :aria-disabled="isDisabled">
      <h5 class="line-clamp-2 title">{{ option.title }}</h5>

      <div class="details">
        <div class="image-copy-wrapper">
          <img v-if="option.image" :src="option.image" :alt="option.title" class="image" />
          <div v-else class="missing-image">Image Coming Soon</div>
          <div class="meta">
            <p class="price">{{ convertedPrice }}</p>
            <div v-if="option.sap_no" class="sub_meta">
                <span class="label">SAP No:</span>
                <span class="value">{{ option.sap_no }}</span>
            </div>
            <div v-if="option.retro_fit" class="sub_meta">
                <span class="label">Retro Fit:</span>
                <span class="value">{{ option.retro_fit }}</span>
            </div>
          </div>
        </div>
        <div class="copy-wrapper">
          <p class="text">{{ option.description }}</p>
        </div>
      </div>

      <div v-if="isDisabled" class="item-unavailable">
        <span>Action disabled</span>
      </div>
      <span v-else class="bttn" :class="{ 'btn_Add': !option.isSelected, 'btn_Remove': option.isSelected }">
        <template v-if="option.isSelected">
          <span class="white">Remove</span>
          <span class="white"><i class="fa-solid fa-minus"></i></span>
        </template>
        <template v-else>
          <span class="white">Click to add</span>
          <span class="white"><i class="fa-solid fa-plus"></i></span>
        </template>
      </span>

      <div v-if="isDisabled" class="disabled-messages">
          <p v-for="msg in combinedMessages" :key="msg.id" class="message">{{ msg.text }}</p>
      </div>

    </div>
  `,
};
