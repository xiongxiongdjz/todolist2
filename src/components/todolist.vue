<template>
  <div class="todolist">
    <div class="todolist-1">
      <h2>代办事清单</h2>
    </div>
    <div class="todolist-2">
      <button @click="quanxuan">全选</button>
      <input type="text" v-model="newTodo" @keyup.enter="access" />
    </div>
    <div class="todolist-3">
      <ul>
        <li v-for="item in filters" :key="item.id">
          <button @click="zhuangtai(item)">完成or未完成</button>
          <p @dblclick="suangji(item)" v-show="!zt">{{item.title}}</p>
          <input type="text" v-model="values" v-show="zt" @keyup.enter="suangjiInput(item)" />
          <button @click="sanchu(item)">删除</button>
        </li>
      </ul>
      <button @click="wancheng = 'suoyou'">所有</button>
      <button @click="wancheng = 'weiwancheng'">未完成</button>
      <button @click="wancheng = 'yiwancheng'">已完成</button>
      <!-- v-show="todos.filter(todo => todo.model).length"表示有无完成项 除数字0以外都代表true 所以显示 -->
      <button @click="shanchuyiwancheng" v-show="todos.filter(todo => todo.model).length">删除已完成</button>
    </div>
    <!-- <div class="watch">
      <input type="text" v-model="msg" />
      <input type="text" v-model="comsg" />
    </div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: "",
      todos: [],
      wancheng: "suoyou",
      msg: "123",
      comsg: "",
      values: '',
      zt: false
    };
  },
  methods: {
    // 存取
    access() {
      if (this.newTodo != "") {
        this.todos.push({
          title: this.newTodo,
          model: false,
          // new Date().valueOf()
          id: new Date().valueOf()
        });
        // localStorage.setItem("todos", JSON.stringify(this.todos));
        this.newTodo = "";
      }
    },
    // 通过筛选id相同的对象剔除保存剩下id不同的对象
    sanchu(item) {
      this.todos = this.todos.filter(todo => todo.id != item.id);
      // localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    // 1.全选情况下按实现全不选
    // 2.全不选情况下按实现全选
    // 3.有未选情况下按实现全选
    quanxuan() {
      // 筛选出model值为true的对象等于0就是全部未完成
      if (this.todos.filter(todo => todo.model).length == 0) {
        let arr = this.todos;
        this.todos.map(arr => (arr.model = true));
        // localStorage.setItem("todos", JSON.stringify(this.todos));
      }
      // 小于todos数组的总长就是有未完成对象
      else if (
        this.todos.filter(todo => todo.model).length < this.todos.length
      ) {
        let arr = this.todos;
        this.todos.map(arr => (arr.model = true));
        // localStorage.setItem("todos", JSON.stringify(this.todos));
      }
      // 等于todos数组长度就是全部完成
      else if (
        this.todos.filter(todo => todo.model).length == this.todos.length
      ) {
        let arr = this.todos;
        this.todos.map(arr => (arr.model = false));
        // localStorage.setItem("todos", JSON.stringify(this.todos));
      }
    },
    // 筛选所有未完成的项目存入数组剔除完成的对象todo.model=true
    shanchuyiwancheng() {
      this.todos = this.todos.filter(todo => !todo.model);
      // localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    // 点击取反实现完成和未完成状态
    zhuangtai(item) {
      item.model = !item.model;
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    suangji(item) {
      this.values = item.title
      this.zt = !this.zt
    },
    suangjiInput(item) {
      item.title = this.values
      localStorage.setItem("todos", JSON.stringify(this.todos));
      this.zt = !this.zt
    }
  },
  computed: {
    filters() {
      // wancheng为"yiwancheng"时将todos中的完成项筛选出来
      if (this.wancheng == "yiwancheng") {
        return this.todos.filter(todo => todo.model);
      }
      // wancheng为"weiwancheng"时将todos中的未完成项筛选出来
      else if (this.wancheng == "weiwancheng") {
        return this.todos.filter(todo => !todo.model);
      }
      // 其他情况下不筛选返回整个数组
      else {
        return this.todos;
      }
    }
  },
  created() {
    // 页面加载时将本地key值为todos的数组赋值给data里的todos数组
    this.todos = JSON.parse(localStorage.getItem("todos"));
  },
  watch: {
    // msg(newval, old) {
    //   console.log(newval+'newval', old+'old');
    //   this.comsg = this.msg
    //     .split("")
    //     .reverse()
    //     .join("");
    // }
    todos(newval, old) {
      // console.log(newval+'newval', old+'old')
      localStorage.setItem("todos", JSON.stringify(newval));
    }
  }
};
</script>

<style lang="scss" scoped>
</style>