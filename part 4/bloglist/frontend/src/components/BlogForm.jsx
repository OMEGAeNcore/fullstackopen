const BlogForm = (props) => {
    return (
        <form onSubmit={props.postBlog}>
            <div>
                <div>title: <input value={props.formHandlers.title} onChange={props.formHandlers.handleTitle} /></div>
                <div>author: <input value={props.formHandlers.author} onChange={props.formHandlers.handleAuthor} /></div>
                <div>url: <input value={props.formHandlers.url} onChange={props.formHandlers.handleUrl} /></div>
                <div><button type="submit">create</button></div>
            </div>
        </form>
    )
}

export default BlogForm