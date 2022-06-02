import Auth from '../../utils/auth';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QUERY_USER } from '../../utils/queries';
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
    const { data } = useQuery(QUERY_USER, {
        variables: { id: userId },
      });

    // Get username and friends
    const userInfo = data?.user || [];
    const userPosts = data?.user.posts || [];
    const userFriends = data?.user.friends || [];
    console.log(userInfo)
    console.log(userPosts)

    const [addPost, { error }] = useMutation(ADD_POST);
    const [deletePost] = useMutation(DELETE_POST);
    
    const loggedIn = Auth.loggedIn();
    return (
        <>
        {loggedIn ?
            <>  
            <Header />
              <h2 className='welcomeText'>{userInfo.username}'s Profile Page</h2>
              <main className="profilePage">
                <section className="postsSection">
                     {userPosts.map((post, index) =>
                        (   <Accordion key={index}>
                            <Accordion.Item eventKey="0">
                            <section className="discussion-post" key={index}>
                            <Accordion.Header>
                            <div className="accordionHeaderDiv">     
                            <h4 id="userTitle-post"><Link to={`/Single-post/${post._id}`}>{post.postTitle}</Link></h4>
                                <h2 id="username-post">{userInfo.username}</h2>
                                <p>{post.createdAt}</p>
                            </div>      
                                </Accordion.Header>
                                <Accordion.Body>
                                <p id="postText">{post.postText}</p>
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
                        <Link to={`/profile/${friend._id}`}>{friend.username}</Link>
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
