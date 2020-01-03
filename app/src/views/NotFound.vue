<template>
    <div>
        <div class="heading">
            <NavBar/>
            <Header title="<mark class='text-primary'>Hmm. 🧐</mark>"
                    :flakes="true"/>
        </div>
        <div class="section">
            <div class="container">
                <h2 class="color-prim">It seems that you're lost in a perpetual black hole.
                    <br>Let us help guide you out and get you back home.</h2>
                <a href="/" class="btn btn-danger btn-lg">BACK</a>
            </div>
        </div>
    </div>
</template>

<script>

    import NavBar from "../components/NavBar";
    import Header from "../components/Header";

    export default {
        name: 'NotFound',
        components: {
            NavBar,
            Header
        }
    }

</script>

<style lang="scss" scoped>

    .color-prim {
        color: #B0DFDB;
        font-family: Roboto;
    }

    a {
        color: white;
    }

    .btn {
        margin-top: 32px;
    }

    .section {
        margin-bottom: 120px;
    }
</style>