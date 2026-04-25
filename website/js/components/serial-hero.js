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
  emits: ["more-details-click", "category-click", "not-my-marshall-click"],
  setup(props) {
    const heroStyle = computed(() => {
      return {
        backgroundImage: props.data.image
          ? `url('${props.data.image}')`
          : "none",
      };
    });

    return {
      heroStyle,
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
                        <Specification :specification="specification" @more-details-click="$emit('more-details-click')" @not-my-marshall-click="$emit('not-my-marshall-click')" />
                    </div>
                </div>
            </div>
        </div>

        <div class="mobile-only quick-specs-mobile">
            <div class="section">
                <Specification :specification="specification" @more-details-click="$emit('more-details-click')" @not-my-marshall-click="$emit('not-my-marshall-click')" />
            </div>
        </div>

        <div class="page-divider"></div>

        <div class="section">
            <h2 class="stepped-title deep-underline">
                <span class="step-number">Step 01:</span>
                <span>Select primary part category</span>
            </h2>
            <ul class="parts-categories-list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                <li v-for="category in categories" :key="category.id" class="category-item flex">
                    <a 
                        :href="category.id" 
                        class="w-full category-link"
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
