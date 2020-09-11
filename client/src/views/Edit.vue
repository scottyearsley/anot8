<template>
    <div>
        <div class="sidebar">
            <a href="#" v-on:click="addRect">
                <i class="fa fa-fw fa-square"></i>
            </a>
            <a href="#" v-on:click="addCircle">
                <i class="fa fa-fw fa-circle"></i>
            </a>
            <a href="#">
                <i class="fa fa-fw fa-draw-polygon"></i>
            </a>
        </div>

        <div class="main">
            <div id="image-container">
                <img id="diagram-image" v-on:load="setCanvasSize" v-bind:src="skin.url" />
                <canvas id="canvas"></canvas>
            </div>
        </div>
    </div>
</template>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css";

.sidebar {
    height: 100%;
    width: 60px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #222;
    overflow-x: hidden;
    padding-top: 16px;
}

.sidebar a {
    margin: 6px 6px 2px 10px;
    padding: 3px;
    text-decoration: none;
    font-size: 24px;
    color: #818181;
    display: block;
}

.sidebar a:hover {
    color: lime;
}

.main {
    margin-left: 60px; /* Same as the width of the sidenav */
    padding: 0px 10px;
    height: 100%;
}

#canvas {
    border: 1px dashed #333;
    position: absolute;
}

#diagram-image {
    position: absolute;
}

@media screen and (max-height: 450px) {
    .sidebar {
        padding-top: 15px;
    }
    .sidebar a {
        font-size: 18px;
    }
}
</style>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { fabric } from "fabric";
import { Guid } from "../models/Guid";
import { Skin } from "../models/Models";

@Component({})
export default class Edit extends Vue {
    canvas!: fabric.Canvas;
    skin!: Skin;

    constructor() {
        super();

        // Styling defaults
        fabric.Object.prototype.cornerColor = "#333333";
        fabric.Object.prototype.transparentCorners = false;
        fabric.Object.prototype.cornerSize = 8;

        // TODO: Load skin from service

        this.skin = {
            id: Guid.newGuid(),
            url:
                "https://docs.google.com/drawings/d/e/2PACX-1vTWhJvElkQIk1nz_hSXeSy-pFmjbbR-8qREMFlH4rIWpgIMeaZa_P8PfMoRXXHJIehSoiF8hlWHRLCq/pub?w=1108&h=1104",
            hotspots: []
        };
    }

    addRect(event: Event) {
        const rectangle = new fabric.Rect({
            width: 200,
            height: 200,
            fill: "rgba(10, 20, 30, 0.3)",
            stroke: "#cc6666",
            strokeWidth: 3,
        });

        rectangle.setControlsVisibility({ mtr: false });
        rectangle["anot8"] = {
            id: Guid.newGuid(),
        };

        // Render the Rect in canvas
        this.canvas.add(rectangle);
        this.canvas.centerObject(rectangle);

        event.preventDefault();
    }

    addCircle(event: Event) {
        const ellipse = new fabric.Circle({
            radius: 100,
            fill: "rgba(10, 20, 30, 0.3)",
            stroke: "#cc6666",
            strokeWidth: 3
        });

        ellipse.setControlsVisibility({ mtr: false });
        ellipse["anot8"] = {
            id: Guid.newGuid(),
        };

        // Render the Rect in canvas
        this.canvas.add(ellipse);
        this.canvas.centerObject(ellipse);

        event.preventDefault();
    }

    mounted() {
        this.canvas = new fabric.Canvas("canvas", {
            selectionColor: "#333",
            selectionLineWidth: 2,
            // ...
        });

        this.canvas.on("mouse:down", this.onCanvasMouseDown);
        this.canvas.on("mouse:up", this.onCanvasMouseUp);
    }

    setCanvasSize(event: any) {
        this.canvas.setHeight(event.target.height);
        this.canvas.setWidth(event.target.width);
    }

    onCanvasMouseDown(options: fabric.IEvent) {
        if (options.target) {
            console.log("an object was clicked! ", options.target.type);
        }
    }

    onCanvasMouseUp(options: fabric.IEvent) {

        // Maintain the width of the border of the hotspot
        if (options.target) {

            if (options.target.type === 'rect') {
                const newWidth = options.target.width * options.target.scaleX;
                const newHeight = options.target.height * options.target.scaleY;

                options.target.set({
                    width: newWidth,
                    height: newHeight,
                    scaleX: 1,
                    scaleY: 1,
                });
            } 

            // if (options.target.type === 'circle') {
            //     debugger
            //     const circle = options.target as fabric.Circle;
            //     const newRadius = circle.radius * options.target.scaleX;

            //     circle.set({
            //         radius: newRadius,
            //         scaleX: 1,
            //         scaleY: 1,
            //     });
            // } 
            
        }
    }
}
</script>