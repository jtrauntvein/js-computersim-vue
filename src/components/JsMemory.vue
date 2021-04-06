<template>
   <b-card >
      <b-card-header>
         <b-card-title>Memory Module</b-card-title>
      </b-card-header>
      <b-card-body>
         <js-register
            :register="memory.address_register"
            title="Selected Address Register" />
         <div class="d-flex" >
            <div class="col" />
            <led 
               v-for="index in width"
               :key="index"
               :powered="output_bits[index - 1]" />
            <div class="col" />
         </div>
      </b-card-body>
      <b-card-footer>
         <b-button
            v-on:click="toggle_mr_bit"
            variant="primary"
            size="sm" >
            <led :powered="mr_enabled" />
            Read Enabled
         </b-button>
         <b-button
            v-on:click="toggle_mw_bit"
            class="ml-2"
            variant="primary"
            size="sm" >
            <led :powered="mw_enabled" />
            Write Enabled
         </b-button>
      </b-card-footer>
   </b-card>
</template>

<script>
import Led from "./Led.vue";
import JsRegister from "./JsRegister.vue";


export default {
   name: "js-memory",
   components: {
      Led,
      JsRegister
   },
   data: function() {
      return {

      };
   },
   methods: {
      toggle_mr_bit: function() {
         this.control_bus.set(this.memory.mr_index, -1);
      },
      toggle_mw_bit: function() {
         this.control_bus.set(this.memory.mw_index, -1);
      }
   },
   computed: {
      width: function() {
         return this.memory.width; 
      },
      mw_enabled: function() {
         return this.control_bus.get(this.memory.mw_index) ? true : false;
      },
      mr_enabled: function() {
         return this.control_bus.get(this.memory.mr_index) ? true : false;
      },
      output_bits: function() {
         const rtn = [];
         for(let i = 0; i < this.memory.width; ++i)
            rtn[i] = this.memory.get(i) ? true : false;
         return rtn;
      }
   },
   mounted: function() {
      this.control_bus.add_client(() => {
         this.$forceUpdate();
      });
      this.memory.add_client(() => {
         this.$forceUpdate();
      })
   }
}
</script>