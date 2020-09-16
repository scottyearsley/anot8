<template>
  <div>
      <img v-bind:src="skin.url" usemap="#map" />
      <map name="map">
        <area v-for="item in areas" :key="item.coords" :shape="item.type" :coords="item.coords" href="hbjhbj.com">
      </map>
  </div>
</template>

<style scoped>
/* 
area {
   display: block; 
  border: 1px solid red
}  */

</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Skin } from "../models/Models";
import { fabric } from "fabric";


@Component({})
export default class Preview extends Vue {
    skin?: Skin;
    areas: any[] = [];

    created() {
      //debugger
         const json = localStorage.getItem('skin') as string;
         this.skin = JSON.parse(json) as Skin;

        this.skin.fabric.objects.forEach((obj: fabric.Object) => {

          const coords = 
            this.areas.push({
              type: obj.type,
              coords: obj.left + ',' + obj.top + ',' + obj.width + ',' + obj.height
            })
        });


        //console.log(this.skin);
    }
}

</script>
