<template>
    <div class="col-12">
        <div class="flex flex-column md:flex-row align-items-center p-3 w-full">
            <img
                :src="data.image"
                :alt="data.name"
                class="my-4 md:my-0 w-9 md:w-15rem shadow-2 mr-5"
            >
            <div class="flex-1 text-center md:text-left">
                <div class="font-bold text-2xl">
                    {{ data.name }}
                </div>
                <div class="mb-3">
                    {{ data.description }}
                </div>
                <RatingMark
                    :model-value="data.rating"
                    :readonly="true"
                    :cancel="false"
                    class="mb-2"
                />
                <div class="flex align-items-center">
                    <i class="pi pi-tag mr-2" />
                    <span class="font-semibold">{{ data.category }}</span>
                </div>
            </div>
            <div class="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
                <span class="text-2xl font-semibold mb-2 align-self-center md:align-self-end">${{ normalizePrice(data.price) }}</span>
                <ButtonDefault
                    icon="pi pi-shopping-cart"
                    label="Add to Cart"
                    :disabled="data.inventoryStatus === 'OUTOFSTOCK'"
                    class="mb-2"
                    @click="addToCart(data)"
                />
                <span :class="'product-badge status-'+data.inventoryStatus.toLowerCase()">{{ data.inventoryStatus }}</span>
            </div>
        </div>
    </div>
</template>
<script>
    import {normalPrice} from "../../utils/functions";
    export default {
        name: "ProductCardList",
        props: {
            data:
                {
                    type: Object,
                    default: null,
                },
        },
        data() {
            return {
                normPrice: normalPrice(),
            };
        },
        methods: {
            normalizePrice(value) {
                return normalPrice(value);
            },
        },
    }
</script>

<style scoped>

</style>