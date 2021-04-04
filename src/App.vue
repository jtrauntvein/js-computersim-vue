<template>
  <div id="app" class="container-fluid">
    <div class="d-flex" >
      <div class="col">
        <js-clock />
      </div>
      <div class="col-5" >
        <JsBus 
          :size="8" 
          :bus="data_bus"
          title="Data Bus" />
      </div>
      <div class="col">
        <js-register
          :clock="clock"
          :control_bus="control_bus"
          :data_bus="data_bus"
          :register="register"
          :re_bit="register_read_bit"
          :we_bit="register_write_bit" />
      </div>
    </div>
  </div>
</template>

<script>
import JsClock from "./components/JsClock.vue"
import JsRegister from "./components/JsRegister.vue";
import JsBus from "./components/JsBus.vue";


export default {
  name: 'App',
  components: {
    JsClock,
    JsRegister,
    JsBus
  },
  data: function() {
    return {
    };
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
