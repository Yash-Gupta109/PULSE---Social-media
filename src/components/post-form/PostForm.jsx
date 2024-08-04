import React, {useCallback} from 'react'
import {useForm} from 'react-hook-form'
import {Button, Input, RTE, Select} from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PostForm({post}) {
    // if we have to moniter any feild contnuously then we use watch
    // if we have to set any value in any form so we use setValue because we are using react forms
    // if we want the control of any form so we use control and this control we will paas in RTE so from there we will get all the syntax and everything
    
    const {register, handleSubmit, watch, setValue, control ,getValues} =useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    })

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData)

    const submit = async (data) => {
        if(post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
        

        if(file){
            appwriteService.deleteFile(post.featuredImage)
        }
        const dbPost = await appwriteService.updatePost(post.$id, {
            ...data,
            featuredImage: file?file.$id : undefined,
        });
            if(dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
    } else{
        const file=await appwriteService.uploadFile(data.image[0]);
        if(file){
            const fileId = file.$id;
            data.featuredImage = fileId;
            const dbPost = await appwriteService.createPost({...data, userId:userData.$id}
        )
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }
    }};

    const slugTransform = useCallback((value) => {
        if(value && typeof value === "string")
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g , '-')
        
            return "";
    },[])

    React.useEffect(() => {
        const subscription = watch((value, {name}) => {
            if(name === "title"){
                setValue("slug", slugTransform(value.title),
                    {shouldValidate: true}
                
            )
            }
        })

        // here we are using this just for optimization purpose
        // name is not ismportant name cam be anything and we can do that .unscbscribe() so that vo khud hi me ghoom ke na reh jaaye baar baar call hone ke liye
        return ()=> subscription.unsubscribe()
    },[watch, slugTransform,setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
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
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

