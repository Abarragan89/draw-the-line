import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { QUERY_SINGLE_POST } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { DISLIKE_POST, LIKE_POST, DELETE_POST, ADD_COMMENT } from '../../utils/mutations';
import { ADD_COMMENT_LIKE, ADD_COMMENT_DISLIKE, DELETE_COMMENT } from '../../utils/mutations'
import likeSound from '../../assets/sounds/like-sound.wav';
import dislikeSound from '../../assets/sounds/dislike-sound.wav';
import Header from '../Header/header'

import './singlePost.css';

function SinglePost() {
    // sound functions
    const likeSoundNoise = new Audio(likeSound);
     likeSoundNoise.loop = false;
     likeSoundNoise.volume = 0.3;
    const dislikeSoundNoise = new Audio(dislikeSound);
     dislikeSoundNoise.loop = false;
     dislikeSoundNoise.volume = 0.3;


    const { id: postId } = useParams()
    const { data } = useQuery(QUERY_SINGLE_POST, {
        variables: { id: postId },
    });

    const userPost = data?.post || [];
    const userComments = data?.post?.comments || [];

    // Mutations
    const [addCommentLike] = useMutation(ADD_COMMENT_LIKE)
    const [addCommentDislike] = useMutation(ADD_COMMENT_DISLIKE)
    const [addDislike] = useMutation(DISLIKE_POST);
    const [addLike] = useMutation(LIKE_POST);
    const [addComment] = useMutation(ADD_COMMENT);
    const [deletePost] = useMutation(DELETE_POST)
    const [deleteComment] = useMutation(DELETE_COMMENT)

    const [formStateComment, setFormStateComment] = useState({
        commentBody: '',
        postId: postId,
    });

    const handleChangeComment = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setFormStateComment({
            ...formStateComment,
            [name]: value,
        });
    };

    const handleFormSubmitComment = async (event) => {
        event.preventDefault();
        await addComment({
            variables: { ...formStateComment },

        });
        window.location.reload();
    };
    return (
        <>
        <Header /> 
            <section>
                    <div id="single-post-page">
                        <div className='single-post-container'>
                            <p id="username-post"> Username: {userPost.username}</p>
                            <p id="userTitle-post">{userPost.postTitle}</p>
                            <p id="postText"> {userPost.postText}</p>
                            <p>{userPost.createdAt}</p>
                        </div>

                        <div className='likes-container'>
                            <p>Likes: {userPost.likesLength}<a onClick={() => {
                            addLike({ variables: { postId: userPost._id } })
                            likeSoundNoise.play();
                            if (userPost.banMeter >= 0.6) {
                                deletePost({ variables: { postId: userPost._id } })
                                const deletedPost = document.getElementById('single-post-page');
                                deletedPost.remove();
                            }
                        }}>    👍</a></p>
                            
                            
                            <p>Dislikes: {userPost.dislikesLength}<a onClick={() => {
                            addDislike({ variables: { postId: userPost._id } });
                            dislikeSoundNoise.play();
                            if (userPost.banMeter >= 0.6) {
                                deletePost({ variables: { postId: userPost._id } })
                                const deletedPost = document.getElementById('single-post-page');
                                deletedPost.remove();
                            }
                        }
                        }>      👎</a></p>


                        {userPost.banMeter &&
                            <>
                                <p>Ban Meter <a></a></p>
                                <progress id="banMeter" value={userPost.banMeter} max="0.6">{userPost.banMeter}</progress>
                            </>
                        }

                        </div>

                        <div className='comments-container'>
                            {userComments.map((comment, index) => (

                                <section key={index} id={index}>
                                    <p>{comment.username}</p>
                                    <p>{comment.commentBody}</p>
                                    <p>{comment.createdAt}</p>
                                    <p>{comment.likesLength}<a onClick={() => {
                                        addCommentLike({ variables: { commentId: comment._id } })
                                        likeSoundNoise.play();
                                        if (comment.banMeter >= 0.6) {
                                            deleteComment({ variables: { commentId: comment._id } })
                                            const deletedPost = document.getElementById(index);
                                            deletedPost.remove();
                                        }
                                    }}>    👍</a></p>
                                    <p>{comment.dislikesLength}<a onClick={() => {
                                        addCommentDislike({ variables: { commentId: comment._id } });
                                        dislikeSoundNoise.play();
                                        if (comment.banMeter >= 0.6) {
                                            deleteComment({ variables: { commentId: comment._id } })
                                            const deletedPost = document.getElementById(index);
                                            deletedPost.remove();
                                        }
                                    }
                                    }>      👎</a></p>
                                      {comment.banMeter &&
                                        <>
                                            <p>Ban Meter</p>
                                            <progress id="banMeter" value={comment.banMeter} max="0.6">{comment.banMeter} </progress>
                                        </>
                        }
                                </section>

                            ))}
                        </div>

                        {/* Comment Section */}

                        <form id='comment-form' onSubmit={handleFormSubmitComment}>
                            <section>
                                <input method="post" className='post-tile' type="text" id="commentBody" name="commentBody" value={formStateComment.commentBody} onChange={handleChangeComment} placeholder='Your Comment Here' />
                                <div btn-container><button className='post-btn'>Post</button></div>
                            </section>
                        </form>
                    </div>
            </section>
        </>
    )
}

export default SinglePost;

