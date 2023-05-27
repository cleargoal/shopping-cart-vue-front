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
            <div class="flex">
                <div
                    class="mb-3 overflow-hidden"
                    style="max-height: 1.3rem;"
                >
                    {{ data.description }}
                </div>
                <span
                    class="pi pi-chevron-circle-down text-blue-400 text-xl cursor-pointer"
                    @click="toggleDescription"
                />
            </div>
            <div
                class="relative"
                style="margin-top: -0.8rem;"
            >
                <span
                    v-show="showDescr"
                    class="absolute bg-orange-50 p-2 w-full md:w-24rem border-round border-400 border-1 z-5 left-0"
                >
                    {{ data.description }}
                </span>
            </div>
            <RatingMark
                :model-value="data.rating"
                :readonly="true"
                :cancel="false"
            />
        </div>
        <div class="flex align-items-center justify-content-between">
            <span class="text-2xl font-semibold">${{ normalizePrice(data.price) }}</span>
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
    import {normalPrice} from "../../utils/functions";

    export default {
        name: "ProductCardGrid",
        props: {
            data:
                {
                    type: Object,
                    default: null,
                },
        },
        data() {
            return {
                showDescr: false,
                svgSize: 'height: 10px',
            };
        },
        computed: {
            bColor() {
                return this.data.inventoryStatus ? 'status-' + this.data.inventoryStatus.toLowerCase() : '';
            },
        },
        methods: {
            normalizePrice(value) {
                return normalPrice(value);
            },
            ...mapActions('cartModule', ['addToCart']),
            toggleDescription() {
                this.showDescr = !this.showDescr;
            },
        }
    }
</script>

<style lang="scss" scoped>
</style>