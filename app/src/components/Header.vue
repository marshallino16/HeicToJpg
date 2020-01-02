<template>
    <div class="page-hero bg-primary text-white" id="banner">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center">
                    <div class="title">
                        <h3 class="display-2 text-white" v-html="title"></h3>
                        <h4 class="text-white">{{ subtitle }}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Header',
        props: {
            title: String,
            subtitle: String,
            flakes: Boolean
        }
    }

</script>

<style scoped lang="scss">
    #banner {
        overflow: hidden;
        background: transparent !important;

        .title, h1, h2, h3, h4 {
            color: $primary-color !important;
            font-family: Arial;
        }

        .display-2 {
            font-size: 4rem;
            text-align: center;
            width: 100%;
        }

    }

    @media screen and (max-width: 600px) {
        #banner {
            .display-2 {
                font-size: 1.5rem;
            }
        }
    }
</style>