export default function BlogCard({ post }) {
    return (
      <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>
    );
  }
  