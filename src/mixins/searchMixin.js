export default {
    computed: {
        filtredBlogs: function () {
            return this.blogs.filter((blog) => {
                return blog.title.match(this.search.toLowerCase())
            })
        }
    }


}