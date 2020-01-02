<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary" id="nav-primary">
        <div class="container">
            <a class="navbar-brand" name="header" href="/">
                <img v-lazy="require('../img/logo.png')" alt="heictojpg" class="logo mr-2" height="80">
                heictojpg
            </a>

            <div id="navbarNavDropdown-7">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item mx-2">
                        <a class="btn btn-outline-danger" href="/faq">
                            FAQ
                        </a>
                    </li>
                    <li class="nav-item mx-2">
                        <a class="btn btn-outline-danger" href="/about">
                            About
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>

    export default {
        name: 'NavBar'
    }

</script>

<style lang="scss" scoped>

    #nav-primary {
        background-color: transparent !important;

        .navbar-brand {
            color: black;
        }

        .logo {
            border-radius: 20px;
        }

        .mx-2 {
            margin-top: 4px;
        }
    }

</style>