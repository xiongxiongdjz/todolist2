<template>
  <div class="todolist2">
    <div class="tidolist2-1">
      <h2>代办事清单2</h2>
    </div>
    <div class="tidolist2-2">
      <button @click="quanxuan">全选</button>
      <input type="text" v-model="content" @keyup.enter="access" />
    </div>
    <div class="tidolist2-3">
      <ul>
        <li v-for="item in filters" :key="item.id.id">
          <button @click="item.finished.finished = !item.finished.finished">完成</button>
          <span v-show="!display" @dblclick="display = !display;">{{item.todo.content}}</span>
          <input
            type="text"
            v-model="text"
            v-show="display"
            @keyup.enter="item.todo.content = text; display = !display"
          />
          <button @click="shanchu(item)">删除</button>
        </li>
      </ul>
      <button @click="title = 'all'">所有</button>
      <button @click="title = 'weiwancheng'">未完成</button>
      <button @click="title = 'yiwancheng'">已完成</button>
      <button
        @click="shanchuxuanzhongxiang"
        v-show="todos.filter(todo => todo.finished.finished).length"
      >删除选中项</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      todos: [],
      title: "all",
      text: "",
      display: false
    };
  },
  methods: {
    access() {
      if (this.content != "") {
        // this.todos.push({
        //   content: { content: this.content },
        //   id: { id: new Date().valueOf() },
        //   finished: { finished: false }
        // });
        // let timestamp = new Date().valueOf()
        // this.todos = {
        //   todo: {
        //     content: this.content,
        //     id: new Date().valueOf(),
        //     finished: false
        //   }
        // };
        this.todos.push({
          todo: {
            content: this.content,
            id: new Date().valueOf(),
            finished: false
          },
          id: { id: new Date().valueOf() },
          finished: { finished: false }
        });
        this.content = "";
      }
    },
    shanchu(item) {
      this.todos = this.todos.filter(todo => todo.id.id != item.id.id);
    },
    quanxuan() {
      if (this.todos.filter(todo => todo.finished.finished).length == 0) {
        this.todos.map(todo => (todo.finished.finished = true));
      } else if (
        this.todos.filter(todo => !todo.finished.finished).length == 0
      ) {
        this.todos.map(todo => (todo.finished.finished = false));
      } else {
        this.todos.map(todo => (todo.finished.finished = true));
      }
    },
    shanchuxuanzhongxiang() {
      this.todos = this.todos.filter(todo => !todo.finished.finished);
    }
  },
  computed: {
    filters() {
      if (this.title == "yiwancheng") {
        return this.todos.filter(todo => todo.finished.finished);
      } else if (this.title == "weiwancheng") {
        return this.todos.filter(todo => !todo.finished.finished);
      } else {
        return this.todos;
      }
    }
  },
  created() {
    this.todos = JSON.parse(localStorage.getItem("todos2"));
  },
  watch: {
    todos(newvalue, oldvalue) {
      localStorage.setItem("todos2", JSON.stringify(newvalue));
    }
  }
};
</script>

<style lang="">
</style>