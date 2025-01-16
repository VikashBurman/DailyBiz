import {  useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
//to create a new post

const CreatePost = () => {
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const Backend_URL = import.meta.env.VITE_BACKEND_URL;

  const createNewPost = async (e) => {
    // console.log(files);
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    const response = await fetch(`${Backend_URL}/post`, {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      toast.success("Post Created Succesfully");
      setRedirect(true);
    }
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <section className="flex items-center m-10 p-2  max-sm:m-8 justify-center max-sm:w-[90%] ">
      <form onSubmit={createNewPost}>
        <div className="mb-6">
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="Tittle"
            id="title"
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
            id="summary"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
          />
        </div>
        <div className="mb-6">
          <input
            // value={files}
            onChange={(e) => {
              setFiles(e.target.files);
            }}
            placeholder="choose file"
            type="file"
            id="files"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
          />
        </div>
        <div id="text-editor">
        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newValue) => {
            setContent(newValue);
          }}
        />
        </div>
        <button className="mt-2 rounded-sm bg-gray-600 hover:bg-gray-700 p-2 font-semibold text-white w-full ">
          Create Post
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
