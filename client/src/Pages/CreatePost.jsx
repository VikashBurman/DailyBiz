import { React, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const[files,setFiles] = useState("");

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  const modules = {
    toolbar: toolbarOptions,
  };

  const createNewPost =async(e)=>{
    // console.log(files);
    e.preventDefault();
    const data = new FormData();
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content)
    data.set('file',files[0]);
    const response = await fetch('http://localhost:4000/post',{
      method:'POST',
      body:data,
    })
  }
  return (
    <section className="flex items-center mt-10 ml-10">
      <form onSubmit={createNewPost}>
        <div className="mb-6">
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="Tittle"
            id="default-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
          />
        </div>
        <div className="mb-6">
          <input
            value={summary}
            onChange={(e) => {
              setSummary(e.target.value);
            }}
            placeholder="Summary"
            type="text"
            id="default-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
          />
        </div>
        <div className="mb-6">
          <input
          // value={files}
          onChange={(e)=>{
            setFiles(e.target.files)
          }}
            placeholder="choose file"
            type="file"
            id="default-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
          />
        </div>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={(newValue) => {
            setContent(newValue);
          }}
          modules={modules}
        />
        <button className="mt-2 rounded-sm bg-gray-600 p-2 font-semibold text-white w-full ">
          create post
        </button>
      </form>
    </section>
  );
};

export default CreatePost;