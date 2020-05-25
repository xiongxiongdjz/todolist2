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
            :finish="item.finish"
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
      this.todos.push({
        content: content,
        finish: false,
        id: new Date().valueOf()
      });
    },
    selectAllJudge() {
      if (this.todos.every(todo => todo.finish)) {
        this.todos.forEach(todo => (todo.finish = false));
        localStorage.setItem("todos", JSON.stringify(this.todos));
      } else if (this.todos.some(todo => todo.finish)) {
        this.todos.forEach(todo => (todo.finish = true));
        localStorage.setItem("todos", JSON.stringify(this.todos));
      } else {
        this.todos.forEach(todo => (todo.finish = true));
        localStorage.setItem("todos", JSON.stringify(this.todos));
      }
    },
    todoContentChange(id, newContent) {
      const index = this.todos.findIndex(todo => todo.id == id);
      const todo = this.todos[index];
      todo.content = newContent;
      this.todos.splice(index, 1, todo);
    },
    todoOut(id) {
      const index = this.todos.findIndex(todo => todo.id == id);
      this.todos.splice(index, 1);
    },
    todoSelect(id) {
      const index = this.todos.findIndex(todo => todo.id == id);
      const todo = this.todos[index];
      todo.finish = !todo.finish;
      this.todos.splice(index, 1, todo);
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
      const newTodos = this.todos.filter(todo => !todo.finish);
      this.todos = newTodos;
    }
  },
  computed: {
    filters() {
      if (this.title == "completed") {
        return this.todos.filter(todo => todo.finish);
      } else if (this.title == "undone") {
        return this.todos.filter(todo => !todo.finish);
      } else {
        return this.todos;
      }
    }
  },
  watch: {
    todos(newValue, oldValue) {
      localStorage.setItem("todos", JSON.stringify(newValue));
    }
  },
  created() {
    if (JSON.parse(localStorage.getItem("todos")) != null) {
      this.todos = JSON.parse(localStorage.getItem("todos"));
    } else {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    }
  }
};
</script>

<style lang="scss" scoped>
.todolist {
  text-align: center;
}
</style>