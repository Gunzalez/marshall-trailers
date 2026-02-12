const { computed, onMounted } = Vue;

export default {
  props: {
    option: Object,
    selected: Array,
  },
  emits: ["add", "remove"],

  setup(props, { emit }) {
    onMounted(() => {
      console.log("OptionCard mounted with option:", props.option);
    });

    const isSelected = computed(() => {
      return props.selected.some((option) => option.id === props.option.id);
    });

    const handleClick = () => {
      if (isSelected.value) {
        emit("remove", props.option);
      } else {
        emit("add", props.option);
      }
    };

    return {
      isSelected,
      handleClick,
    };
  },
  template: `
    <div class="option-card disabled">
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

      <button v-if="isSelected" class="bttn btn_Remove" @click.prevent="handleClick">
        <span>Remove</span>
        <i class="fa-solid fa-minus"></i>
      </button>
      <button v-else class="bttn btn_Add" @click.prevent="handleClick">
        <span>Add to basket</span>
        <i class="fa-solid fa-plus"></i>
      </button>

    </div>
  `,
};
