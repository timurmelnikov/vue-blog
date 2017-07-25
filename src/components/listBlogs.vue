<template>
  <div v-theme:column="'narrow'" id="show-blogs">
    <h1>List Blog Titles</h1>
    <input v-model="search" v-focus type="text" placeholder="search blogs"></input>
    <div v-for="blog in filtredBlogs" class="single-blog">
      <h2 v-rainbow>{{ blog.title | to-uppercase }}</h2>
    </div>
  
  </div>
</template>

<script>

import searchMixin from '../mixins/searchMixin'

  export default {
    data () {
      return {
        blogs: [],
        search: ''
      }
    },
    methods: {
    },
    computed: {
    },
    created () {
      this.$http.get('http://jsonplaceholder.typicode.com/posts').then(function (data) {
        this.blogs = data.body.slice(0, 10)
      })
    },

    mixins: [searchMixin],

    filters: {
      toUppercase (value) {
        return value.toUpperCase()
      }
    },

    directives: {
      'focus': {
        bind (el) {
          // Переключаем фокус на элемент (работает через таймер)
          setTimeout(() => { el.focus() }, 0);
        }
      },

      'rainbow': {
        bind (el, binding, vnode) {
          el.style.color = '#' + Math.random().toString(16).slice(2, 8)
        }
      }
    }
  }
</script>

<style>
  #show-blogs {
    max-width: 800px;
    margin: 0px auto;
  }
  
  .single-blog {
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #eee;
  }
</style>
