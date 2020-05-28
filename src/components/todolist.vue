<template>
  <div class="todolist">
    <h2>代办事清单</h2>
    <div class="todolist-1">
      <ainput :access="access" :selectAllJudge="selectAllJudge" :todos="todos" />
    </div>
    <div class="todolist-2">
      <ul>
        <li v-for="item in filters" :key="item.id">
          <atodo
            :item="item"
            :todoContentChange="todoContentChange"
            :todoOut="todoOut"
            :todoSelect="todoSelect"
            :finish="item.completed"
          />
        </li>
      </ul>
    </div>
    <div class="todolist-3">
      <abutton :titleChange="titleChange" :outSelected="outSelected" :todos="todos" />
    </div>
  </div>
</template>

<script>
import Ainput from "./A-input";
import Atodo from "./A-todo";
import Abutton from "./A-button";
import axios from "axios";
export default {
  data() {
    return {
      todos: [],
      title: "all"
    };
  },
  components: {
    Ainput,
    Atodo,
    Abutton
  },
  methods: {
    access(content) {
      // 新建资源.post
      axios
        .post("http://10.7.10.2:9000/todos", { title: content })
        .then(res => {
          this.todos.push(res.data);
        });
    },
    // 选中所有
    selectAllJudge() {
      if (this.todos.every(todo => todo.completed)) {
        this.todos.forEach(todo => (todo.completed = false));
      } else if (this.todos.some(todo => todo.completed)) {
        this.todos.forEach(todo => (todo.completed = true));
      } else {
        this.todos.forEach(todo => (todo.completed = true));
      }
    },
    // 改变内容
    todoContentChange(id, newContent) {
      axios
        .patch("http://10.7.10.2:9000/todos" + "/" + id, {
          title: newContent
        })
        .then(res => {
          const index = this.todos.findIndex(todo => todo.id == id);
          this.todos.splice(index, 1, res.data);
        });
    },
    // 删除
    todoOut(id) {
      axios.delete("http://10.7.10.2:9000/todos" + "/" + id).then(res => {
        const index = this.todos.findIndex(todo => todo.id == id);
        this.todos.splice(index, 1);
      });
    },
    // 选择
    todoSelect(id) {
      const index = this.todos.findIndex(todo => todo.id == id);
      const todo = this.todos[index];
      axios
        .patch("http://10.7.10.2:9000/todos" + "/" + id, {
          completed: !todo.completed
        })
        .then(res => {
          this.todos.splice(index, 1, res.data);
        });
    },
    titleChange(title) {
      switch (this.title) {
        case 0:
          this.title = title;
          this.filters;
          break;
        case 1:
          this.title = title;
          this.filters;
        default:
          this.title = title;
          this.filters;
          break;
      }
    },
    outSelected() {
      const newTodos = this.todos.filter(todo => !todo.completed);
      this.todos = newTodos;
    }
  },
  computed: {
    filters() {
      if (this.title == "completed") {
        return this.todos
          .filter(todo => todo.completed)
          .sort((a, b) => a.id - b.id);
      } else if (this.title == "undone") {
        return this.todos
          .filter(todo => !todo.completed)
          .sort((a, b) => a.id - b.id);
      } else {
        return this.todos.sort((a, b) => a.id - b.id);
      }
    }
  },
  watch: {
  },
  created() {
    // 取出资源.get
    axios
      .get("http://10.7.10.2:9000/todos")
      .then(res => {
        this.todos = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>
.todolist {
  text-align: center;
}
</style>