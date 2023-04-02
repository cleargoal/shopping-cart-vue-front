<template>
    <div class="">
        <div class="col-12">
            <div class="card">
                <TheToast />
                <DataTable
                    ref="dt"
                    :value="discounts"
                    data-key="id"
                    :rows="10"
                    :rows-per-page-options="[5,10]"
                    responsive-layout="scroll"
                >
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h3 class="m-0">
                                Discounts List
                            </h3>
                        </div>
                    </template>

                    <Column
                        field="Title"
                        header="Discount Title"
                        :sortable="true"
                        header-style="width:30%; min-width:10rem;"
                    >
                        <template #body="slotProps">
                            <span class="p-column-title">Discount Title</span>
                            <span style="font-weight: bold;">{{ slotProps.data.title }}</span>
                        </template>
                    </Column>
                    <Column
                        field="Type"
                        header="Requirements"
                        :sortable="true"
                        header-style="width:70%; min-width:10rem;"
                    >
                        <template #body="slotProps">
                            <span class="p-column-title">Requirements</span>
                            <span>
                                {{ slotProps.data.requirements }}
                            </span>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script>
    import {FilterMatchMode} from 'primevue/api';
    import ApiService from '../../service/ApiService';

    export default {
        components: {

        },
        data() {
            return {
                discounts: null,
                title: '',
                requirements: {},
            }
        },
        apiService: null,
        created() {
            this.apiService = new ApiService();
            this.getDiscounts();
        },
        methods: {
            setTitle(title) {
                this.title = title;
                this.searchMovies();
            },
            getDiscounts() {
                this.apiService.getDiscountsListDb().then((discounts) => {
                    console.log(discounts);
                    this.discounts = discounts;
                    this.totalResults = parseInt(discounts.totalResults);
                });
            },
            confirmDeleteMovie(movie) {
                this.movie = movie;
                this.deleteMovieDialog = true;
            },
            deleteMovie() {
                this.movies = this.movies.filter(val => val.imdbID !== this.movie.imdbID);
                this.deleteMovieDialog = false;
                this.movie = {};
                this.$toast.add({severity: 'success', summary: 'Successful', detail: 'Movie Deleted', life: 3000});
            },
            getBadgeColor(src) {
                return this.statuses.find(el => el.src === src).value;
            },
            initFilters() {
                this.filters = {
                    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
                }
            },
            getNewPageNumber(newPage) {
                this.newPage = newPage;
                this.searchMovies();
            },
            setPages(number) {
                this.pages = number;
            },
        }
    }
</script>

<style scoped lang="scss">
@import '../../assets/scss/badges';
</style>
