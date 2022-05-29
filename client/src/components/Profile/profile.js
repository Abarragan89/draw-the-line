import Auth from '../../utils/auth';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QUERY_FRIEND, QUERY_ME_BASIC, QUERY_POSTS } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import './postCard.css'
import { ADD_POST } from '../../utils/mutations';

// Bad word Filter
var Filter = require('bad-words'),
    filter = new Filter();


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
        let { name, value } = event.target;
        
        name = filter.clean(name)
        value = filter.clean(value)

        if (value.match(/([*]{3,})/g)) {
            const warningDiv = document.getElementById('bad-words-warning');
            warningDiv.innerHTML = 'Let\'s be nice';
            // const postBtn = document.getElementsByClassName('post-btn');
            // postBtn.setAttribute('disabled', '');
        }
        setFormState({
        ...formState,
        [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        let postText = document.getElementById('postText').value;
        let postTitle = document.getElementById('postTitle').value;

        console.log(postText)
        postTitle = filter.clean(postTitle)
        postText = filter.clean(postText)

        console.log(postText)

        setFormState({
            [postTitle]: postText,
            });

        await addPost({
            variables: { ...formState },
        });
    };


    return (
        <>  
            <p>PROFILE PAGE</p>

            <form id='post-form' onSubmit={handleFormSubmit}>
            <section>
            <input className='post-tile' type="text" id="postTitle" name="postTitle" value={formState.postTitle} onChange={handleChange} placeholder='Write Title Here' />
            <input type="text" id="postText" name="postText" value={formState.postText} onChange={handleChange} placeholder='Write Post Here' />
            <div id="bad-words-warning"></div>
            <div><button className='post-btn'>POST</button></div>
            </section>
            </form>

            <section>
                <h1>Posts</h1>
                {userPosts.map((post, index) => (
                    <section className='card-main' key={index}>
                        
                        <span>TITLE: </span><Link to={`/Single-post/`}>{post.postTitle}</Link>
                        <p>CONTENT: {post.postText}</p>
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
        </>
    )
}

export default Profile;
