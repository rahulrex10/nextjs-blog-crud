// frontend/pages/create.js

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Input, Button, TextArea } from 'shadcn';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:4000/posts', { title, content });
    setSuccess(true);
    setTitle('');
    setContent('');
    setTimeout(() => router.push('/'), 1500); // Redirect after success
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create a New Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextArea
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <Button type="submit">Submit</Button>
      </form>
      {success && <p className="text-green-500 mt-4">Post created successfully!</p>}
    </div>
  );
}