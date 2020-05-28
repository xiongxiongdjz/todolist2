<template>
  <div>
    <input type="checkbox" @click="AselectAllJudge" :checked="select " v-show="this.todos.length" />
    <input type="text" v-model="text" @keyup.enter="enter" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ""
    };
  },
  props: ["access", "selectAllJudge", "todos"],
  methods: {
    enter() {
      if (this.text != "") {
        this.access(this.text);
        this.text = "";
      }
    },
    AselectAllJudge() {
      this.selectAllJudge();
    }
  },
  computed: {
    select() {
      if (this.todos.every(todo => todo.completed)) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>