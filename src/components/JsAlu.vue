<template>
   <b-card>
      <b-card-header>
         <b-card-title>Arithmetic Logic Unit</b-card-title>
      </b-card-header>
      <b-card-body>
         <div class="d-flex" >
            <div class="col">
               <js-register
                  :register="alu.a"
                  title="A Input" />
            </div>
            <div class="col" >
               <js-register
                  :register="alu.b"
                  title="B Input" />
            </div>
         </div>
         <div class="d-flex mt-2">
            <div class="col" />
            <js-register
               :register="alu.output"
               title="Output" />
            <div class="col" />
         </div>
      </b-card-body>
      <b-card-footer>
         <b-button
            v-on:click="toggle_subtract_bit"
            variant="primary"
            size="sm" >
            <led :powered="subtract_enabled" />
            Subtract Enabled
         </b-button>
      </b-card-footer>
   </b-card>
</template>

<script>
import JsRegister from "./JsRegister.vue";
import Led from "./Led.vue";


export default {
   name: "js-alu",
   components: {
      JsRegister,
      Led
   },
   computed: {
      subtract_enabled: function() {
         return this.control_bus.get(this.alu.op_index) ? true : false;
      }
   },
   methods: {
      toggle_subtract_bit: function() {
         this.control_bus.set(this.alu.op_index, -1);
         this.$forceUpdate();
      }
   },
   mounted: function() {
      this.alu.a.add_client(() => {
         this.$forceUpdate();
      });
      this.alu.b.add_client(() => {
         this.$forceUpdate();
      });
      this.alu.output.add_client(() => {
         this.$forceUpdate();
      })
   } 
}
</script>