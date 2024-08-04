import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

// control will come from react-hook-form and this control is responsible for iski sari state ko us form me le jane ke liye because this is rightnow is a component so from component to form 
// so from where we will paas this control wehen we will use this RTE 
export default function RTE({name, control, label, defaultValue = ""}) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

            <Controller
            name = {name || "content"}
            control={control}
            render={({field: {onChange}}) => (
                <Editor
        initialValue={defaultValue}
        apiKey='rdng6nbc9wvh4gf60zoz150687fjulzp9dit89sl4ng05zyc'
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />
            )}
            />
        </div>
    )
}

