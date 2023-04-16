<template>
    <div class="grid">
        <div class="col-12 md:col-10">
            <div class="card">
                <h2>Set Discount</h2>
                <h6 class="p-3 border rounded-xl border-orange-200">
                    <!-- TODO rewrite message below to fit real conditions -->
                    Attention! You can set 1 rule in 1 record, but all rules you had set acting together in their frames as
                    categories, products and dates.
                </h6>

                <div class="card">
                    <div class="formgroup">
                        <h4>Period of validity</h4>
                    </div>
                    <div class="flex">
                        <div class="flex flex-column col-6">
                            <div>
                                <h5>Start date.</h5>
                                <p>If omit, rule starts to act immediately after saving.</p>
                            </div>
                            <CalendarDef
                                v-model="calendarValue"
                                :show-icon="true"
                                :show-button-bar="true"
                                class="mr-2 calendar-flex"
                            />
                        </div>
                        <div class="flex flex-column col-6">
                            <div>
                                <h5>Finish date.</h5>
                                <p>If omit, rule acts until deleted.</p>
                            </div>
                            <CalendarDef
                                v-model="calendarValue"
                                :show-icon="true"
                                :show-button-bar="true"
                                class="mr-2 calendar-flex"
                            />
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="formgroup">
                        <h4>Category/Categories</h4>
                        <span>You can omit this choosing, as one, as both parts if you want to set discount for separate products.</span>
                    <!--                        <p>If you set product discount, chose category just for comfortable product choosing.</p>-->
                    </div>
                    <div class="formgroup-inline">
                        <div class="col-6 mb-0">
                            <h5>Include</h5><span>You can omit this choosing and nothing happens.</span>
                            <multi-select
                                v-model="multiselectValue"
                                :options="categoriesList"
                                option-label="name"
                                :filter="true"
                                class="multi-select"
                            >
                                <template #value="slotProps">
                                    <div
                                        v-for="option of slotProps.value"
                                        :key="option.code"
                                        class="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2"
                                    >
                                        <div>{{ option.name }}</div>
                                    </div>
                                    <template v-if="!slotProps.value || slotProps.value.length === 0">
                                        <div class="p-1">
                                            Select Categories
                                        </div>
                                    </template>
                                </template>
                                <template #option="slotProps">
                                    <div class="flex align-items-center">
                                        <div>{{ slotProps.option.name }}</div>
                                    </div>
                                </template>
                            </multi-select>
                        </div>
                        <div class="col-6 mb-0">
                            <h5>Exclude</h5>
                            <p>You can omit this choosing and nothing happens.</p>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="formgroup">
                        <h4>Percentage / Value</h4>
                        <p>Choose, are you setting discount by value or percentage?</p>
                    </div>
                    <div class="formgroup-inline">
                        <div class="field-radiobutton mb-0 mt-06">
                            <radio-button
                                id="percentage"
                                v-model="discountType"
                                name="option"
                                value="percentage"
                            />
                            <label for="percentage">Percentage</label>
                        </div>
                        <div class="field-radiobutton mb-0 mt-06">
                            <radio-button
                                id="value"
                                v-model="discountType"
                                name="option"
                                value="value"
                            />
                            <label for="value">Value</label>
                        </div>
                        <div class="field">
                            <label
                                for="amount"
                                class="p-sr-only"
                            >Amount</label>
                            <InputText
                                id="amount"
                                type="text"
                                placeholder="Amount"
                            />
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="formgroup title-group">
                        <h4>Name this discount rule</h4>
                        <p>It's need to you can find this rule in list. Also, you can edit this name.</p>
                        <span class="title-wrap">
                            <InputText
                                id="title"
                                style="width: 100%;"
                                type="text"
                                placeholder="Title"
                            />
                        </span>
                    </div>
                </div>

                <div class="card">
                    <div class="formgroup-inline justify-end">
                        <ButtonDefault
                            label="Submit"
                            class="mr-4 mb-2"
                        />
                        <ButtonDefault
                            label="Cancel & Close"
                            class="p-button-secondary mr-2 mb-2"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import RadioButton from "primevue/radiobutton";
    import {mapActions, mapGetters} from 'vuex';

    export default {
        components: {RadioButton},
        data() {
            return {
                discountEntity: null,
                discountType: null,
                calendarValue: null,
                isProductDisabled: true,
                categoriesList: [],
                dropdownValue: null,
                multiProdsSrc: [],
                multiCatsInc: [],
                multiCatsEx: [],
                multiProdsInc: [],
                multiProdsEx: [],
                multiselectValue: null,
            }
        },
        computed: {
            ...mapGetters('categoryModule', ['getCategoriesList']),
        },
        mounted() {
            this.categoriesList = this.getCategoriesList.map((item) =>
                ({
                    name: item.label,
                    code: item.id
                }))
        },
        methods: {
            ...mapActions('discountModule', []),
            getCategoryProducts(catId) {

            },
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
.multi-select {
    min-width: 12rem;
}
</style>
