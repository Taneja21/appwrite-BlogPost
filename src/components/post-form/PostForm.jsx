import React, { useEffect, useCallback, useState } from "react";
import { Button, Select, RTE, Input } from "../index";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import dbService from "../../appwrite/db";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        slug: post?.$id || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const [error, SetError] = useState("");
  const userData = useSelector((state) => state.auth.userData);
  
  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await dbService.uploadFile(data.image[0])
        : null;
      if (file) {
        await dbService.deleteFile(post.image);
      }
      const dbPost = await dbService.updatePost(post.$id, {
        ...data,
        image: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      console.log("Data is ::", data);
      const file = await dbService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;

        data.image = fileId;

        try {
          const dbPost = await dbService.createPost({
            ...data,
            userId: userData.$id,
            name: userData.name,
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        } catch (err) {
          console.log("Error is ::", err.message);
          SetError(err.message);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value.trim().toLowerCase().replace(/\s/g, "-");
    }

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, setValue, slugTransform]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title: "
          placeholder="Title"
          className="mb-2"
          {...register("title", { required: true })}
        />
        {error && <p className="text-red-600 mt-1 ">{error}</p>}
        <Input
          label="Slug: "
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content: "
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Image: "
          type="file"
          className="mb-4"
          accept="image/png image/jpg image/jpeg image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={dbService.getFilePreview(post.image)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}{" "}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
