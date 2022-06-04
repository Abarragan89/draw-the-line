import Auth from '../../utils/auth';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { DELETE_POST } from '../../utils/mutations';
import { QUERY_ME, QUERY_ME_BASIC } from '../../utils/queries';
import { ADD_POST } from '../../utils/mutations';

// Style Import
import './createPost.css';

// Sound Imports
import postSound from '../../assets/sounds/postSound.wav';
import deleteSound from '../../assets/sounds/delete-sound.wav';

// Bad word Filter
var Filter = require('bad-words'),
    filter = new Filter();
filter.removeWords('hell', 'tit', 'tits', 'boob', 'boobs')

function CreatePost() {

    // Sound function for post
    const postSoundNoise = new Audio(postSound);
    postSoundNoise.loop = false;
    postSoundNoise.volume = 0.5;

    // Sound function for Delete
    const deleteSoundNoise = new Audio(deleteSound);
    deleteSoundNoise.loop = false;
    deleteSoundNoise.volume = 0.5;

    // Get basic info
    const { data: basic } = useQuery(QUERY_ME_BASIC);
    const username = basic?.me.username || '';
    // Get user's information
    const { data } = useQuery(QUERY_ME);
    const userPosts = data?.me.posts || [];

    const [deletePost] = useMutation(DELETE_POST)
    // set up state variables for comment section
    const [formState, setFormState] = useState({
        postTitle: '',
        postText: '',
        username: username
    });

    const [addPost] = useMutation(ADD_POST);
    // Save users posts in a state variable
    const handleChange = (event) => {
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
        const postBtn = document.getElementById('post-btn')
        const warningDiv = document.getElementById('bad-words-warning');
        if (cleanName && cleanText) {
            warningDiv.innerHTML = '';
            postBtn.disabled = false;
        } else {
            warningDiv.innerHTML = 'Keep it friendly';
            postBtn.disabled = true;
        }
        setFormState({
            ...formState,
            [name]: value,
        });
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        postSoundNoise.play();
        await addPost({
            variables: { ...formState },
        });
        // setUsersPosts(userPosts)
        window.location.reload(false);
    };

    function deletePostFunction (postId, index) {
        deletePost({ variables: { postId: postId } })
        deleteSoundNoise.play();
        const deletedPost = document.getElementById(index);
        deletedPost.remove();
    }
    const loggedIn = Auth.loggedIn();

    return (
        <>
            {loggedIn ?
                <>
                    <h2 className='section-heading'>Create a Post</h2>
                    <form id='post-form' className="login-form" onSubmit={handleFormSubmit}>
                        <section className="writePostSection">
                            <input className="login-input" type="text" id="postTitle" name="postTitle" value={formState.postTitle} onChange={handleChange} placeholder='Title' />

                            <div className="writePostSection">
                                <textarea className="login-input" type="text" id="postText" name="postText" value={formState.postText} onChange={handleChange} placeholder='Share your thoughts...' />
                            </div>
                            <div className="curse-warning-div">
                                <button className="login-button" id="post-btn">Post</button>
                                <div id="bad-words-warning"></div>
                            </div>
                        </section>
                    </form>

                    <section>

                        <h2 className="section-heading">Your Post</h2>
                        {userPosts.map((post, index) =>
                        (
                            <section className="preview-post-sect" id={index} key={index}>
                                <div className="preview-post-header">
                                    <div className="preview-post-title">
                                        <h2>{post.postTitle}</h2>
                                    </div>
                                    <div className="preview-post-info">
                                        <p>Ban Meter: </p>
                                        <progress id="banMeter" value={post.banMeter} max="0.6">{post.banMeter}</progress>
                                        <h4>{post.createdAt}</h4>
                                    </div>
                                </div>
                                <div className="post-body-div">
                                    <div className="preview-post-body">
                                        <p className="preview-post-text">{post.postText}</p>
                                    </div>
                                    <div className="preview-post-body-overlay"></div>
                                </div>
                                <div className="edit-delete-post-div">
                                    <button className="post-mutation-btn" id="edit-post-btn">Edit</button>
                                    <button className="post-mutation-btn" id="delete-post-btn" onClick={() => deletePostFunction(post._id, index)}>Delete</button>
                                </div>
                            </section>
                        ))}
                    </section>
                </>
                :
                <>
                    <p>You need to login to see this page</p>
                </>
            }

        </>
    )

}
export default CreatePost;