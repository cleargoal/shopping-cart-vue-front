<template>
    <div class="card m-3 border-1 surface-border">
        <div class="flex align-items-center justify-content-between">
            <div class="flex align-items-center">
                <i class="pi pi-tag mr-2" />
                <span class="font-semibold">{{ data.category }}</span>
            </div>
            <span
                class="product-badge"
                :class="bColor"
            >{{ data.inventoryStatus }}</span>
        </div>
        <div class="text-center">
            <img
                :src="data.image"
                :alt="data.name"
                class="w-12 shadow-2 my-3 mx-0"
            >
            <div class="text-2xl font-bold">
                {{ data.name }}
            </div>
            <div
                style="max-height: 2.3rem; overflow: hidden; text-overflow: ellipsis;"
                :title="data.description"
            >
                {{ data.description }}
            </div>
            <RatingMark
                :model-value="data.rating"
                :readonly="true"
                :cancel="false"
            />
        </div>
        <div class="flex align-items-center justify-content-between">
            <span class="text-2xl font-semibold">${{ normalPrice(data.price) }}</span>
            <span class="flex">
                <span class="min-w-min line-height-1 max-w-5rem mr-2">Add item or increase quantity</span>
                <ButtonDefault
                    icon="pi pi-shopping-cart"
                    :disabled="data.inventoryStatus === 'OUTOFSTOCK'"
                    @click="addToCart(data)"
                />
            </span>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: "ProductCardGrid",
        props: {
            data:
                {
                    type: Object,
                    default: null,
                },
        },
        computed: {
            bColor() {
                return this.data.inventoryStatus ? 'status-' + this.data.inventoryStatus.toLowerCase() : '';
            },
        },
        methods: {
            normalPrice(val) {
                return (val/100).toFixed(2);
            },
            ...mapActions('cartModule', ['addToCart']),

        }
    }
</script>

<style lang="scss" scoped>
</style>