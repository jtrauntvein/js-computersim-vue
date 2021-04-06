import { VirtualClock } from "./clock.js";
import { VirtualBus } from "./bus.js";
import { VirtualRegister } from "./register.js";

const the_clock = new VirtualClock(true, 1000);
const the_bus = new VirtualBus();
const the_control_bus = new VirtualBus;
const register_read_bit = 0;
const register_write_bit = 1;
const the_register = new VirtualRegister({
   data_bus: the_bus,
   clock: the_clock,
   control_bus: the_control_bus,
   read_enable_idx: register_read_bit,
   write_enable_idx: register_write_bit
});
the_clock.auto_clock = false;
the_clock.set_interval(1000);

export default {
   data: function() {
      return {
         clock: the_clock,
         data_bus: the_bus,
         control_bus: the_control_bus,
         register0: the_register,
         register_read_bit: register_read_bit,
         register_write_bit: register_write_bit
      }
   },
   methods: {
   }
};