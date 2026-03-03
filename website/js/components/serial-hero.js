const {} = Vue;

import Specifications from "./serial-specs.js";

export default {
  components: {
    Specifications,
  },
  props: {
    data: Object,
    selectedCategoryKey: String,
  },
  emits: ["more-details-click", "category-click"],
  setup(props) {
    return {
      title: props.data.title,
      specifications: props.data.specifications,
      categories: props.data.categories,
    };
  },
  template: `
    <div>
        <div class="product-hero">
            <div class="section">
                <div class="copy-wrapper desktop-only">
                    <div class="inner-wrapper">
                        <Specifications :title="title" :specifications="specifications" @click="$emit('more-details-click')" />
                    </div>
                </div>
            </div>
        </div>

        <div class="mobile-only quick-specs-mobile">
            <div class="section">
                <Specifications :title="title" :specifications="specifications" @click="$emit('more-details-click')" />
            </div>
        </div>

        <div class="page-divider"></div>

        <div class="section body-copy">
            <h3 class="underlined stepped-title">
                <span class="step-number">Step 01:</span>
                <span>Select primary part category</span>
            </h3>
            <ul class="parts-categories-list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                <li v-for="(category, i) in categories" :key="i" class="category-item">
                    <a :href="category.key" :class="{ 'selected': selectedCategoryKey === category.key }" @click.prevent="$emit('category-click', category.key)">
                        {{ category.name }}
                    </a>
                </li>
            </ul>
        </div>
        
    </div>
  `,
};
