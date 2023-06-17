<template>
    <div class="grid">
        <div class="col-12">
            <div class="card xs:non-padding">
                <DataView
                    :value="dataviewValue"
                    :layout="layout"
                    :paginator="true"
                    :rows="9"
                    :sort-order="sortOrder"
                    :sort-field="sortField"
                >
                    <template #header>
                        <div class="flex justify-content-between">
                            <h2 style="text-transform: capitalize;">
                                {{ categoryHeader }}
                            </h2>
                            <div class="flex align-content-center">
                                <div class="col-6 text-left">
                                    <DropdownList
                                        v-model="sortKey"
                                        :options="sortOptions"
                                        option-label="label"
                                        placeholder="Sort By:"
                                        @change="onSortChange($event)"
                                    />
                                </div>
                                <div class="col-6 text-right xs:hidden">
                                    <DataViewLayoutOptions v-model="layout" />
                                </div>
                            </div>
                        </div>
                    </template>
                    <template #list="slotProps">
                        <product-card-list
                            :data="slotProps.data"
                        />
                    </template>

                    <template #grid="slotProps">
                        <div class="col-12 md:col-4">
                            <product-card-grid
                                :data="slotProps.data"
                            />
                        </div>
                    </template>
                </DataView>
            </div>
        </div>
    </div>
</template>

<script>
    import ApiService from "../../service/ApiService";
    import { mapActions } from 'vuex';
    import ProductCardGrid from "./ProductCardGrid.vue";
    import ProductCardList from "./ProductCardList.vue";

    export default {
        components: {ProductCardGrid, ProductCardList},
        data() {
            return {
                categoryHeader: '',
                dataviewValue: null,
                layout: 'grid',
                sortKey: null,
                sortOrder: null,
                sortField: null,
                category: null,
                sortOptions: [
                    {label: 'Price: High to Low', value: '!price'},
                    {label: 'Price: Low to High', value: 'price'},
                    {label: 'Rating: High to Low', value: '!rating'},
                    {label: 'Rating: Low to High', value: 'rating'},
                    {label: 'Stock: In stock first', value: 'inventoryStatus'},
                    {label: 'Stock: Out of stock first', value: '!inventoryStatus'},
                    {label: 'Name: A - Z', value: 'name'},
                    {label: 'Name: Z - A', value: '!name'},
                ]
            }
        },
        ApiService: null,
        computed: {
        },
        watch: {
            $route() {
                this.getProductsData();
            },
        },
        created() {
            this.setShowPreloader();
            this.ApiService = new ApiService();
            this.getProductsData();
        },
        methods: {
            onSortChange(event){
                const value = event.value.value;
                const sortValue = event.value;

                if (value.indexOf('!') === 0) {
                    this.sortOrder = -1;
                    this.sortField = value.substring(1, value.length);
                    this.sortKey = sortValue;
                }
                else {
                    this.sortOrder = 1;
                    this.sortField = value;
                    this.sortKey = sortValue;
                }
            },
            async getProductsData() {
                this.category = this.$route.params.category;
                const prod = await this.ApiService.getCategoryProducts(this.category);
                this.categoryHeader = this.$route.label;
                this.dataviewValue = prod;
                await this.setHidePreloader();
            },
            ...mapActions('cartModule', ['addToCart']),
            ...mapActions('commonModule', ['setHidePreloader', 'setShowPreloader']),
        },
    }
</script>
<style scoped>
@media(max-width: 600px) {
    .xs\:hidden {
        display: none;
    }
    .xs\:non-padding {
        padding: 0;
    }
}</style>