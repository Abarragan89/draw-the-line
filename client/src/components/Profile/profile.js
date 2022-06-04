import Auth from '../../utils/auth';
import { useParams, Link } from 'react-router-dom';
import { QUERY_USER } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_POST, DELETE_POST } from '../../utils/mutations';
import './profile.css'
import deleteSound from '../../assets/sounds/delete-sound.wav';

function Profile() {
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

    const [addPost, { error }] = useMutation(ADD_POST);
    const [deletePost] = useMutation(DELETE_POST);

    const loggedIn = Auth.loggedIn();

    // delete post function
    function deletePostFunction(postId, index) {
        deletePost({ variables: { postId: postId } })
        deleteSoundNoise.play();
        const deletedPost = document.getElementById(index);
        deletedPost.remove();
    }
    return (
        <>
            {loggedIn ?
                <>
                    <h2 className='section-heading'>{userInfo.username}'s Profile Page</h2>
                    <section id="flex-div-profile">
                        <div id="profile-section-post">
                            <h2 className="section-heading">Your Posts</h2>
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
                                        <Link id="view-your-post" className="preview-post-link" to={`/Single-post/${post._id}`}>View Post</Link>
                                        <button className="post-mutation-btn" id="delete-post-btn" onClick={() => deletePostFunction(post._id, index)}>Delete</button>
                                    </div>
                                </section>
                            ))}
                        </div>
                        <section id="friendsSection">
                            <section>
                                <h4 className="section-heading">Friends</h4>
                                {userFriends.map((friend, index) => (
                                    <div className="friend-div" key={index}>
                                        <h4 className="friend-label">{friend.username}</h4>
                                        <Link to={`/profile/${friend._id}`}><button id="view-friend-profile" className="post-mutation-btn">View Profile</button></Link>

                                    </div>
                                ))}
                            </section>
                        </section>
                    </section>
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
