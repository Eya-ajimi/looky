import React from 'react'
import { useState ,useEffect,useContext } from 'react'
import { UidContext  } from "../AppContext";
import Popup from "reactjs-popup";
import { useDispatch } from 'react-redux';
import "reactjs-popup/dist/index.css";
import { likePost, unlikePost } from "../../redux/actions/Post.action";
const LikeButton = ({post}) => {
    
    const [liked,setLiked]=useState(false)
   const uid = useContext(UidContext);
   const dispatch = useDispatch();

   const like = () => {
    dispatch(likePost(post._id, uid))
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(post._id, uid))
    setLiked(false);
  };
    useEffect(() => {
        if (post.likers.includes(uid)) setLiked(true);
        else setLiked(false)
      }, [uid, post.likers, liked]);
    return (
        <div className="like-container">
        {uid === null && (
          <Popup
            trigger={<img src="./img/icons/heart.svg" alt="like" />}
            position={["bottom center", "bottom right", "bottom left"]}
            closeOnDocumentClick
          >
            <div>Log in to like a post!!</div>
          </Popup>
        )}
        {uid && liked === false && (
          <img src="./img/icons/heart.svg" onClick={like} alt="like" />
        )}
        {uid && liked && (
          <img src="./img/icons/heart-filled.svg" onClick={unlike} alt="unlike" />
        )}
        <span>{post.likers.length}</span>
      </div>
    )
}

export default LikeButton
