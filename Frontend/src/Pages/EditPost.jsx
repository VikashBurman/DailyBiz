import { React, useEffect, useState,useRef } from "react";
import JoditEditor from "jodit-react";
import { Navigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const EditPost = () => {
  
  const editor = useRef(null);
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
//   const[cover,setCover] = useState("");
  const [redirect, setRedirect] = useState(false);


  useEffect(() => {
    fetch("https://blogapp-gsdt.onrender.com/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
    });
  }, []);

  const updatePost = async(e) => {

    e.preventDefault();
    const data = new FormData();
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content)
    data.set('id',id);

    if(files?.[0]){
        data.set('file',files?.[0]);
    }
    
    const response = await fetch("https://blogapp-gsdt.onrender.com/post",{
        method:'PUT',
        body:data,
        credentials:'include',
    })
    if(response.ok){
          toast.success("Post Updated Successfully");
         setRedirect(true);
    }
   
  };
  if (redirect) {
    return <Navigate to={"/post/"+id} />;
  }
  return (
    <section className="flex items-center m-10 p-2  max-sm:m-8 justify-center max-sm:w-[90%]">
      <form onSubmit={updatePost}>
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
        <button className="mt-2 rounded-sm bg-gray-600 p-2 font-semibold text-white w-full text-center">
          Update post
        </button>
      </form>
    </section>
  );
};

export default EditPost;
