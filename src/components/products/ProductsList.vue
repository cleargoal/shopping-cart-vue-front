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
                        <div class="col-12">
                            <div class="flex flex-column md:flex-row align-items-center p-3 w-full">
                                <img
                                    :src="'images/product/' + slotProps.data.image"
                                    :alt="slotProps.data.name"
                                    class="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5"
                                >
                                <div class="flex-1 text-center md:text-left">
                                    <div class="font-bold text-2xl">
                                        {{ slotProps.data.name }}
                                    </div>
                                    <div class="mb-3">
                                        {{ slotProps.data.description }}
                                    </div>
                                    <RatingMark
                                        :model-value="slotProps.data.rating"
                                        :readonly="true"
                                        :cancel="false"
                                        class="mb-2"
                                    />
                                    <div class="flex align-items-center">
                                        <i class="pi pi-tag mr-2" />
                                        <span class="font-semibold">{{ slotProps.data.category }}</span>
                                    </div>
                                </div>
                                <div class="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
                                    <span class="text-2xl font-semibold mb-2 align-self-center md:align-self-end">${{ normalPrice(slotProps.data.price) }}</span>
                                    <ButtonDefault
                                        icon="pi pi-shopping-cart"
                                        label="Add to Cart"
                                        :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'"
                                        class="mb-2"
                                        @click="addToCar(slotProps.data)"
                                    />
                                    <span :class="'product-badge status-'+slotProps.data.inventoryStatus.toLowerCase()">{{ slotProps.data.inventoryStatus }}</span>
                                </div>
                            </div>
                        </div>
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

    export default {
        components: {ProductCardGrid},
        data() {
            return {
                categoryHeader: '',
                dataviewValue: null,
                layout: 'grid',
                sortKey: null,
                sortOrder: null,
                sortField: null,
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
            this.ApiService = new ApiService();
            this.getProductsData();
        },
        methods: {
            normalPrice(val) {
                return (val/100).toFixed(2);
            },
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
                const prod = await this.ApiService.getCategoryProducts(this.$route.query.category); // .then((prod) => {
                this.categoryHeader = this.$route.query.category;
                this.dataviewValue = prod;
                await this.setHidePreloader();
                // });
            },
            ...mapActions('cartModule', ['addToCart']),
            ...mapActions('commonModule', ['setHidePreloader']),
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