<template>
  <div v-theme:column="'narrow'" id="show-blogs">
      <h1>All Blog Articles</h1>
    <input v-focus v-model="search" type="text" placeholder="search blogs"></input>
    <div v-for="blog in filtredBlogs" class="single-blog">
      <h2 v-rainbow>{{ blog.title | to-uppercase }}</h2>
      <article>{{ blog.body | snippet }}</article>
    </div>
  
  </div>
</template>

<script>
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
      filtredBlogs: function () {
        return this.blogs.filter((blog) => {
          return blog.title.match(this.search)
        })
      }
    },
    created () {
      this.$http.get('http://jsonplaceholder.typicode.com/posts').then(function (data) {
        this.blogs = data.body.slice(0, 10)
      })
    },
    directives: {
      focus: {
        inserted: function (el) {
          // Переключаем фокус на элемент
          el.focus()
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
