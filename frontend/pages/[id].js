import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Card } from 'shadcn';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:4000/posts/${id}`).then((response) => {
        setPost(response.data);
        setLoading(false);
      });
    }
  }, [id]);

  const handleDelete = async () => {
    await axios.delete(`http://localhost:4000/posts/${id}`);
    router.push('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-4 shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-lg">{post.content}</p>
        <Button onClick={() => setShowModal(true)} className="mt-6">Delete Post</Button>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this post?</h2>
          <div className="flex space-x-4">
            <Button variant="danger" onClick={handleDelete}>Yes, Delete</Button>
            <Button onClick={() => setShowModal(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}