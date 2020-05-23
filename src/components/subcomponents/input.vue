<template>
  <div class="input">
    <input type="text" v-model="text" v-show="display" @keyup.enter="inputEnter" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      display: false
    };
  },
  methods: {
    inputEnter() {
      this.display = !this.display;
    }
  }
};
</script>