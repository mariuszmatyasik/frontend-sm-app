import React, {useEffect, useState} from "react"
import Layout from "@/components/layout";
import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import FileUploader from "@/components/fileUploader";
import {Button} from "@/components/ui/button.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {FileEntry, UserProfile} from "@/types";
import avatar from "@/assets/images/avatar.png"
import {Input} from "@/components/ui/input.tsx";
import {createUserProfile, updateUserProfile} from "@/repository/user.service.ts";

interface IEditProfileProps {
}

const EditProfile: React.FC<IEditProfileProps> = ({}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id, userId, displayName, photoURL, userBio } = location.state;

    console.log("the location state is: ", location.state);

    const [data, setData] = useState<UserProfile>({
        userId,
        displayName,
        photoURL,
        userBio,
    });

    const [fileEntry, setFileEntry] = useState<FileEntry>({
        files: [],
    });
    console.log("The file entry is: ", fileEntry);

    useEffect(() => {
        if(fileEntry.files.length > 0){
            setData({ ...data, photoURL: fileEntry.files[0].cdnUrl || ""});
        }
    }, [fileEntry]);

    const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);

        try {
            if (id) {
                const response = await updateUserProfile(id, data);
                console.log("Updated user profile: ", response);
            } else {
                const response = await createUserProfile(data);
                console.log("the created user profile is: ", response);
            }
        }catch(err) {
            console.error(err);
        }
    }
  return (
      <Layout>
          <div className="flex justify-center">
              <div className="border max-w-3xl w-full">
                  <h3 className="bg-slate-800 text-white text-center text-lg p-2">
                      Edit Profile
                  </h3>
                  <div className="p-8">
                      <form onSubmit={updateProfile}>
                          <div className="flex flex-col">
                              <Label className="mb-4" htmlFor="photo">
                                  Profile Picture
                              </Label>
                              <div className="mb-4">
                                  {fileEntry.files.length > 0 ? <img
                                      src={fileEntry.files[0].cdnUrl!}
                                      alt="avatar"
                                      className="w-28 h-28 rounded-full border-2 border-slate-800 object-cover"
                                  /> : <img
                                      src={data.photoURL ? data.photoURL : avatar}
                                      alt="avatar"
                                      className="w-28 h-28 rounded-full border-2 border-slate-800 object-cover" />
                                  }
                                  </div>
                              <FileUploader fileEntry={fileEntry} onChange={setFileEntry} preview={false}/>
                          </div>
                          <div className="flex flex-col">
                              <Label className="mb-4" htmlFor="displayName">
                                  Display Name
                              </Label>
                              <Input
                                  className="mb-8"
                                  id="displayName"
                                  placeholder="Enter username"
                                  value={data.displayName || ''}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                      setData({ ...data, displayName: e.target.value })
                                  }
                              />
                          </div>
                          <div className="flex flex-col">
                              <Label className="mb-4" htmlFor="userBio">
                                  Profile Bio
                              </Label>
                              <Textarea
                                  className="mb-8"
                                  id="userBio"
                                  placeholder="what's in your mind"
                                  value={data.userBio}
                                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                      setData({ ...data, userBio: e.target.value })
                                  }
                              />
                          </div>
                          <Button className="mt-4 w-32 mr-8" type="submit">
                              Update
                          </Button>
                          <Button
                              variant="destructive"
                              className="mt-4 w-32 mr-8" type="submit"
                              onClick={() => navigate("/profile")}>
                              Cancel
                          </Button>
                      </form>
                  </div>
              </div>
          </div>
      </Layout>
  )
  }

  export default EditProfile;