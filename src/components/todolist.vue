<template>
  <div class="todolist2">
    <div class="tidolist2-1">
      <h2>代办事清单1</h2>
    </div>
    <div class="tidolist2-2">
      <button @click="quanxuan">全选</button>
      <input type="text" v-model="content" @keyup.enter="access" />
    </div>
    <div class="tidolist2-3">
      <ul>
        <li v-for="item in filters" :key="item.id">
          <button @click="item.finished = !item.finished" v-show="item.id != id">完成</button>
          <span @dblclick="shuangji(item)" v-show="item.id != id">{{item.content}}</span>
          <input
            type="text"
            v-model="text"
            v-show="item.id === id"
            @keyup.enter="inputEnter(item)"
            @blur="inputEnter(item)"
          />
          <button @click="shanchu(item)" v-show="item.id != id">删除</button>
        </li>
      </ul>
      <button @click="title = 'all'">所有</button>
      <button @click="title = 'weiwancheng'">未完成</button>
      <button @click="title = 'yiwancheng'">已完成</button>
      <button
        @click="shanchuxuanzhongxiang"
        v-show="todos.filter(todo => todo.finished).length"
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
      id: null
    };
  },
  methods: {
    access() {
      if (this.content != "") {
        this.todos.push({
          content: this.content,
          id: new Date().valueOf(),
          finished: false
        });
        this.content = "";
      }
    },
    shanchu(item) {
      this.todos = this.todos.filter(todo => todo.id != item.id);
    },
    quanxuan() {
      if (this.todos.filter(todo => todo.finished).length == 0) {
        this.todos.map(todo => (todo.finished = true));
      } else if (this.todos.filter(todo => !todo.finished).length == 0) {
        this.todos.map(todo => (todo.finished = false));
      } else {
        this.todos.map(todo => (todo.finished = true));
      }
    },
    shanchuxuanzhongxiang() {
      this.todos = this.todos.filter(todo => !todo.finished);
    },
    shuangji(item) {
      this.id = item.id;
      this.text = item.content;
    },
    inputEnter(item) {
      if (this.text != "") {
        item.content = this.text;
        this.id = null;
        localStorage.setItem("todos2", JSON.stringify(this.todos));
      } else {
        item.content = item.content;
        this.id = null;
      }
    }
  },
  computed: {
    filters() {
      if (this.title == "yiwancheng") {
        return this.todos.filter(todo => todo.finished);
      } else if (this.title == "weiwancheng") {
        return this.todos.filter(todo => !todo.finished);
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