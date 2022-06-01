import { useParams, Link } from 'react-router-dom';
import { QUERY_FRIEND } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { DISLIKE_POST, LIKE_POST, DELETE_POST } from '../../utils/mutations';
import Accordion from 'react-bootstrap/Accordion';
import Nav from '../Nav/nav';
// Import sounds
import likeSound from '../../assets/sounds/like-sound.wav';
import dislikeSound from '../../assets/sounds/dislike-sound.wav';
import Header from '../Header/header.js';
// import Nav from '../Nav/nav';

function FriendProfile() {
    // make audio functions
     // Sound function for post
     const likeSoundNoise = new Audio(likeSound);
     likeSoundNoise.loop = false;
     likeSoundNoise.volume = 0.3;
     // Sound function for Delete
     const dislikeSoundNoise = new Audio(dislikeSound);
     dislikeSoundNoise.loop = false;
     dislikeSoundNoise.volume = 0.3;

    const { id: userId } = useParams()
    const { data } = useQuery(QUERY_FRIEND, {
        variables: { id: userId },
    });

    const userPosts = data?.user.posts || [];
    const userFriends = data?.user.friends || [];

    const [addDislike] = useMutation(DISLIKE_POST)

    const [addLike, { error }] = useMutation(LIKE_POST);
    if (error) {
        console.log(error);
    }
    const [deletePost] = useMutation(DELETE_POST)

    return (
        <>  
        <Header/>
        <main className="friendProfile">
            <section className="postsSection">
                {userPosts.map((post, index) => (
                     <Accordion>
                        <Accordion.Item eventKey="0">
                            <section className="discussion-post" key={index} id={index}>
                                <Accordion.Header>
                                    <div className="accordionHeaderDiv"> 
                                    <h1 id="username-post">{post.username}</h1>  
                                    <h2 id="userTitle-post"><Link to={`/Single-post/${post._id}`}>{post.postTitle}</Link></h2>
                                    </div>

                                </Accordion.Header>
                                <Accordion.Body>
                                    <p>{post.createdAt}</p>
                                    <p id="postText">{post.postText}</p>
                                    <div id="likes-dislikes">
                                    <p>{post.likesLength}<a onClick={() => {
                                        addLike({ variables: { postId: post._id } })
                                        likeSoundNoise.play();
                                        
                                        if (post.banMeter >= 0.6) {
                                        deletePost({ variables: { postId: post._id } })
                                        const deletedPost = document.getElementById(index);
                                        deletedPost.remove();
                                    }}}>👍</a></p>
                                    <p>{post.dislikesLength}<a onClick={() => {
                                        addDislike({ variables: { postId: post._id } });
                                        dislikeSoundNoise.play();
                                            if (post.banMeter >= 0.6) {
                                        deletePost({ variables: { postId: post._id } })
                                        const deletedPost = document.getElementById(index);
                                        deletedPost.remove();
                                    }}}>👎</a></p>
                                    </div>
                                    {post.banMeter &&
                                    <>
                                        <p>Ban Meter <a>{post.banMeter}</a></p>
                                        <progress id="banMeter" value={post.banMeter} max="0.6">{post.banMeter} </progress>
                                    </>
                                    }
                                </Accordion.Body>
                            </section>
                        </Accordion.Item>
                    </Accordion>
                ))}
            </section>
            <section className="friendsSection">
                <h4 className="friendsText">Friends</h4>
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

export default FriendProfile;