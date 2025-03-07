import Layout from "@/components/layout";
import * as React from "react";
import { useUserAuth } from "@/context/userAuthContext.tsx";
import { DocumentResponse, Post, ProfileResponse } from "@/types";
import avatar from "@/assets/images/avatar.png";
import { Button } from "@/components/ui/button.tsx";
import { Edit2Icon, HeartIcon } from "lucide-react";
import { getPostByUserId } from "@/repository/post.service.ts";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "@/repository/user.service.ts";

interface IProfileProps {}

const Profile: React.FunctionComponent<IProfileProps> = () => {
  const { user } = useUserAuth();

  const navigate = useNavigate();

  const initialUserInfo: ProfileResponse = {
    id: "",
    userId: user?.uid,
    userBio: "Update your profile",
    photoURL: user?.photoURL ? user.photoURL : "",
    displayName: user?.displayName ? user.displayName : "Guest user",
  };

  const [userInfo, setUserInfo] =
    React.useState<ProfileResponse>(initialUserInfo);

  /*
  const [userInfo, setUserInfo] = React.useState<ProfileResponse>({
    id: "",
    userId: "",
    userBio: "Update your profile",
    photoURL: "",
    displayName: "Guest user",
  });


  React.useEffect(() => {
    if (user && user.uid !== userInfo.userId) {
      setUserInfo({
        id: "",
        userId: user?.uid,
        userBio: "Update your profile",
        photoURL: user?.photoURL ? user.photoURL : "",
        displayName: user?.displayName ? user.displayName : "Guest user",
      });
    }
  }),
    [user];

*/

  //console.log("Initial user info: ", initialUserInfo);

  // console.log("User info: ", userInfo);

  const [data, setData] = React.useState<DocumentResponse[]>([]);

  const getUserProfileInfo = async (userId: string) => {
    const data: ProfileResponse = (await getUserProfile(userId)) || {};

    if (data.displayName) {
      setUserInfo(data);
    }
  };

  React.useEffect(() => {
    if (user != null) {
      getAllPost(user.uid);
      getUserProfileInfo(user.uid);
    }
  }, []);

  const getAllPost = async (id: string) => {
    try {
      const querySnapshot = await getPostByUserId(id);
      const tempArr: DocumentResponse[] = [];
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Post;
          const responseObj: DocumentResponse = {
            id: doc.id,
            ...data,
          };
          console.log("The response object is : ", responseObj);
          tempArr.push(responseObj);
        });
        setData(tempArr);
      } else {
        console.log("No such document");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderPost = () => {
    return data.map((item) => {
      return (
        <div key={item.photos[0].uuid} className="relative">
          <div className="absolute group transition-all duration-200 bg-transparent hover:bg-slate-950 hover:bg-opacity-75 top-0 bottom-0 left-0 right-0 w-full h-full">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <HeartIcon className="hidden group-hover:block fill-white" />
              <div className="hidden group-hover:block text-white">
                {item.likes} likes
              </div>
            </div>
          </div>
          <img
            src={`${item.photos![0].cdnUrl}/-/progressive/yes/-/scale_crop/300x300/center/`}
          />
        </div>
      );
    });
  };

  const editProfile = () => {
    navigate("/edit-profile", { state: userInfo });
  };

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="border max-w-3xl w-full">
          <h3 className="bg-slate-800 text-white text-center text-lg p-2">
            Profile
          </h3>
          <div className="p-8 pb-4 border-b">
            <div className="flex flex-row items-center pb-2 mb-2">
              <div className="mr-2">
                <img
                  src={userInfo.photoURL ? userInfo.photoURL : avatar}
                  alt="avatar"
                  className="w-28 h-28 rounded-full border-2 border-slate-800 object-cover"
                />
              </div>
              <div>
                <div className="text-xl ml-3">{userInfo.displayName}</div>
                <div className="text-xl ml-3">
                  {user?.email ? user.email : ""}
                </div>
              </div>
            </div>
            <div className="mb-4">{userInfo.userBio}</div>
            <div>
              <Button onClick={editProfile}>
                <Edit2Icon className="mr-2 h4 w4" /> Edit Profile
              </Button>
            </div>
          </div>

          <div className="p-8">
            <h2 className="mb-5">My Posts</h2>
            <div className="grid grid-cols-2 md:grid-cold-3 gap-2">
              {data ? renderPost() : <div>...Loading</div>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
