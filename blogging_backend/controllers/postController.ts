const posts: any[] = [];

export class PostController {
    public async createPost(req: any, res: any) {
        const { title, content } = req.body;
        const authorId = req.userId;
        const newPost = {
            id: posts.length + 1,
            title,
            content,
            authorId,
            comments: []
        };
        posts.push(newPost);
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    }

    public async getPost(req: any, res: any) {
        const postId = parseInt(req.params.id);
        const post = posts.find(p => p.id === postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json({ message: 'Post retrieved successfully', post });
    }

    public async updatePost(req: any, res: any) {
        const postId = parseInt(req.params.id);
        const post = posts.find(p => p.id === postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        if (post.authorId !== req.userId) return res.status(403).json({ message: 'Unauthorized' });
        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        res.status(200).json({ message: `Post with ID ${postId} updated successfully`, post });
    }

    public async deletePost(req: any, res: any) {
        const postId = parseInt(req.params.id);
        const index = posts.findIndex(p => p.id === postId);
        if (index === -1) return res.status(404).json({ message: 'Post not found' });
        if (posts[index].authorId !== req.userId) return res.status(403).json({ message: 'Unauthorized' });
        posts.splice(index, 1);
        res.status(200).json({ message: `Post with ID ${postId} deleted successfully` });
    }

    public async addComment(req: any, res: any) {
        const postId = parseInt(req.params.id);
        const post = posts.find(p => p.id === postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        const comment = {
            id: post.comments.length + 1,
            content: req.body.content,
            authorId: req.userId
        };
        post.comments.push(comment);
        res.json({ message: 'Comment added', comment });
    }
}
