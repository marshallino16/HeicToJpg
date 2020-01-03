<template>
    <div>
        <div class="heading">
            <NavBar/>
            <Header title="<mark class='text-primary'>About this project</mark>"
                    :flakes="true"/>
        </div>
        <div class="section">
            <div class="container">
                <h1 id="list">
                    <github-button href="https://github.com/marshallino16/HeicToJpg/fork"
                                   class="github-btn"
                                   data-color-scheme="no-preference: light; light: light; dark: dark;"
                                   data-icon="octicon-repo-forked" data-size="large" data-show-count="true"
                                   aria-label="Fork marshallino16/HeicToJpg on GitHub">Fork
                    </github-button>
                    Open Source project
                </h1>
                <div class="section themes-list">
                    <p>Build with Vue.js + Flask 🌶
                        <br>All this project can be deploy via the Dockerfile.
                        <br>The Docker Image is based on Alpine + Tifig project
                    </p>
                    <div class="horizontal">
                        <a href="https://hub.docker.com/repository/docker/marshallino16/alpine_tifig"
                           class="btn btn-danger btn-lg">Docker Image repo</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import NavBar from "../components/NavBar";
    import Header from "../components/Header";
    import GithubButton from 'vue-github-button'

    export default {
        name: 'about',
        components: {
            NavBar,
            Header,
            GithubButton
        }
    }

</script>

<style lang="scss" scoped>

    .horizontal {
        display: flex;

        a {
            color: white;
            margin: 2rem;
        }
    }
</style>