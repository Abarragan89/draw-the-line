import Header from '../Header/header.js';
import Nav from '../Nav/nav';
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { DISLIKE_POST, LIKE_POST, DELETE_POST, } from '../../utils/mutations';
import { QUERY_ME_BASIC, QUERY_USERS_POSTS } from '../../utils/queries';
import { ADD_POST } from '../../utils/mutations';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import './createPost.css';

function CreatePost() {
   
    const { basic } = useQuery(QUERY_ME_BASIC);
    const username = basic?.me.username || '';

    const { id: postId } = useParams()
    const { data } = useQuery(QUERY_USERS_POSTS, {
        variables: { username: username },
    });

    const userPosts = data?.posts || [];
    console.log(userPosts)

    const [addDislike] = useMutation(DISLIKE_POST)

    const [addLike, { error }] = useMutation(LIKE_POST);
    if (error) {
        console.log(error);
    }
    
    const [deletePost] = useMutation(DELETE_POST)


    // set up state variables for comment section
    const [formState, setFormState] = useState({
        postTitle: '',
        postText: '',
        username: username,
      });
      
      const [addPost] = useMutation(ADD_POST);

    // Save users posts in a state variable
    const [usersPostsState, setUsersPosts] = useState(userPosts)  

    console.log(usersPostsState)


    // handleChange for comment section
    const handleChange = (event) => {
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
        window.location.reload(false);
    };

    
    return (
        <>
        <Header />

         <p>PROFILE PAGE</p>
                <form id='post-form' onSubmit={handleFormSubmit}>
                <section>
                <input className='post-tile' type="text" id="postTitle" name="postTitle" value={formState.postTitle} onChange={handleChange} placeholder='Write Title Here' />
                <input type="text" id="postText" name="postText" value={formState.postText} onChange={handleChange} placeholder='Write Post Here' />
                <div id="bad-words-warning"></div>
                <div><button className='post-btn' id='post-btn'>POST</button></div>
                </section>
                </form>

                <section>
                    <h1>Posts</h1>
                    {userPosts.map((post, index) => (
                        <section className='card-main' key={index} id={index}>
                            <span>TITLE: </span><Link to={`/Create-post/`}>{post.postTitle}</Link>
                            <p>CONTENT: {post.postText}</p>
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
        </>

     )
    
}

export default CreatePost;