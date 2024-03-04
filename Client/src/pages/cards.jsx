import React, { useState } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { extractUserIdFromToken } from "../utils/extractUserIdFromToken";
import ProfileImage from "../assets/images/profile.png";
import Modal from "@mui/material/Modal";
import CommentIcon from "@mui/icons-material/Comment";
export default function Cards(props) {
  const token = localStorage.getItem("token");
  const userId = extractUserIdFromToken(token);
  const createdAtIST = new Date(props.feed.createdAt).toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(props.feed.comments || []);

  const handleCommentSubmit = () => {
    // Here you can send the comment to the backend or update it locally
    setComments([...comments, { user: "You", text: comment }]);
    setComment("");
  };

  const url = `http://localhost:5000/${props.feed.image}`;

  const likePost = async (postId) => {
    try {
      const res = await fetch(`http://localhost:5000/like/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      if (res.ok) {
        props.updateLikeStatus(postId, true);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const disLikePost = async (postId) => {
    try {
      const res = await fetch(`http://localhost:5000/dislike/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      if (res.ok) {
        props.updateLikeStatus(postId, false);
      }
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  return (
    <Card
      className="py-4"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "550px",
      }}
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div className="flex items-center gap-2">
            <img
              src={
                props.feed.author.profileImage
                  ? `http://localhost:5000/profileImages/${props.feed.author.profileImage}`
                  : ProfileImage
              }
              height={50}
              width={50}
            ></img>
            <p className="font-bold text-xl">{props.feed.author.name}</p>
          </div>
          <small className="text-default-500">{createdAtIST}</small>
        </div>
        <h4 className="font-bold text-large">{props.feed.caption}</h4>
      </CardHeader>
      <CardBody
        className="overflow-visible py-2"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={`http://localhost:5000/images/${props.feed.image}`}
          width={400}
          style={{ border: "3px solid black" }}
        />
      </CardBody>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
        className="px-8"
      >
        <h4 className="font-bold text-large">{props.feed.description}</h4>
        {props.feed.likes.includes(userId) ? (
          <div className="flex items-center gap-1 cursor-pointer">
            <div onClick={() => disLikePost(props.feed._id)}>
              {props.feed.likes.length}
            </div>
            <FavoriteIcon color="red" sx={{ color: "red" }} />
            <CommentIcon onClick={() => setShowComments(true)} />
          </div>
        ) : (
          <div className="flex items-center gap-1 cursor-pointer">
            <div onClick={() => likePost(props.feed._id)}>
              {props.feed.likes.length}
            </div>
            <FavoriteIcon color="red" sx={{ color: "black" }} />
            <CommentIcon onClick={() => setShowComments(true)} />
          </div>
        )}

        {/* Modal for comments */}
        <Modal open={showComments} onClose={() => setShowComments(false)}>
    <div
        style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column", // Set the direction to column
            alignItems: "center", // Align items to center
        }}
    >
        {/* Render comments */}
        {comments.map((comment, index) => (
            <div key={index}>
                <p>
                    {comment.user}: {comment.text}
                </p>
            </div>
        ))}
        {/* Text area for new comment */}
        <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            cols={50}
            placeholder="Write a comment..."
            style={{ marginBottom: "1rem" }} // Add margin-bottom for spacing
        />
        {/* Submit button */}
        <button className="px-3 py-2 ml-2 text-white rounded-lg bg-[#eb2168] hover:bg-[#d7004b]" onClick={handleCommentSubmit}>Submit</button>
    </div>
</Modal>

      </div>
    </Card>
  );
}
