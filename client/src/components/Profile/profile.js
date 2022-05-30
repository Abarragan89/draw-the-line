import Auth from '../../utils/auth';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QUERY_FRIEND, QUERY_ME_BASIC, QUERY_POSTS } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_POST, DELETE_POST } from '../../utils/mutations';
import './profile.css'

// Bad word Filter
var Filter = require('bad-words'),
    filter = new Filter();


// Bad word Filter
var Filter = require('bad-words'),
    filter = new Filter();
    filter.removeWords('hell', 'tit', 'tits', 'boob', 'boobs')


function Profile () {

    const { id: userId } = useParams()
    const { loading, data } = useQuery(QUERY_FRIEND, {
        variables: { id: userId },
      });
    const { basic } = useQuery(QUERY_ME_BASIC);
    const { queryPost } = useQuery(QUERY_POSTS);
    
    const userPosts = data?.user.posts || [];
    const userFriends = data?.user.friends || [];
    const username = basic?.me.username || '';
    console.log('user', userPosts)

    // set up state variables
    const [formState, setFormState] = useState({
        postTitle: '',
        postText: '',
        username: username,
      });
    const [addPost, { error }] = useMutation(ADD_POST);
    const [deletePost] = useMutation(DELETE_POST);

    // update state based on form input changes
    const handleChange = (event) => {
        let { name, value } = event.target;
        // Booleans to keep name and value state
        let cleanName;
        let cleanText;
        // Censor postText
        if (value && !value.match(/^[*]{1,}/)){
            value = filter.clean(value)
            if (value.match(/([*]{3,})/g)) {
                cleanText = false;
            } else {
                cleanText = true
            }
        }
        // Censor postTitle
        if (name && !name.match(/^[*]{1,}/)){
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
        await addPost({
            variables: { ...formState },
        });
    };
    
    const loggedIn = Auth.loggedIn();


    return (
        <>

        {loggedIn ?
            <>  
             {/* <main className="profilePage">    */}
                <form id='post-form' onSubmit={handleFormSubmit}>
                <section className="writePostSection">
                <input className="post-title" type="text" id="postTitle" name="postTitle" value={formState.postTitle} onChange={handleChange} placeholder='Title' />
                <div className="writePostDiv">
                <input className="writePost" type="text" id="postText" name="postText" value={formState.postText} onChange={handleChange} placeholder='Post' />
                    <button className="postButton" id="post-btn">Post</button>
                </div>
                <div id="bad-words-warning"></div>
                </section>
                </form>
                

                <section>
                    <h1>Posts</h1>
                    {userPosts.map((post, index) => (
                        <section className='postContainer' key={index} id={index}>
                            <h2>Title:</h2> <Link to={`/Single-post/`}>{post.postTitle}</Link>
                            <h3>Post: {post.postText}</h3>
                            <button id='delete-post-btn'
                            onClick={() => {
                                deletePost({variables: {postId: post._id}})
                                const deletedPost = document.getElementById(index);
                                deletedPost.remove();
                                }
                            }
                            >Delete</button>
                        </section>
                    ))}
                </section>
                <section>
                    <h1>Friends</h1>
                    {userFriends.map((friend, index) => (
                        <div key={index}>
                        <Link to={`/friendprofile/${friend._id}`}>{friend.username}</Link>
                        </div>
                    ))} 
                </section>
              {/* </main>   */}
            </>
            :
            <>
                <p>You need to login to see this page</p>
            </>
            }
        </>
    )
}

export default Profile;
