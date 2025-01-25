import * as React from "react";
import { DocumentResponse } from "@/types";
import { useUserAuth } from "@/context/userAuthContext";
import { HeartIcon, MessageCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import {
  updateLikesOnPost,
  addCommentToPost,
} from "@/repository/post.service.ts";
import { cn } from "@/lib/utils";

interface IPostCardProps {
  data: DocumentResponse;
}

const PostCard: React.FunctionComponent<IPostCardProps> = ({ data }) => {
  const { user } = useUserAuth();
  const [likesInfo, setLikesInfo] = React.useState<{
    likes: number;
    isLike: boolean;
  }>({
    likes: data.likes!,
    isLike: data.userlikes?.includes(user!.uid) ? true : false,
  });

  const updateLike = async (isVal: boolean) => {
    setLikesInfo({
      likes: isVal ? likesInfo.likes + 1 : likesInfo.likes - 1,
      isLike: !likesInfo.isLike,
    });

    if (isVal) {
      data.userlikes.push(user!.uid);
    } else {
      data.userlikes?.splice(data.userlikes.indexOf(user!.uid), 1);
    }
    await updateLikesOnPost(
      data.id!,
      data.userlikes!,
      isVal ? likesInfo.likes + 1 : likesInfo.likes - 1,
    );
  };
  const [comments, setComments] = React.useState<string[]>(data.comments || []);
  const [newComment, setNewComment] = React.useState<string>("");

  const addComment = async () => {
    if (newComment.trim()) {
      try {
        const updatedComments = [
          ...comments,
          `${user?.displayName || "Guest"}: ${newComment}`,
        ];
        setComments(updatedComments);
        setNewComment("");
        await addCommentToPost(data.id!, updatedComments);
      } catch (error) {
        console.error("Error adding comment: ", error);
      }
    }
  };
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-col p-3">
        <CardTitle className="text-sm text-center flex justify-start items-center">
          <span className="mr-2">
            <img
              src={data.photoURL}
              className="w-10 h10 rounded-full border-2 border-slate-800 object-cover"
            />
          </span>
          <span>{user?.displayName || "Guest_user"}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <img src={data.photos ? data.photos[0].cdnUrl : ""} />
      </CardContent>
      <CardFooter className="flex flex-col p-3">
        <div className="flex justify-between w-full mb-3">
          <HeartIcon
            className={cn(
              "mr-3",
              "cursor-pointer",
              likesInfo.isLike ? "fill-red-500" : "fill-none",
            )}
            onClick={() => updateLike(!likesInfo.isLike)}
          />
          <MessageCircle className="mr-3" />
        </div>
        <div className="w-full text-sm">{likesInfo.likes} likes</div>
        <div className="w-full text-sm">
          <span>{data.username}</span> : {data.caption}
        </div>
        <div className="w-full text-sm mt-2">
          {comments.map((comment, index) => (
            <div key={index} className="mb-2">
              {comment}
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="border border-gray-300 rounded-md p-2 flex-1"
          />
          <button
            onClick={addComment}
            className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
          >
            Post
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
