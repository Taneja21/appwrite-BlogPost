import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import dbService from "../appwrite/db";
import { Container, Button } from "../components";
import parse from "html-react-parser";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();

  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (slug) {
      dbService.getPost(slug).then((blog) => {
        if (blog) {
          setPost(blog);
        } else {
          console.log("Direct Navigate");
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);

  const isAuthor = post && userData ? post.userId === userData.$id : false;
  console.log("is Author ::", isAuthor);

  const deletePost = () => {
    dbService.deletePost(post.$id).then((status) => {
      if (status) {
        dbService.deleteFile(post.image);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={dbService.getFilePreview(post.image)}
            alt={post.title}
            className="rounded-xl"
          />
          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
        <div className="flex flex-wrap text-sm text-gray-500 mt-24">
          <span className="mr-1">{post.name}</span>
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
