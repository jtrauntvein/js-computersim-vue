<template>
   <b-card>
      <b-card-header>
         <b-card-title>{{title}}</b-card-title>
      </b-card-header>
      <b-card-body>
         <b-row>
            <b-button-toolbar>
               <b-button
                  v-for="index in size"
                  :key="index"
                  size="sm"
                  variant="primary" 
                  class="m-1"
                  v-on:click="on_bit_clicked(index - 1)" >
                  <Led :powered="wires[index - 1]" />
               </b-button>
            </b-button-toolbar>
         </b-row>
      </b-card-body>
   </b-card>   
</template>

<script>
import Led from "./Led.vue";

export default {
   name: "JsBus",
   components: {
      Led
   },
   props: {
      size: Number,
      bus: Object,
      title: String
   }, 
   data: function() {
      return {
         wires: []
      }
   },
   methods: {
      on_bit_clicked: function(index) {
         this.bus.set(index, -1);
      }
   },
   mounted: function() {
      this.bus.add_client((bus) => {
         for(let i = 0; i < this.size; ++i)
            this.wires[i] = bus.get(i) ? true : false;
         this.$forceUpdate();
      });
      for(let i = 0; i < this.size; ++i)
         this.wires[i] = this.bus.get(i) ? true : false;
   }
}
</script>