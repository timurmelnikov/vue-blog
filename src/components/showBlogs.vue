<template>
  <div v-theme:column="'narrow'" id="show-blogs">
    <h1>All Blog Articles</h1>
    <input class="search-input" v-model="search" v-focus type="text" placeholder="search blogs"></input>
    <div v-for="blog in filtredBlogs" class="single-blog">
      <router-link v-bind:to="'/blog/' + blog.id">
        <h2 v-rainbow>{{ blog.title | to-uppercase }}</h2>
      </router-link>
      <article>{{ blog.content | snippet }}</article>
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
    this.$http.get('https://nn-vue-playlist-a1c13.firebaseio.com/posts.json').then(function (data) {
      return data.json()
      // this.blogs = data.body.slice(0, 10)
    }).then(function (data) {
      var blogsArray = []

      for (let key in data) {
        data[key].id = key
        blogsArray.push(data[key])
      }

      this.blogs = blogsArray
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
        setTimeout(() => { el.focus() }, 0)
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

input {
  display: block;
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
</style>
