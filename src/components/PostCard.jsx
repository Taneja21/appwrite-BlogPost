import React from "react";
import dbService from "../appwrite/db";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

function PostCard({ $id, title, image, name }) {
  return (
    <Link to={`/post/${$id}`}>
      <article className="group h-full overflow-hidden rounded-lg border-2 border-gray-200 border-opacity-60 shadow-lg">
        <img
          src={dbService.getFilePreview(image)}
          alt="Title Image"
          className="w-full transform object-cover object-center transition duration-500 ease-in-out group-hover:scale-105 md:h-36 lg:h-48"
        />
        <div className="py-1 px-6">
          <h2 className="title-font mb-3 inline-block cursor-pointer text-xl capitali font-extrabold tracking-wide text-gray-800">
            {title}
          </h2>
          {/* <p className="line-clamp-6 mb-3 cursor-pointer overflow-hidden leading-relaxed text-gray-500">
            {parse(content)}
          </p> */}
        </div>
        <div className="flex flex-wrap items-center justify-between px-6 pt-1 pb-4">
          <div className="flex flex-wrap text-sm text-gray-500">
            <span className="mr-1">{name}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default PostCard;
