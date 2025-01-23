import React from "react"
import Layout from "@/components/layout";
import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import FileUploader from "@/components/fileUploader";
import {useUserAuth} from "@/context/userAuthContext.tsx";
import {FileEntry, Post} from "@/types";

interface ICreatePostProps {
}

const CreatePost: React.FunctionComponent<ICreatePostProps> = () => {
    const { user } =useUserAuth();
    const [fileEntry, setFileEntry] = React.useState<FileEntry>({
        files: [],
    });
    const [post, setPost] = React.useState<Post>({
        caption: "",
        photos: [],
        likes: 0,
        userlikes: [],
        userId: null,
        date: new Date(),
    })

    const handleSubmit = async(e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Uploaded File Entry: ", fileEntry);
        console.log("Create Post: ", post);
    }

    return (
    <Layout>
      <div className="flex justify-center w-full">
          <div className="border max-w-3xl w-full">
              <h3 className="bg-slate-800 text-white text-center text-lg p-2">
                  Create Post
              </h3>
              <div className="p-8">
                  <form onSubmit={handleSubmit}>
                      <div className="flex flex-col">
                          <Label className="mb-4" htmlFor="caption">
                              Photo Caption
                          </Label>
                          <Textarea className="mb-8"
                                    id="caption"
                                    placeholder="enter description"
                          value={post.caption}
                          onChange={(e) => setPost({...post, caption: e.target.value})}
                          />
                          <div className="flex flex-col">
                              <Label className="mb-4" htmlFor="photo">
                                  Photos
                              </Label>
                              <FileUploader fileEntry={fileEntry} onChange={setFileEntry} />
                          </div>
                          <Button className="mt-8 w-32" type="submit">Post</Button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    </Layout>
  )
};

  export default CreatePost;