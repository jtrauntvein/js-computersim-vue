<template>
   <b-card>
      <b-card-header >
         <b-card-title>{{title}}</b-card-title>
      </b-card-header>
      <b-card-body>
         <div class="d-flex flex-row m-2" >
            <Led 
               v-for="index in register_size"
               :key="index"
               :powered="register_bits[index - 1]" />
         </div>
      </b-card-body>
      <b-card-footer>
         <b-button 
            v-on:click="toggle_re" 
            variant="primary"
            size="sm" >
            <Led :powered="read_enabled" /> 
            Read Enabled
         </b-button>
         <b-button 
            v-on:click="toggle_we" 
            class="ml-2" 
            variant="primary"
            size="sm" >
            <Led :powered="write_enabled" />
            Write Enabled
         </b-button>
      </b-card-footer>
   </b-card>
</template>

<script>
import Led from "./Led.vue";

export default {
   name: "js-register",
   components: {
      Led
   },
   props: {
      title: String,
      register: Object
   },
   data: function() {
      return {
         re_bit: this.register.read_enable_idx,
         we_bit: this.register.write_enable_idx
      }
   },
   methods: {
      toggle_re: function() {
         this.control_bus.set(this.re_bit, -1);
      },
      toggle_we: function() {
         this.control_bus.set(this.we_bit, -1);
      }
   },
   computed: {
      write_enabled: function() {
         return this.control_bus.get(this.we_bit) ? true : false;
      },
      read_enabled: function() {
         return this.control_bus.get(this.re_bit) ? true : false;
      },
      register_bits: function() {
         const rtn = [];
         for(let i = 0; i < this.register.size; ++i)
            rtn[i] = this.register.get(i) ? true : false;
         return rtn;
      },
      register_size: function() {
         return this.register.size;
      }
   },
   mounted: function () {
      this.control_bus.add_client(() => {
         this.$forceUpdate();
      });
      this.register.add_client(() => {
         this.$forceUpdate();
      });
   }
}
</script>