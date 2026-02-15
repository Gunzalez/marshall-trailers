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
      emit("click", props.option);
    };

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
    };
  },
  template: `
    <div class="option-card" :class="{ 'selected': option.isSelected, 'disabled': isDisabled }">
      <h5 class="line-clamp-2 title">{{ option.title }}</h5>

      <div class="details">
        <div class="image-copy-wrapper">
          <img :src="option.image_url" :alt="option.title" class="image" />
          <div class="option_no">
              <span class="label">Option No:</span>
              <span class="value">{{ option.option_no }}</span>
          </div>
          <p class="price">{{ option.price }}</p>
        </div>
        <div class="copy-wrapper">
          <p class="text">{{ option.description }}</p>
        </div>
      </div>

      <button class="bttn" @click.prevent="handleClick" :disabled="isDisabled" :class="{ 'btn_Add': !option.isSelected, 'btn_Remove': option.isSelected }">
        <template v-if="option.isSelected">
          <span>Remove</span>
          <i class="fa-solid fa-minus"></i>
        </template>
        <template v-else>
          <span>Add to basket</span>
          <i class="fa-solid fa-plus"></i>
        </template>
      </button>

      <div v-if="isDisabled" class="option-card-overlay">
        <div class="overlay-content">
          <span v-for="msg in messages" :key="msg.id">{{ msg.text }}</span>
        </div>
      </div>

    </div>
  `,
};
