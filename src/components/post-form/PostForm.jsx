import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import appwriteService from "../../appwrite/conf"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PostForm({ post }) {

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    // ✅ Redirect if not logged in
    useEffect(() => {
        if (!userData) {
            navigate("/login")
        }
    }, [userData, navigate])

    const submit = async (data) => {
        try {
            if (post) {
                const file = data.image[0]
                    ? await appwriteService.uploadFile(data.image[0])
                    : null;

                if (file) {
                    await appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    const dbPost = await appwriteService.createPost({
                        ...data,
                        featuredImage: file.$id,
                        userId: userData.$id,
                    });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (error) {
            console.log("Post Error:", error)
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    // ✅ Prevent crash before redirect
    if (!userData) return null;

    return (
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {post ? "Update Post" : "Create Post"}
            </h2>

            <form onSubmit={handleSubmit(submit)} className="flex flex-col md:flex-row gap-6">

                {/* LEFT */}
                <div className="w-full md:w-2/3 space-y-4">

                    <Input
                        label="Title"
                        placeholder="Enter title"
                        {...register("title", { required: true })}
                    />

                    <Input
                        label="Slug"
                        placeholder="Slug"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />

                    <RTE
                        label="Content"
                        name="content"
                        control={control}
                        defaultValue={getValues("content")}
                    />

                </div>

                {/* RIGHT */}
                <div className="w-full md:w-1/3 space-y-4">

                    <Input
                        label="Featured Image"
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />

                    {post && (
                        <div className="w-full">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg w-full h-48 object-cover"
                            />
                        </div>
                    )}

                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        {...register("status", { required: true })}
                    />

                    <Button
                        type="submit"
                        className={`w-full text-white py-2 rounded-lg ${post ? "bg-green-500" : "bg-blue-500"}`}
                    >
                        {post ? "Update Post" : "Create Post"}
                    </Button>

                </div>

            </form>
        </div>
    );
}