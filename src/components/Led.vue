<template>
   <div>
      <b-icon-circle :class="led_classes" />
   </div>
</template>

<script>
export default {
   name: "Led",
   props: {
      powered: Boolean
   },
   computed: {
      led_classes: function() {
         const rtn = [ "led", "m-2", "align-middle" ];
         if(this.powered)
            rtn.push("led-on");
         return rtn;
      }

   }
};
</script>

<style scoped>
.led {
   border-radius: 50%;
   width: 1.5rem;
   height: 1.5rem;
}

.led-on {
   background-color: red;
}
</style>