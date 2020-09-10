<template>
  <div>
    <div class="sidebar">
      <a href="#">
        <i class="fa fa-fw fa-square"></i>
      </a>
      <a href="#">
        <i class="fa fa-fw fa-hotdog"></i>
      </a>
      <a href="#">
        <i class="fa fa-fw fa-draw-polygon"></i>
      </a>
    </div>

    <div class="main">
      <div id="image-container">
        <img id="diagram-image" />
        <canvas id="canvas"></canvas>
      </div>
      <button id="saveButton">Save</button>
    </div>

    <!-- <div class="properties-bar">
      <form action="/action_page.php">
        <label for="fname">First Name</label>
        <input type="text" id="fname" name="firstname" placeholder="Your name.." />

        <label for="lname">Last Name</label>
        <input type="text" id="lname" name="lastname" placeholder="Your last name.." />

        <label for="country">Country</label>
        <select id="country" name="country">
          <option value="australia">Australia</option>
          <option value="canada">Canada</option>
          <option value="usa">USA</option>
        </select>

        <input type="submit" value="Submit" />
      </form>
    </div> -->
  </div>

  <!-- <script src="code.js"></script> -->
</template>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css";
</style>

<script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/4.1.0/fabric.min.js" integrity="sha512-T9uV3LxV54oKVYSwORGeHdJ1Ti0WcQvDjAaTvMS6+qfrI5ZRzwxfXVzr7fqodTjfZ6wtbreT5A+65ykwbp4DOw==" crossorigin="anonymous"></script>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
//import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    //HelloWorld,
  },
})
export default class Edit extends Vue {}
</script>
