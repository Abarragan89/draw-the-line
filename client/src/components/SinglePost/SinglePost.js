import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { QUERY_SINGLE_POST } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { DISLIKE_POST, LIKE_POST, DELETE_POST, } from '../../utils/mutations';
import { QUERY_ME_BASIC } from '../../utils/queries';
import { ADD_POST } from '../../utils/mutations';

import './singlePost.css';

function SinglePost() {

    const { id: postId } = useParams()
    const { data } = useQuery(QUERY_SINGLE_POST, {
        variables: { id: postId },
    });

    const userPost = data?.post || [];
    console.log(userPost)

    const [addDislike] = useMutation(DISLIKE_POST)

    const [addLike, { error }] = useMutation(LIKE_POST);
    if (error) {
        console.log(error);
    }
    const { basic } = useQuery(QUERY_ME_BASIC);
    const username = basic?.me.username || '';
    const [deletePost] = useMutation(DELETE_POST)


    // set up state variables for comment section
    const [formState, setFormState] = useState({
        postTitle: '',
        postText: '',
        username: username,
      });
      
      const [addPost] = useMutation(ADD_POST);


    // handleChange for comment section
    const handleChange = (event) => {
        event.preventDefault();

        const { name, value } = event.target;
        setFormState({
        ...formState,
        [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
    event.preventDefault();
    await addPost({
        variables: { ...formState },
        
    });
    };


    return (
        <>
            <section>
                <h1>Posts</h1>

                {
                    <div>

                        <div className='single-post-container'>
                        <p>Username: {userPost.username}</p>
                        <p>Post Title: {userPost.postTitle}</p>
                        <p>Post Content: {userPost.postText}</p>
                        <p>Post Creation Date: {userPost.createdAt}</p>
                        </div>

                        <div className='likes-container'>
                        <p>Likes: {userPost.likesLength}</p>
                        <p>Dislikes: {userPost.dislikesLength}</p>
                        </div>

                        <div className='comments-container'>
                        <p>Comments {userPost.comments}</p>
                        </div>



                        {/* Comment Section */}

                        <form id='post-form' onSubmit={handleFormSubmit}>
                            <section>
                                <input method="post" className='post-tile' type="text" id="postTitle" name="postTitle" value={formState.postTitle} onChange={handleChange} placeholder='Your Comment Here' />
                                <div btn-container><button className='post-btn'>Post</button></div>
                            </section>
                        </form>




                        <br></br>

                        <div className='banmeter'>
                        <p>Ban meter: {userPost.banMeter}</p>
                        </div>
                        <p>{userPost.likesLength}<a onClick={() => {
                            addLike({variables: {postId: userPost._id}})
                            if(userPost.banMeter >= 0.6){
                                deletePost({variables: {postId: userPost._id}})
                                const deletedPost = document.getElementById();
                                deletedPost.remove();
                            }
                        
                        }}> 👍</a></p>
                        <p>{userPost.dislikesLength}<a onClick={() => {
                        addDislike({variables: {postId: userPost._id}})
                        if(userPost.banMeter >= 0.6){
                                deletePost({variables: {postId: userPost._id}})
                                const deletedPost = document.getElementById();
                                deletedPost.remove();
                            }}
                        }>      👎</a></p>
                        
                        {userPost.banMeter &&
                            <>
                                <p>Ban Meter <a>{userPost.banMeter}</a></p>
                                <progress id="banMeter" value={userPost.banMeter} max="0.6">{userPost.banMeter} </progress>
                            </>
                        }
                    </div>
                }

            </section>
        </>
    )
}

export default SinglePost;

