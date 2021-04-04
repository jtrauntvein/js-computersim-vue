<template>
   <b-card >
      <b-card-header>
         <b-card-title title="System Clock" />
      </b-card-header>
      <b-card-body>
         <b-form>
            <div class="d-flex flex-row m-3" >
               <b-form-group class="m-2" >
                  <b-radio-group 
                     v-model="clock_mode"
                     :options="clock_options" 
                     :stacked="true"
                     v-on:change="configure_clock" />
               </b-form-group>
               <b-form-group label="Interval (ms)" class="m-2" >
                  <b-form-input
                     v-model="interval"
                     v-on:change="configure_clock" />
               </b-form-group>
               <b-form-group class="m-2" >
                  <Led :powered="asserted" />
               </b-form-group>
            </div>
         </b-form>
      </b-card-body>
      <b-card-footer>
         <b-button 
            variant="primary"
            v-on:click="on_manual_clock" >
            Manual Cycle
         </b-button>
      </b-card-footer>
   </b-card>
</template>

<script>
import Led from "./Led.vue";

export default {
   name: "js-clock",
   components: {
      Led
   },
   data: function() {
      return {
         clock_options: [
            { value: "auto", text: "Automatic" },
            { value: "manual", text: "Manual" }
         ],
         clock_mode: "manual",
         asserted: false,
         interval: 1000
      };
   },
   methods: {
      on_manual_clock: function() {
         this.clock.cycle();
         this.clock_mode = "manual";
      },
      configure_clock: function() {
         this.clock.auto_clock = (this.clock_mode === "auto");
         this.clock.set_interval(this.interval);
         if(this.clock.auto_clock)
            this.clock.start();
         else
            this.clock.stop();
      }
   },
   mounted: function() {
      this.clock.add_rising_client(() => {
         this.asserted = true;
      });
      this.clock.add_falling_client(() => {
         this.asserted = false;
      });
      this.interval = this.clock.interval;
      this.clock_mode = this.clock.auto_clock ? "auto" : "manual";
   }
};

</script>
