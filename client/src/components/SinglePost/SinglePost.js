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
    // censor filter
    // Bad word Filter
    var Filter = require('bad-words'),
        filter = new Filter();
    filter.removeWords('hell', 'tit', 'tits', 'boob', 'boobs')
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
        let { name, value } = event.target;
        // Booleans to keep name and value state
        let cleanName;
        let cleanText;
        // Censor postText
        if (value && !value.match(/^[*]{1,}/)) {
            value = filter.clean(value)
            if (value.match(/([*]{3,})/g)) {
                cleanText = false;
            } else {
                cleanText = true
            }
        }
        // Censor postTitle
        if (name && !name.match(/^[*]{1,}/)) {
            name = filter.clean(name)
            if (name.match(/([*]{3,})/g)) {
                cleanName = false
            } else {
                cleanName = true
            }
        }
        // Get html elements and check their values to render html elements
        const postBtn = document.getElementById('postBtnComment')
        // const warningDiv = document.getElementById('warningDivComment');
        if (cleanName && cleanText) {
            // warningDiv.innerHTML = '';
            postBtn.disabled = false;
        } else {
            // warningDiv.innerHTML = 'Keep it friendly';
            postBtn.disabled = true;
        }
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

    // Like Post click function
    function likePostClick() {
        addLike({ variables: { postId: userPost._id } })
        likeSoundNoise.play();
        if (userPost.banMeter >= 0.6) {
            deletePost({ variables: { postId: userPost._id } })
            const deletedPost = document.getElementById('single-post-page');
            deletedPost.remove();
        }
    }
    // Dislike  Post click function
    function dislikePostClick() {
        addDislike({ variables: { postId: userPost._id } });
        dislikeSoundNoise.play();
        if (userPost.banMeter >= 0.6) {
            deletePost({ variables: { postId: userPost._id } })
            const deletedPost = document.getElementById('single-post-page');
            deletedPost.remove();
        }

    }
    // like a comment
    function likeCommentClick(comment) {
        addCommentLike({ variables: { commentId: comment._id } })
        likeSoundNoise.play();
        if (comment.banMeter >= 0.6) {
            deleteComment({ variables: { commentId: comment._id } })
            // const deletedPost = document.getElementById(index);
            // deletedPost.remove();
        }
    }
    // dislike a comment
    function dislikeCommentClick(comment) {
        addCommentDislike({ variables: { commentId: comment._id } })
        dislikeSoundNoise.play();
        if (comment.banMeter >= 0.6) {
            deleteComment({ variables: { commentId: comment._id } })
            // const deletedPost = document.getElementById(index);
            // deletedPost.remove();
        }
    }

    return (
        <>
            <section>
                <h2 className="section-heading">{userPost.postTitle}</h2>
                <div className="single-post-text">
                    <p className="single-post-author">By: {userPost.username}</p>
                    <p > {userPost.postText}</p>
                    <br />
                    <p> Posted on: {userPost.createdAt}</p>
                </div>
                <div className="vote-section">
                    <div className="single-page-likes-dislikes">
                        <div className='like-div'>
                            <p>{userPost.likesLength}</p>
                            <a className='voteBtnClickable' onClick={likePostClick}>👍</a>
                        </div>
                        <div className='like-div'>
                            <p>{userPost.dislikesLength}</p>
                            <a className='voteBtnClickable' onClick={dislikePostClick}>👎</a>
                        </div>
                    </div>
                    <div>
                        {userPost.banMeter !== 0 &&
                            <>
                                <p className="ban-meter-text">Ban Meter <a></a></p>
                                <progress className="ban-meter-bar" value={userPost.banMeter} max="0.6">{userPost.banMeter}</progress>
                            </>
                        }
                    </div>
                </div>
                <div className="comment-section login-form">
                    <form id='comment-form' onSubmit={handleFormSubmitComment}>
                        <textarea method="post" className='login-input' type="text" id="commentBody" name="commentBody" value={formStateComment.commentBody} onChange={handleChangeComment} placeholder='Comment' />
                        <div>
                            <button className='login-button' id='postBtnComment'>Post</button>
                            <div id='waringDivComment'></div>
                        </div>
                    </form>
                </div>

                {userComments.map((comment, index) =>
                (
                    <section className="preview-comment-sect" key={index}>
                        <div className="preview-post-header">
                            <div className="preview-post-title">
                                <h3>{comment.username}</h3>
                                <h4>{comment.createdAt}</h4>
                            </div>
                        </div>

                        <div className="post-body-div">
                            <div className="preview-post-body">
                                <p className="preview-post-text">{comment.commentBody}</p>
                            </div>
                            <div className="preview-post-body-overlay"></div>
                        </div>
                        <div className="vote-section" id="comment-vote">
                                <div className='like-div'>
                                    <p>{comment.likesLength}</p>
                                    <a className='voteBtnClickable' onClick={likeCommentClick}>👍</a>
                                </div>
                                <div className='like-div'>
                                    <p>{comment.dislikesLength}</p>
                                    <a className='voteBtnClickable' onClick={dislikeCommentClick}>👎</a>
                                </div>
                            <div>
                                {comment.banMeter !== 0 &&
                                    <>
                                        <p className="ban-meter-text">Ban Meter <a></a></p>
                                        <progress className="ban-meter-bar" value={comment.banMeter} max="0.6">{comment.banMeter}</progress>
                                    </>
                                }
                            </div>
                        </div>


                    </section>
                ))}

                {/* <div className='posted-comment-container'>
                    {userComments.map((comment, index) => (

                        <section key={index} id={index}>
                            <p>{comment.username}</p>
                            <p>{comment.commentBody}</p>
                            <p>{comment.createdAt}</p>
                        </section>

                    ))}
                </div> */}
            </section>
        </>
    )
}

export default SinglePost;

