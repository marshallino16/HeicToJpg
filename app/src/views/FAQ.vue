<template>
    <div>
        <div class="heading">
            <NavBar/>
            <Header title="<mark class='text-primary'>Convert iOS11+ HEIC/HEIF<br>photo to JPG</mark>"
                    :flakes="true"/>
        </div>
        <div class="section">
            <div class="container">
                <h3 id="list">FAQ</h3>
                <div class="section themes-list">
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import NavBar from "../components/NavBar";
    import Header from "../components/Header";

    export default {
        name: 'faq',
        components: {
            NavBar,
            Header
        }
    }

</script>

<style lang="scss" scoped>

    .themes-list {
        margin-top: 0 !important;
        margin-bottom: 2rem;
    }
</style>