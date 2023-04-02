<template>
  <div class="grid">
    <div class="col-12 md:col-10">
      <div class="card">
        <h3>Set Discount</h3>
        <div class="card">
          <div class="formgroup">
            <h5>Category/Product</h5>
            <p>Choose, are you setting discount for category or product?</p>
            <p>If you set product discount, chose category just for comfortable product choosing.</p>
          </div>
          <div class="formgroup-inline">
            <div class="field-radiobutton mb-0 mt-06">
              <radio-button id="category" name="option" value="category" v-model="discountEntity"></radio-button>
              <label for="category">Category</label>
            </div>
            <div class="field-radiobutton mb-0 mt-06">
              <radio-button id="product" name="option" value="product" v-model="discountEntity"></radio-button>
              <label for="product">Product</label>
            </div>
            <div class="field">
              <label for="category" class="p-sr-only">Category</label>
              <select v-model="dropdownValue" :options="categoriesList" optionLabel="name" placeholder="Select" />
            </div>
            <div class="field">
              <label for="product" class="p-sr-only">Product</label>
              <InputText id="product" type="text" placeholder="Product" :disabled="disableProduct"/>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="formgroup">
            <h5>% / Val</h5>
            <p>Choose, are you setting discount by value or percentage?</p>
          </div>
          <div class="formgroup-inline">
            <div class="field-radiobutton mb-0 mt-06">
              <radio-button id="percentage" name="option" value="percentage" v-model="discountType"></radio-button>
              <label for="percentage">Percentage</label>
            </div>
            <div class="field-radiobutton mb-0 mt-06">
              <radio-button id="value" name="option" value="value" v-model="discountType"></radio-button>
              <label for="value">Value</label>
            </div>
            <div class="field">
              <label for="amount" class="p-sr-only">Amount</label>
              <InputText id="amount" type="text" placeholder="Amount"/>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="formgroup">
            <h5>Expiration</h5>
            <p>Optional. If this discount has expiration date, set it.</p>
          </div>
          <div class="formgroup-inline flex title-group">
            <Calendar :showIcon="true" :showButtonBar="true" v-model="calendarValue" class="mr-2 calendar-flex"></Calendar>
            <span class="title-wrap">
              <InputText id="title" style="width: 100%;" type="text" placeholder="Title"/>
            </span>
          </div>
        </div>

        <div class="card">
          <div class="formgroup-inline">
            <Button label="Submit" class="mr-2 mb-2"></Button>
            <Button label="Close" class="p-button-secondary mr-2 mb-2"></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "primevue/radiobutton";
import {mapGetters, mapActions} from 'vuex';

export default {
  components: {RadioButton},
  data() {
    return {
      discountEntity: null,
      discountType: null,
      calendarValue: null,
      isProductDisabled: true,
      categoriesList: this.getCategoriesList,
      dropdownValue: null,
    }
  },
  computed: {
    disableProduct() {
      console.log('discountEntity', this.discountEntity);
      return this.discountEntity !== 'product';
    },
    ...mapGetters('categoryModule', ['getCategoriesList']),
  },
  methods: {
    ...mapActions('discountModule', []),
  },
  mounted() {
    console.log(this.getCategoriesList);
  },
}
</script>

<style>
.mt-06 {
  margin-top: 0.6rem;
}
.title-group {
  justify-content: space-between;
}
.title-wrap {
  display: flex;
  flex-grow: 10;
}
.calendar-flex {
  display: flex;
  flex-grow: 1;
}
</style>
