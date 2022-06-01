import Auth from '../../utils/auth';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QUERY_FRIEND, QUERY_ME_BASIC, QUERY_USERS_POSTS } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_POST, DELETE_POST } from '../../utils/mutations';
import Accordion from 'react-bootstrap/Accordion';
import './profile.css'
import Header from '../Header/header.js';
import deleteSound from '../../assets/sounds/delete-sound.wav';

function Profile () {
    // sound function
    const deleteSoundNoise = new Audio(deleteSound);
    deleteSoundNoise.loop = false;
    deleteSoundNoise.volume = 0.5;
    // get ID and query a user's info
    const { id: userId } = useParams()
    const { data } = useQuery(QUERY_FRIEND, {
        variables: { id: userId },
      });
    const { basic } = useQuery(QUERY_ME_BASIC);
    // Get username and friends
    const userFriends = data?.user.friends || [];
    const username = basic?.me.username || '';
    
    // Query the posts of the user
    const { data: userPostsQuery } = useQuery(QUERY_USERS_POSTS, {
        variables: { username: username },
    });
    const userPosts = userPostsQuery?.posts || [];
    // set up state variables
    const [formState, setFormState] = useState({
        postTitle: '',
        postText: '',
        username: username,
      });
    const [addPost, { error }] = useMutation(ADD_POST);
    const [deletePost] = useMutation(DELETE_POST);
    
    const loggedIn = Auth.loggedIn();
    return (
        <>
        {loggedIn ?
            <>  
            <Header />
              <main className="profilePage">
                <section className="postsSection">
                     {userPosts.map((post, index) =>
                        (   <Accordion>
                            <Accordion.Item eventKey="0">
                            <section className="discussion-post" key={index}>
                            <Accordion.Header>
                            <div className="accordionHeaderDiv">     
                                <h2 id="username-post">{post.username}</h2>
                                <h3 id="userTitle-post">{post.postTitle}</h3>
                            </div>      
                                </Accordion.Header>
                                <Accordion.Body>
                                <p id="postText">{post.postText}</p>
                                <p>{post.createdAt}</p>
                                <div id="likes-dislikes">
                                    <p>{post.likesLength}<a>  👍</a></p>
                                    <p>{post.dislikesLength}<a>  👎</a></p>
                                </div>
                                <p id="ban-meter-p">Ban Meter: </p>
                                <progress id="banMeter" value={post.banMeter} max="0.6">{post.banMeter}</progress>
                                </Accordion.Body>
                            </section>
                            </Accordion.Item>
                            </Accordion>
                        ))}
                </section>
                <section className="friendsSection">
                    <section id="friendsSectionBorder">
                    <h4 className="friendsText">Friends</h4>
                    {userFriends.map((friend, index) => (
                        <div key={index}>
                        <Link to={`/friendprofile/${friend._id}`}>{friend.username}</Link>
                        </div>
                    ))}
                      </section>
                </section>
            </main> 
            </>
            :
            <>
                <p>You must be to logged in to proceed</p>
            </>
            }
        </>
    )
}
export default Profile;
