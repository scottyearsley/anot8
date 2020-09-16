<template>
    <div>
        <div class="navbar">
            <router-link to="/"><i class="fa fa-fw fa-home"></i> Home</router-link>
            <a href="#" v-on:click="save">
                <i class="fa fa-fw fa-save"></i> Save
            </a>
            <router-link to="/preview"><i class="fa fa-fw fa-preview"></i> Preview</router-link>
        </div>

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

        <div class="properties-bar" v-if="propertiesVisible">
            <div>
                <label for="hotspotId">Hotspot ID</label>
                <input type="text" id="hotspotId" name="hotspotId" v-model="selectedHotspot.id" />

                <label for="targetImageUrl">Target image URL</label>
                <input
                    type="text"
                    id="targetImageUrl"
                    name="targetImageUrl"
                    v-model="selectedHotspot.url"
                />

                <label for="lname">Tooltip</label>
                <input type="text" id="lname" name="lastname" v-model="selectedHotspot.tooltip" />
            </div>>
        </div>
    </div>
</template>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css";

#diagram-image {
    border: 1px dashed red;
    position: fixed;
}

#image-container {
    position: fixed;
    top: 43px;
    left: 70px;
}

/* Style the navigation bar */
.navbar {
  width: 100%;
  background-color: #555;
  overflow: none;
  height: 43px;
  position: fixed;
}

/* Navbar links */
.navbar a {
  float: left;
  text-align: center;
  padding: 12px;
  color: white;
  text-decoration: none;
  font-size: 17px;
}

/* Navbar links on mouse-over */
.navbar a:hover {
  background-color: #000;
}

/* Current/active navbar link */
.active {
  background-color: #4CAF50;
}

.properties-bar {
    height: 100%;
    width: 400px;
    background-color: #222;
    position: fixed;
    top: 43px;
    left: calc(100% - 400px);
    box-shadow: -10px 0px 120px #888888;
}

.properties-bar div {
    margin-top: 60px;
    margin-left: 10px;
    margin-right: 10px;
}

.sidebar {
    height: 100%;
    width: 60px;
    position: fixed;
    z-index: 1;
    top: 43px;
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
    overflow: auto;
}

#canvas {
    border: 1px dashed #333;
     position: fixed; 
}

@media screen and (max-height: 450px) {
    .sidebar {
        padding-top: 15px;
    }
    .sidebar a {
        font-size: 18px;
    }
}

/* Style inputs */
input[type="text"],
select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

label {
    color: #818181;
}
</style>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";
import { fabric } from "fabric";
import { Guid } from "../models/Guid";
import { Skin, Hotspot } from "../models/Models";
import Sidebar from '@/components/Sidebar.vue';

@Component({
    components: { Sidebar }
})
export default class Edit extends Vue {
    canvas!: fabric.Canvas;
    skin!: Skin;
    propertiesVisible = false;
    selectedHotspot?: Hotspot;

    created() {
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

    mounted() {
        this.canvas = new fabric.Canvas("canvas", {
            selectionColor: "#333",
            selectionLineWidth: 2,
            // ...
        });

        this.canvas.on("mouse:down", this.onCanvasMouseDown);
        this.canvas.on("mouse:up", this.onCanvasMouseUp);
    }

    save(event: Event) {

        const fab = this.canvas.toJSON(["anot8"]);
        this.skin.fabric = fab

        localStorage.setItem('skin', JSON.stringify(this.skin));

        event.preventDefault();
    }

    addRect(event: Event) {
        const hotspotId = Guid.newGuid();
        const rectangle = new fabric.Rect({
            width: 200,
            height: 200,
            fill: "rgba(10, 20, 30, 0.3)",
            stroke: "#cc6666",
            strokeWidth: 3,
        });

        rectangle.setControlsVisibility({ mtr: false });

        rectangle["anot8"] = {
            id: hotspotId,
        };

        // Render the Rect in canvas
        this.canvas.add(rectangle);
        this.canvas.centerObject(rectangle);

        this.addHotspot(hotspotId);

        event.preventDefault();
    }

    addCircle(event: Event) {
        const hotspotId = Guid.newGuid();
        const ellipse = new fabric.Circle({
            radius: 100,
            fill: "rgba(10, 20, 30, 0.3)",
            stroke: "#cc6666",
            strokeWidth: 3,
        });

        ellipse.setControlsVisibility({ mtr: false });
        ellipse["anot8"] = {
            id: hotspotId,
        };

        // Render the Rect in canvas
        this.canvas.add(ellipse);
        this.canvas.centerObject(ellipse);

        this.addHotspot(hotspotId);

        event.preventDefault();
    }

    addHotspot(id: string) {
        this.skin.hotspots.push({ id: id });
    }

    setCanvasSize(event: any) {
        this.canvas.setHeight(event.target.height);
        this.canvas.setWidth(event.target.width);
    }

    onCanvasMouseDown(options: fabric.IEvent) {
        if (options.target) {
            this.toggleProperties(true);
        } else {
            this.toggleProperties(false);
        }
    }

    toggleProperties(show: boolean) {
        this.propertiesVisible = show;
    }

    onCanvasMouseUp(options: fabric.IEvent) {

        // Maintain the width of the border of the hotspot
        if (options?.target) {

            // set selected hotspot
            const id = (options.target as any).anot8.id as string;
            this.selectedHotspot = this.skin.hotspots.find((h) => h.id === id);

            if (options.target?.type === "rect") {
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