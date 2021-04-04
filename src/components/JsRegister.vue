<template>
   <b-card>
      <b-card-header >
         <b-card-title>Register</b-card-title>
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
      re_bit: Number,
      we_bit: Number
   },
   data: function() {
      return {
         write_enabled: false,
         read_enabled: false,
         register_bits: []
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
      register_size: function() {
         return this.register.size;
      }
   },
   mounted: function () {
      this.control_bus.add_client((bus) => {
         this.write_enabled = bus.get(this.we_bit) ? true : false;
         this.read_enabled = bus.get(this.re_bit) ? true : false;
      });
      for(let i = 0; i < this.register.size; ++i)
         this.register_bits[i] = this.register.get() ? true : false;
      this.register.add_client((register) => {
         for(let i = 0; i < register.size; ++i)
            this.register_bits[i] = register.get(i) ? true : false;
         this.$forceUpdate();
      });
      for(let i = 0; i < this.register.size; ++i)
         this.register_bits[i] = this.register.get(i) ? true : false;
   }
}
</script>