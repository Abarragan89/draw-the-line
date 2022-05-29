import Auth from '../../utils/auth';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QUERY_FRIEND, QUERY_ME_BASIC, QUERY_POSTS } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import './profile.css'

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

    // update state based on form input changes
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
    };


    return (
        <>  
         <main className="profilePage">  
            <form id='post-form' onSubmit={handleFormSubmit}>
            <section className="writePostSection">
            <input className='post-title' type="text" id="postTitle" name="postTitle" value={formState.postTitle} onChange={handleChange} placeholder='Title' />
            <input className="writePost" type="text" id="postText" name="postText" value={formState.postText} onChange={handleChange} placeholder='Post' />
                <button className='postButton'>Send</button>
            </section>
            </form>

            <section>

                {userPosts.map((post, index) => (
                    <section className='postContainer' key={index}>
                        <span>Title: </span><Link to={`/Single-post/`}>{post.postTitle}</Link>
                        <p>Post: {post.postText}</p>
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
         </main>   
        </>
    )
}

export default Profile;
