<template>
  <div>
    <div v-show="this.todos.length">
      <button @click="title='all'">所有</button>
      <button @click="title='completed'">已完成</button>
      <button @click="title='undone'">未完成</button>
      <button @click="AoutSelected" v-show="display">删除选中项</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: null
    };
  },
  props: ["titleChange", "outSelected", "todos"],
  methods: {
    AtitleChange(title) {
      this.titleChange(title);
    },
    AoutSelected() {
      this.outSelected();
    }
  },
  computed: {
    display() {
      return this.todos.some(todo => todo.completed)
    }
  },
  watch: {
    title(newValue, oldValue) {
      this.AtitleChange(newValue);
    }
  }
};
</script>