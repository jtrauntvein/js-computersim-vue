import { VirtualClock } from "./clock.js";
import { VirtualBus } from "./bus.js";
import { VirtualRegister } from "./register.js";
import { VirtualALU } from "./alu.js";

const the_clock = new VirtualClock(true, 1000);
const the_bus = new VirtualBus();
const the_control_bus = new VirtualBus();
const register0_read_bit = 0;
const register0_write_bit = 1;
const alu_ain_bit = 2;
const alu_bin_bit = 3;
const alu_out_bit = 4;
const alu_subtract_bit = 5;
const the_register = new VirtualRegister({
   data_bus: the_bus,
   clock: the_clock,
   control_bus: the_control_bus,
   read_enable_idx: register0_read_bit,
   write_enable_idx: register0_write_bit
});
const the_alu = new VirtualALU({
   clock: the_clock,
   data_bus: the_bus,
   control_bus: the_control_bus,
   bus_size: the_register.size,
   ai_index: alu_ain_bit,
   bi_index: alu_bin_bit,
   output_index: alu_out_bit,
   op_index: alu_subtract_bit
})
the_clock.auto_clock = false;
the_clock.set_interval(1000);

export default {
   data: function() {
      return {
         clock: the_clock,
         data_bus: the_bus,
         control_bus: the_control_bus,
         register0: the_register,
         alu: the_alu,
         register0_read_bit: register0_read_bit,
         register0_write_bit: register0_write_bit
      }
   },
   methods: {
   }
};