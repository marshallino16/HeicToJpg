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
                    <div id="accordion">
                        <div class="card">
                            <div class="card-header" id="headingOne">
                                <h5 class="mb-0">
                                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne"
                                            aria-expanded="true" aria-controls="collapseOne">
                                        What does heictojpg.site do?
                                    </button>
                                </h5>
                            </div>

                            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne"
                                 data-parent="#accordion">
                                <div class="card-body">
                                    heictojpg allows you to upload your HEIC photos and convert them to JPG without harming the quality of the photo.
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="headingTwo">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse"
                                            data-target="#collapseTwo" aria-expanded="false"
                                            aria-controls="collapseTwo">
                                        What is HEIC?
                                    </button>
                                </h5>
                            </div>
                            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo"
                                 data-parent="#accordion">
                                <div class="card-body">
                                    HEIC is the file extension for HEIF format.
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="headingThree">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse"
                                            data-target="#collapseThree" aria-expanded="false"
                                            aria-controls="collapseThree">
                                        How do I convert my iPhone Heic files to JPGs?
                                    </button>
                                </h5>
                            </div>
                            <div id="collapseThree" class="collapse" aria-labelledby="headingThree"
                                 data-parent="#accordion">
                                <div class="card-body">
                                    Simply drag and drop, or select, the HEIC photos you would like converted into the optimization box for the conversion process to begin.
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="heading4">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse"
                                            data-target="#collapseThree" aria-expanded="false"
                                            aria-controls="collapseThree">
                                        Why is the file size of the JPG so small?
                                    </button>
                                </h5>
                            </div>
                            <div id="collapse4" class="collapse" aria-labelledby="headingThree"
                                 data-parent="#accordion">
                                <div class="card-body">
                                    Once your HEIC image has been converted to JPG, it is automatically optimized. This way you are receiving the same hi-res photo, just in a smaller file size
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="heading5">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse"
                                            data-target="#collapseThree" aria-expanded="false"
                                            aria-controls="collapseThree">
                                        What is High Efficiency Image Format?
                                    </button>
                                </h5>
                            </div>
                            <div id="collapse5" class="collapse" aria-labelledby="headingThree"
                                 data-parent="#accordion">
                                <div class="card-body">
                                    High Efficiency Image Format, or HEIF, is the file format for HEVC encoded images. HEIF can store various types of images, but the main application of HEIF is to store images that have been compressed using the image tools of the HEVC video compression standard. When you export your photos from iOS 11 you will notice the .heic file extension.
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="heading6">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse"
                                            data-target="#collapseThree" aria-expanded="false"
                                            aria-controls="collapseThree">
                                        Do we keep the photos online?
                                    </button>
                                </h5>
                            </div>
                            <div id="collapse6" class="collapse" aria-labelledby="headingThree"
                                 data-parent="#accordion">
                                <div class="card-body">
                                    No, we don't. You will need to download all the photos during each session. All converted photos will be deleted every 20 minutes.
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="heading7">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse"
                                            data-target="#collapseThree" aria-expanded="false"
                                            aria-controls="collapseThree">
                                        Can I download all photos with one click?
                                    </button>
                                </h5>
                            </div>
                            <div id="collapse7" class="collapse" aria-labelledby="headingThree"
                                 data-parent="#accordion">
                                <div class="card-body">
                                    We are not offering this feature for now but we will work on it very soon
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="heading8">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse"
                                            data-target="#collapseThree" aria-expanded="false"
                                            aria-controls="collapseThree">
                                        Do you also optimize JPG images?
                                    </button>
                                </h5>
                            </div>
                            <div id="collapse8" class="collapse" aria-labelledby="headingThree"
                                 data-parent="#accordion">
                                <div class="card-body">
                                    Yes, each photo that is converted to a JPG will be optimized giving you the same high quality photo, just in a smaller file size.
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="heading9">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse"
                                            data-target="#collapseThree" aria-expanded="false"
                                            aria-controls="collapseThree">
                                        Do you convert JPGs to Heic?
                                    </button>
                                </h5>
                            </div>
                            <div id="collapse9" class="collapse" aria-labelledby="headingThree"
                                 data-parent="#accordion">
                                <div class="card-body">
                                    heictojpg can only convert HEIC to JPG images at the moment. But we will be on the App Store very soon with an app to convert JPG files to HEIC for iPhone.
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="heading10">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse"
                                            data-target="#collapseThree" aria-expanded="false"
                                            aria-controls="collapseThree">
                                        Why is heictojpg telling me my HEIC file is a JPG?
                                    </button>
                                </h5>
                            </div>
                            <div id="collapse10" class="collapse" aria-labelledby="headingThree"
                                 data-parent="#accordion">
                                <div class="card-body">
                                    The reason why you are seeing this error message is that you are trying to convert a JPG image and not a HEIC image. If you'd like to check if your photo is indeed a JPG simply change the file extension from .heic to .jpg. If you can see your photo, then it's a JPG.
                                </div>
                            </div>
                        </div>
                    </div>
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