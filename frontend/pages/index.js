// frontend/pages/index.js

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Button, Card, Spinner } from 'shadcn';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4000/posts').then((response) => {
      setPosts(response.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Spinner className="m-auto mt-20" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-4 shadow-lg">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-500">{post.content.slice(0, 100)}...</p>
            <Link href={`/${post.id}`}>
              <Button className="mt-4">View</Button>
            </Link>
          </Card>
        ))}
      </div>
      <Link href="/create">
        <Button className="mt-8">Create New Post</Button>
      </Link>
    </div>
  );
}