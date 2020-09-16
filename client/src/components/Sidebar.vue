<template>
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
</template>

<style scoped>
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
</style>

<script lang="ts">

    import { IEvent } from "fabric/fabric-impl";
    import { Component, Prop, Vue } from "vue-property-decorator";

    @Component
    export default class Sidebar extends Vue {
        
        addRect(event: IEvent) {
            alert("addRect()");
        }

        addCircle(event: IEvent) {
            alert("addCircle()");
        }
    }

</script>

