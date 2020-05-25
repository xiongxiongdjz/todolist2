<template>
  <div>
    <div v-if="status">
      <input type="text" @keyup.enter="enter(item.id)" v-model="content" />
    </div>
    <div v-else @dblclick="status=true">
      <input type="checkbox" :checked="selected" @click="select(item.id)" />
      {{content}}
      <button @click="out(item.id)">删除</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: this.item.content,
      status: false,
      selected: this.finish
    };
  },
  props: ["item", "todoContentChange", "todoOut", "todoSelect", "finish"],
  methods: {
    enter(id) {
      const newContent = this.content;
      this.todoContentChange(id, newContent);
      this.status = false;
    },
    out(id) {
      this.todoOut(id);
    },
    select(id) {
      this.todoSelect(id);
      this.selected = !this.selected;
    }
  },
  watch: {
    finish (newValue, oldValue) {
      this.selected = newValue
    }
  },
};
</script>