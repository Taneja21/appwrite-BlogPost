import React, { useState, useEffect } from "react";
import dbService from "../appwrite/db";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const authStore = useSelector((state) => state.auth.status);

  const userStore = useSelector((state) => state.auth.userData);

  useEffect(() => {
    dbService.getPosts().then((posts) => {
      if (posts) {
        const userPosts = posts.documents.filter(
          (post) => post.userId === userStore.$id
        );
        setPosts(userPosts);
      }
    });
  }, []);

  if (!authStore) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to Read Posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Welcome {userStore.name}
              </h1>
              <p>There are no active posts. You can create a new post</p>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <h1 className="text-2xl font-bold hover:text-gray-500">
              Welcome {userStore.name}
            </h1>
          </div>
          {posts.map((post) => {
            return (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default Home;
