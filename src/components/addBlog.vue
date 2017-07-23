<template>
    <div id="add-blog">
        <h2>Add a New Blog Post</h2>
        <form v-if="!submitted">
            <label>Blog Title:</label>
            <input type="text" v-model.lazy="blog.title" required ></input>
            <label>Blog Content:</label>
            <textarea v-model.lazy.trim="blog.content"></textarea>
            <div id="checkboxses">
                <label>Ninjas</label>
                <input type="checkbox" value="ninjas" v-model="blog.categories">
                <label>Wisards</label>
                <input type="checkbox" value="wisards" v-model="blog.categories">
                <label>Mario</label>
                <input type="checkbox" value="mario" v-model="blog.categories">
                <label>Chese</label>
                <input type="checkbox" value="chese" v-model="blog.categories">
            </div>
    
            <label>Author:</label>
            <select v-model="blog.author">
                <option v-for="author in authors">{{author}}</option>
            </select>
            <button v-on:click.prevent="post">Add Blog</button>
    
        </form>
    
        <div v-if="submitted">
            <h3>Thank for adding your post!</h3>
        </div>
    
        <div id="preview">
            <h3>Preview blog</h3>
            <p>Blog title: {{ blog.title }}</p>
            <p>Blog content:</p>
            <p style="white-space: pre">{{ blog.content }}</p>
            <p>Blog Categories:</p>
            <ul>
                <li v-for="category in blog.categories">{{category}}</li>
            </ul>
            <p>Author: {{blog.author}}</p>
        </div>
    </div>
</template>

<script>
    // Imports

    export default {
      data () {
        return {
          blog: {
            title: '',
            content: '',
            categories: [],
            author: ''
          },
          authors: ['Timur', 'Ivan', 'Ira'],
          submitted: false
        }
      },
      methods: {
        post: function () {
          this.$http.post('https://jsonplaceholder.typicode.com/posts', {
            title: this.blog.title,
            body: this.blog.content,
            iserID: 1
          }).then(
            function (data) {
              console.log(data)
              this.submitted = true
            },
            function (error) {
              console.log('Ошибка - ' + error.status)
            }
          )
        }

      }
    }
</script>

<style>
    #add-blog * {
        box-sizing: border-box;
    }
    
    #add-blog {
        margin: 20px auto;
        max-width: 500px;
    }
    
    label {
        display: block;
        margin: 20px 0 10px;
    }
    
    input[type="text"],
    textarea,
    select {
        display: block;
        width: 100%;
        padding: 8px;
    }
    
    button {
        display: block;
        width: 100%;
        padding: 8px;
        margin: 20px 0 10px;
    }
    
    #preview {
        padding: 10px 20px;
        border: 1px dotted #ccc;
        margin: 30px 0;
    }
    
    h3 {
        margin-top: 10px;
    }
    
    #checkboxses input {
        display: inline-block;
        margin-right: 10px;
    }
    
    #checkboxses label {
        display: inline-block;
    }
</style>
