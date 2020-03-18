<template>
    <div>
        <div class="section">
            <div class="container">
                <h2 class="color-prim">Générateur Attestation Sortie</h2>

                <div ref="content" class="attestation">

                    <center><h1>ATTESTATION DE DÉPLACEMENT DÉROGATOIRE</h1></center>
                    <center><p>En application de l'article 1er du décret du 16 mars 2020 portant réglementation des
                        déplacements dans le cadre de la lutte contre la propagation du virus Covid-19 :</p>
                    </center>
                    <form>
                        <h4><b>Je soussigné(e)</b></h4>

                        <div v-if="!isSaving" class="form-group row">
                            <label class="col-sm-2 col-form-label" for="name"><b>Mme / M.</b></label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="name" v-model="fullname">
                                <br>
                            </div>
                        </div>
                        <template v-else><b>Mme / M.</b> {{ fullname }}<br></template>

                        <div v-if="!isSaving" class="form-group row">
                            <label class="col-sm-2 col-form-label" for="born"><b>Né(e) le :</b></label>
                            <div class="col-sm-10">
                                <input type="date" class="form-control" id="born" v-model="formDate">
                                <br>
                            </div>
                        </div>
                        <template v-else><b>Né(e) le :</b> {{ formDate }}<br></template>

                        <div v-if="!isSaving" class="form-group row">
                            <label class="col-sm-2 col-form-label" for="address"><b>Demeurant :</b></label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="address" v-model="address">
                                <br>
                            </div>
                        </div>
                        <template v-else><b>Demeurant :</b> {{ address }}<br></template>

                        <h4>certifie que mon déplacement est lié au motif suivant (cocher la case) autorisé par
                            l'article 1er du décret du 16 mars 2020 portant réglementation des déplacements dans le
                            cadre de la lutte contre la propagation du virus Covid-19:</h4>

                        <div class="form-check choice">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="choix_a">
                            <label class="form-check-label" for="choix_a">
                                <b>déplacements entre le domicile et le lieu
                                    d'exercice de l'activité professionnelle, lorsqu'ils sont indispensables à
                                    l'exercice
                                    d'activités ne pouvant être organisées sous forme de télétravail (sur justificatif
                                    permanent) ou déplacements professionnels ne pouvant être différés;</b>
                            </label>
                        </div>
                        <div class="form-check choice">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="choix_b">
                            <label class="form-check-label" for="choix_b">
                                <b>déplacements pour effectuer des achats de
                                    première nécessité dans des établissements autorisés (liste sur
                                    gouvernement.fr);</b>
                            </label>
                        </div>
                        <div class="form-check choice">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="choix_c">
                            <label class="form-check-label" for="choix_c">
                                <b>déplacements pour motif de santé;</b>
                            </label>
                        </div>
                        <div class="form-check choice">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="choix_d">
                            <label class="form-check-label" for="choix_d">
                                <b>déplacements pour motif familial impérieux, pour
                                    l'assistance aux personnes vulnérables ou la garde d'enfants;</b>
                            </label>
                        </div>
                        <div class="form-check choice">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="choix_e">
                            <label class="form-check-label" for="choix_e">
                                <b>déplacements brefs, à proximité du domicile, liés
                                    à l'activité physique individuelle des personnes, à l'exclusion de toute pratique
                                    sportive collective, et aux besoins des animaux de compagnie.</b>
                            </label>
                        </div>

                        <p align="right">
                            <label for="place">Fait à </label>
                            <input v-if="!isSaving" type="text" id="place" v-model="location">
                            <template v-else> {{ location }}</template>
                            <label for="date">le </label>
                            <input v-if="!isSaving" type="date" id="date" v-model="formDateSign">
                            <template v-else> {{ formDateSign }}</template>
                            <br>
                            (signature)<br>
                            <DrawPad :saving="isSaving"/>
                        </p>

                    </form>
                </div>

                <div class="btn-container">
                    <a @click="generate" class="btn btn-primary btn-md">GENERER</a>
                    <a @click="reset" class="btn btn-primary btn-md">RESET</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import NavBar from "../components/NavBar"
    import Header from "../components/Header"
    import DrawPad from "../components/DrawPad"

    import jsPDF from 'jspdf'
    import domtoimage from "dom-to-image";
    import html2canvas from "html2canvas"

    import {saveAs} from 'file-saver';

    export default {
        name: 'Attestation',
        data() {
            return {
                formDate: new Date().toISOString().slice(0, 10),
                formDateSign: new Date().toISOString().slice(0, 10),
                fullname: '',
                address: '',
                location: '',
                isSaving: false
            }
        },
        components: {
            NavBar,
            Header,
            DrawPad
        },
        methods: {

            reset() {
                this.formDate = new Date().toISOString().slice(0, 10)
                this.formDateSign = new Date().toISOString().slice(0, 10)
                this.fullname = ''
                this.address = ''
                this.location = ''
            },

            generate() {
                const iPad = (window.navigator.userAgent.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini)/)) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
                this.isSaving = true

                let self = this

                let scale = 1200 / this.$refs.content.clientWidth

                window.scrollTo(0, 0);

                const date = new Date();
                const filename =
                    "attestation_" +
                    date.getFullYear() +
                    ("0" + (date.getMonth() + 1)).slice(-2) +
                    ("0" + date.getDate()).slice(-2);

                if (iPad) {

                    setTimeout(function () {
                        html2canvas(document.querySelector(".attestation"), {
                            useCORS: true,
                            allowTaint: true,
                            imageTimeout: 50000,
                            scale: Math.max(window.devicePixelRatio, scale)
                        }).then(canvas => {

                            let img = canvas.toDataURL()
                            saveAs(img, filename + '.png');
                            self.isSaving = false

                        }).catch(err => {
                            console.log("ERROR GENERATION", err)
                            self.isSaving = false
                        });
                    }, 1000)

                } else {
                    domtoimage
                        .toPng(self.$refs.content, {
                            height: self.$refs.content.offsetHeight * scale,
                            width: self.$refs.content.offsetWidth * scale,
                            style: {
                                transform: "scale(" + scale + ")",
                                transformOrigin: "top left",
                                width: self.$refs.content.offsetWidth + "px",
                                height: self.$refs.content.offsetHeight + "px"
                            }
                        })
                        .then(function (dataUrl) {

                            let img = new Image();
                            img.src = dataUrl;

                            let doc = new jsPDF("p", "pt", "a4");
                            let width = doc.internal.pageSize.getWidth();
                            let height = doc.internal.pageSize.getHeight();
                            doc.addImage(img, 'PNG', 0, 0, width, height);
                            doc.save(filename + ".pdf")
                            self.isSaving = false

                        })
                        .catch(function (error) {
                            console.error("oops, something went wrong!", error);
                            self.isSaving = false
                        });
                }

            }
        }
    }
</script>

<style lang="scss" scoped>

    .row {
        margin-left: 0;
        margin-right: 0;
    }

    .btn-container {
        display: flex;
        margin-bottom: 64px;

        a {
            color: white;
        }

        :last-child {
            margin-left: 8px;
        }
    }

    .form-check-input {
        margin-right: 16px;
    }

    .form-check-label {
        margin-left: 16px;
    }

    .attestation {
        //box-shadow: 0 0 1rem rgba(240, 240, 240, 0.9);
        margin-top: 32px;
        margin-bottom: 32px;
        padding: 32px;

        a, p, label, h1, h2, h3, h4 {
            font-family: Helvetica, Arial, sans-serif !important;
        }

        .choice {
            display: flex;
            margin-top: 32px;

            input {
                width: 30px;
            }

            label {
                font-family: Helvetica, Arial, sans-serif !important;
            }
        }

        .choice:last-of-type {
            margin-bottom: 32px;
        }

        label[for='date'] {
            margin-left: 8px;
            margin-right: 8px;
        }

        label[for='place'] {
            margin-left: 8px;
            margin-right: 8px;
        }
    }

</style>