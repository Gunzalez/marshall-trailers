const { computed } = Vue;

import Specification from "./serial-specs.js";

export default {
  components: {
    Specification,
  },
  props: {
    data: Object,
    selectedCategoryId: String,
  },
  emits: ["category-click", "not-my-marshall-click"],
  setup(props) {
    const imageSrc = computed(() => {
      return (props.data && props.data.image_url) || "images/cutout-qm8.png";
    });

    const imageAlt = computed(() => {
      return props.data.title;
    });

    return {
      imageSrc,
      imageAlt,
      specification: props.data.specification,
      categories: props.data.categories,
    };
  },
  template: `
    <div>
        <div class="product-hero">
            <div class="product-hero-bg"></div>
            <div class="section">
                <div class="copy-wrapper serial-number-copy desktop-only">
                    <div class="inner-wrapper">
                        <Specification :specification="specification" @not-my-marshall-click="$emit('not-my-marshall-click')" />
                    </div>
                </div>
                <img :src="imageSrc" class="cut-out" :alt="imageAlt" />
            </div>
        </div>

        <div class="mobile-only quick-specs-mobile">
            <div class="section">
                <Specification :specification="specification" @not-my-marshall-click="$emit('not-my-marshall-click')" />
            </div>
        </div>

        <div class="page-divider"></div>

        <div class="section">
            <h2 class="stepped-title deep-underline">
                <span class="step-number">Step 01:</span>
                <span>Select primary part category</span>
            </h2>
            <ul class="parts-categories-list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                <li v-for="category in categories" :key="category.id">
                    <a 
                        :href="category.id"
                        :title="category.category_name"
                        :class="[{ 'selected': selectedCategoryId === category.id}]"    
                        @click.prevent="$emit('category-click', category)"
                    >
                        {{ category.category_name }}
                    </a>
                </li>
            </ul>
        </div>
        
    </div>
  `,
};
