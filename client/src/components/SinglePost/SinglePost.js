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

    // Like click function
    function likeClick() {
        addLike({ variables: { postId: userPost._id } })
        likeSoundNoise.play();
        if (userPost.banMeter >= 0.6) {
            deletePost({ variables: { postId: userPost._id } })
            const deletedPost = document.getElementById('single-post-page');
            deletedPost.remove();
        }
    }
    // Dislike  click function
    function dislikeClick() {
        addDislike({ variables: { postId: userPost._id } });
        dislikeSoundNoise.play();
        if (userPost.banMeter >= 0.6) {
            deletePost({ variables: { postId: userPost._id } })
            const deletedPost = document.getElementById('single-post-page');
            deletedPost.remove();
        }

    }
    return (
        <>
            <Header />
            <section>
            <h2 className='welcomeText'>Single Post</h2>
                <div id="single-post-page">
                    <div className='single-page-discussion-post'>
                        <p id="username-post">{userPost.username}</p>
                        <p id="single-post-userTitle-post">{userPost.postTitle}</p>
                        <p id="postText"> {userPost.postText}</p>
                        <p id="single-post-date">{userPost.createdAt}</p>
                        {/* </div> */}

                        <div id="single-page-likes-dislikes">
                            {userPost.likesLength}<a className='voteBtnClickable' onClick={likeClick}>    👍</a>
                            {userPost.dislikesLength}<a className='voteBtnClickable' onClick={dislikeClick}>      👎</a>

                        </div>
                        {userPost.banMeter !== 0 &&
                            <>
                                <p>Ban Meter <a></a></p>
                                <progress id="banMeter" value={userPost.banMeter} max="0.6">{userPost.banMeter}</progress>
                            </>
                        }

                        <form id='comment-form' onSubmit={handleFormSubmitComment}>
                            <input method="post" className='post-tile' type="text" id="commentBody" name="commentBody" value={formStateComment.commentBody} onChange={handleChangeComment} placeholder='Comment' />
                            <div>
                                <button className='post-button' id='postBtnComment'>Post</button>
                                <div id='waringDivComment'></div>
                            </div>
                        </form>

                        <div className='comments-container'>
                            {userComments.map((comment, index) => (

                                <section key={index} id={index}>
                                    <p>{comment.username}</p>
                                    <p>{comment.commentBody}</p>
                                    <p>{comment.createdAt}</p>
                                    {comment.likesLength}<a  className='voteBtnClickable' onClick={() => {
                                        addCommentLike({ variables: { commentId: comment._id } })
                                        likeSoundNoise.play();
                                        if (comment.banMeter >= 0.6) {
                                            deleteComment({ variables: { commentId: comment._id } })
                                            const deletedPost = document.getElementById(index);
                                            deletedPost.remove();
                                        }
                                    }}>    👍</a>
                                    {comment.dislikesLength}<a className='voteBtnClickable' onClick={() => {
                                        addCommentDislike({ variables: { commentId: comment._id } });
                                        dislikeSoundNoise.play();
                                        if (comment.banMeter >= 0.6) {
                                            deleteComment({ variables: { commentId: comment._id } })
                                            const deletedPost = document.getElementById(index);
                                            deletedPost.remove();
                                        }
                                    }
                                    }>      👎</a><br></br>
                                    {comment.banMeter !== 0 &&
                                        <>
                                            <progress id="banMeter" value={comment.banMeter} max="0.6">{comment.banMeter} </progress>
                                        </>
                                    }
                                </section>

                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SinglePost;

