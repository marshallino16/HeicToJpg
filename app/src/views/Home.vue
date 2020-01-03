<template>
    <div>
        <div class="heading">
            <NavBar/>
            <Header title="<mark class='text-primary'>Convert iOS11+ HEIC/HEIF<br>photo to JPG</mark>"
                    :flakes="true"/>
        </div>
        <div class="section">
            <div class="container">
                <h3 id="list">Conversion</h3>
                <div class="section themes-list">
                    <vue-dropzone ref="myVueDropzone" id="dropzone"
                                  :options="dropzoneOptions"
                                  v-on:vdropzone-success="onSuccess"
                                  v-on:vdropzone-error="onError"
                                  v-on:vdropzone-files-added="onFilesAdded"
                                  v-on:vdropzone-upload-progress="onProgress"
                                  :useCustomSlot=true>
                        <div class="dropzone-custom-content">
                            <h3 class="dropzone-custom-title">Drag and drop to upload content!</h3>
                            <div class="subtitle">...or click to select a file from your computer</div>
                        </div>
                    </vue-dropzone>

                    <div id="previews">&nbsp;</div>
                    <div class="uploads">
                        <template v-for="file in convertedFiles">
                            <div class="card minimal dz-file-preview">
                                <div class="card-body">
                                    <h4 class="card-title">{{file.id}}</h4>
                                    <small class="text-muted cat">
                                        <i class="far fa-file-image text-info"></i> {{file.size}}
                                    </small>
                                    <p v-if="file.error" class="card-text" v-html="file.error"></p>
                                    <p v-if="file.progress < 100 && !file.error" class="card-text">Converting...</p>
                                    <p v-if="file.url" class="card-text">Successfully converted!</p>
                                    <p v-if="file.progress == 100 && !file.url" class="card-text">Finalizing...</p>
                                    <div class="progress progress active" role="progressbar" aria-valuemin="0"
                                         aria-valuemax="100" aria-valuenow="0">
                                        <div v-if="file.progress < 100 && !file.error" id="progress-uploading"
                                             class="progress-bar bg-info"
                                             :style="{'width':file.progress+'%'}"></div>
                                        <div v-if="file.progress == 100 && !file.error" id="success-conversion"
                                             class="progress-bar bg-success"
                                             style="width:100%;"></div>
                                        <div v-if="file.error" class="progress-bar bg-danger"
                                             style="width:100%;"></div>
                                    </div>
                                    <a v-if="file.url" @click="downloadFile(file.url, file.filename)" class="download-btn btn btn-success"
                                       download>Download
                                        JPG</a>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import NavBar from "../components/NavBar";
    import Header from "../components/Header";
    import axios from 'axios'
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
                    url: '/convert',
                    parallelUploads: 2,
                    humbnailWidth: 250,
                    addRemoveLinks: false,
                    acceptedFiles: ".heif, .heic",
                    maxFilesize: 15,
                    maxFiles: 50,
                    createImageThumbnails: true,
                    paramName: "photo",
                    headers: {"My-Awesome-Header": "header value"},
                    previewTemplate: this.template(),
                    previewsContainer: '#previews',
                    duplicateCheck: true
                },
                convertedFiles: []
            }
        },
        methods: {
            template() {
                return `<div class="dummy"></div>
                        `;
            },
            onFilesAdded(files) {
                let self = this
                Array.from(files).forEach(file => {
                    this.convertedFiles.push({
                        id: file.name,
                        error: null,
                        url: null,
                        filename: null,
                        progress: 0,
                        size: self.humanFileSize(file.size, true)
                    })
                })
            },
            onProgress(file, progress, bytesSent) {
                console.log("Progress", file, progress, bytesSent)

                let index = this.convertedFiles.findIndex(obj => obj.id === file.name);
                let localFile = this.convertedFiles[index]
                localFile.progress = progress

                this.convertedFiles[index] = localFile
            },
            onError(file, message, xhr) {
                console.log("Error", file, message, xhr)

                let index = this.convertedFiles.findIndex(obj => obj.id === file.name);
                let localFile = this.convertedFiles[index]
                localFile.error = message || xhr.response

                this.convertedFiles[index] = localFile
            },
            onSuccess(file, response) {
                console.log("Success", file, response)

                let index = this.convertedFiles.findIndex(obj => obj.id === file.name);
                let localFile = this.convertedFiles[index]

                if (response.url) {
                    localFile.url = response.url
                    localFile.filename = response.filename
                } else {
                    localFile.error = response
                }

                this.convertedFiles[index] = localFile
            },
            humanFileSize(bytes, si) {
                var thresh = si ? 1000 : 1024;
                if (Math.abs(bytes) < thresh) {
                    return bytes + ' B';
                }
                var units = si
                    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
                    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
                var u = -1;
                do {
                    bytes /= thresh;
                    ++u;
                } while (Math.abs(bytes) >= thresh && u < units.length - 1);
                return bytes.toFixed(1) + ' ' + units[u];
            },
            downloadFile(url, filename) {
                axios({
                    url: url,
                    method: 'GET',
                    responseType: 'blob',
                }).then((response) => {
                    console.log('Response', response)
                    let fileURL = window.URL.createObjectURL(new Blob([response.data]));
                    let fileLink = document.createElement('a');

                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', filename);
                    document.body.appendChild(fileLink);

                    fileLink.click();
                });
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

        #previews, .uploads {
            display: flex;
            margin: 2rem;
        }

    }

    @media screen and (max-width: 600px) {

    }

</style>