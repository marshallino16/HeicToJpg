<template>
    <div>
        <div class="heading">
            <NavBar/>
            <Header title="Convert iOS11+ HEIC/HEIF<br>photo to JPG"
                    :flakes="true"/>
        </div>
        <div class="section">
            <div class="container">
                <h3 id="list">Conversion</h3>
                <div class="section themes-list">
                    <vue-dropzone ref="myVueDropzone" id="dropzone"
                                  :options="dropzoneOptions"
                                  v-on:vdropzone-thumbnail="thumbnail"
                                  :useCustomSlot=true>
                        <div class="dropzone-custom-content">
                            <h3 class="dropzone-custom-title">Drag and drop to upload content!</h3>
                            <div class="subtitle">...or click to select a file from your computer</div>
                        </div>
                    </vue-dropzone>

                    <div id="previews">&nbsp;</div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import NavBar from "../components/NavBar";
    import Header from "../components/Header";
    import vue2Dropzone from 'vue2-dropzone'
    import 'vue2-dropzone/dist/vue2Dropzone.min.css'

    export default {
        name: 'home',
        components: {
            NavBar,
            Header,
            vueDropzone: vue2Dropzone
        },
        data: function () {
            return {
                dropzoneOptions: {
                    url: 'https://heic-web-aowma5qsfa-uc.a.run.app/convert',
                    parallelUploads: 2,
                    humbnailWidth: 250,
                    addRemoveLinks: true,
                    acceptedFiles: ".heif, .heic",
                    maxFilesize: 15,
                    maxFiles: 50,
                    createImageThumbnails: true,
                    paramName: "photo",
                    headers: {"My-Awesome-Header": "header value"},
                    previewTemplate: this.template(),
                    previewsContainer: '#previews',
                    duplicateCheck: true
                }
            }
        },
        methods: {
            template() {
                return ` <div class="card minimal dz-file-preview">
                          <div class="card-body">
                            <h4 class="card-title" data-dz-name></h4>
                            <small class="text-muted cat" data-dz-size>
                              <i class="far fa-clock text-info"></i>
                            </small>
                            <p class="card-text" v-html="data-dz-errormessage"></p>
                            <div class="progress progress active" role="progressbar" aria-valuemin="0"
                                                             aria-valuemax="100" aria-valuenow="0">
                                                            <div id="progress-uploading" class="progress-bar progress-bar-info"
                                                                 style="width:0%;" data-dz-uploadprogress></div>
                                                            <div id="success-conversion" class="progress-bar progress-bar-success"
                                                                 style="width:100%; display:none;"></div>
                                                            <div id="error-conversion" class="progress-bar progress-bar-danger"
                                                                 style="width:100%; display:none;"></div>
                                                        </div>
                            <a href="#" class="btn btn-primary" download>Download JPG</a>
                          </div>
                        </div>
                        `;
            },
            thumbnail: function (file, dataUrl) {
                var j, len, ref, thumbnailElement;
                if (file.previewElement) {
                    file.previewElement.classList.remove("dz-file-preview");
                    ref = file.previewElement.querySelectorAll("[data-dz-thumbnail-bg]");
                    for (j = 0, len = ref.length; j < len; j++) {
                        thumbnailElement = ref[j];
                        thumbnailElement.alt = file.name;
                    }
                    return setTimeout(((function (_this) {
                        return function () {
                            return file.previewElement.classList.add("dz-image-preview");
                        };
                    })(this)), 1);
                }
            }
        },
        async mounted() {
            ga('send', 'pageview', 'home')
        },
        created() {
            console.log('ENV', process.env.VUE_APP_ENV)
        }
    }
</script>

<style lang="scss" scoped>

    .heading {
        background: url('../img/background_header.jpg') no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }

    .themes-list {
        margin-top: 0 !important;
        margin-bottom: 2rem;

        #dropzone {
            border: 2px dashed #B0DFDB;
            margin-left: 10%;
            margin-right: 10%;
            margin-top: 4%;
            min-height: 200px;
            color: #313131;
            background: #F7F7F7 !important;

            .dropzone-custom-content {
                text-align: center;
            }

            .dropzone-custom-title {
                margin-top: 0;
                color: #B0DFDB;
            }

            .subtitle {
                color: #314b5f;
            }

        }

        #previews {
            display: flex;
            margin: 2rem;
        }

    }

    @media screen and (max-width: 600px) {

    }

</style>