<template>
    <div class="canvas-container">
        <canvas id="note-canvas"
                ref="canvas"
                @mousedown="handleMousedown"
                @mouseup="handleMouseup"
                @mousemove="handleMousemove"
                @touchstart="handleTouchstart"
                @touchend="handleTouchend"
                @touchmove="handleTouchmove"
                width="400"
                height="300"
                :style="{'border': saving === true ? 'none' : '1px solid'}">
            Your browser does not support the HTML 5 Canvas.
        </canvas>
        <br>
        <a v-if="!saving" @click="clear">Clear</a>
    </div>
</template>

<script>
    export default {
        name: "DrawPad",
        data() {
            return {
                drawing: false,
                mousePos: {x: 0, y: 0},
                lastPos: {x: 0, y: 0},
                ctx: null
            };
        },
        props: {
            saving: false
        },
        computed: {
            canvas() {
                return this.$refs.canvas;
            }
        },
        methods: {
            handleMousedown(event) {
                this.drawing = true;
                this.lastPos = this.getMousePos(event);
            },
            handleMouseup(event) {
                this.drawing = false;
            },
            handleMousemove(event) {
                this.mousePos = this.getMousePos(event);
            },
            handleTouchstart(event) {
                this.mousePos = this.getTouchPos(event);
                let touch = event.touches[0];
                let mouseEvent = new MouseEvent("mousedown", {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                this.canvas.dispatchEvent(mouseEvent);
            },
            handleTouchend(event) {
                let mouseEvent = new MouseEvent("mouseup", {});
                this.canvas.dispatchEvent(mouseEvent);
            },
            handleTouchmove(event) {
                let touch = event.touches[0];
                let mouseEvent = new MouseEvent("mousemove", {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                this.canvas.dispatchEvent(mouseEvent);
            },
            getMousePos(mouseEvent) {
                const rect = this.canvas.getBoundingClientRect();
                return {
                    x: mouseEvent.clientX - rect.left,
                    y: mouseEvent.clientY - rect.top
                };
            },
            // Get the position of a touch relative to the canvas
            getTouchPos(touchEvent) {
                const rect = this.canvas.getBoundingClientRect();
                return {
                    x: touchEvent.touches[0].clientX - rect.left,
                    y: touchEvent.touches[0].clientY - rect.top
                };
            },
            renderCanvas() {
                if (this.drawing) {
                    this.ctx.moveTo(this.lastPos.x, this.lastPos.y);
                    this.ctx.lineTo(this.mousePos.x, this.mousePos.y);
                    this.ctx.stroke();
                    this.lastPos = this.mousePos;
                }
            },
            drawLoop() {
                window.requestAnimFrame(this.drawLoop);
                this.renderCanvas();
            },
            clear() {
                this.canvas.width = this.canvas.width;
            },
            toDataUrl() {
                console.log(this.canvas.toDataURL());
            }
        },
        mounted() {
            this.ctx = this.canvas.getContext("2d");
            this.ctx.strokeStyle = "#222222";
            this.ctx.lineWith = 2;

            // Get a regular interval for drawing to the screen
            window.requestAnimFrame = (function (callback) {
                return (
                    window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimaitonFrame ||
                    function (callback) {
                        window.setTimeout(callback, 1000 / 60);
                    }
                );
            })();

            this.drawLoop();

            // Prevent scrolling when touching the canvas
            document.body.addEventListener(
                "touchstart",
                function (e) {
                    if (e.target == document.getElementById("note-canvas")) {
                        e.preventDefault();
                    }
                },
                false
            );
            document.body.addEventListener(
                "touchend",
                function (e) {
                    if (e.target == document.getElementById("note-canvas")) {
                        e.preventDefault();
                    }
                },
                false
            );
            document.body.addEventListener(
                "touchmove",
                function (e) {
                    if (e.target == document.getElementById("note-canvas")) {
                        e.preventDefault();
                    }
                },
                false
            );
        }
    };
</script>

<style scoped lang="scss">

    .canvas-container {

        #note-canvas {
            touch-action: none;
        }

    }
</style>
