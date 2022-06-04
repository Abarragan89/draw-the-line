import Auth from '../../utils/auth';
import './home.css'
import { useQuery } from '@apollo/client';
import { QUERY_ME_BASIC, GET_USER_POSTS } from '../../utils/queries';
import { Link } from 'react-router-dom';

function Home() {
    const { data } = useQuery(QUERY_ME_BASIC);
    const { data: postQuery } = useQuery(GET_USER_POSTS);
    // user information
    const username = data?.me.username || '';
    // Post Info
    const postData = postQuery?.posts || [];

    // check if user is logged in
    const loggedIn = Auth.loggedIn()
    return (
        <>
            <h1 className="section-heading">Welcome, {username}</h1>
            {postData.map((post, index) =>
            (
                <section className="preview-post-sect" key={index}>
                    <div className="preview-post-header">
                        <div className="preview-post-title">
                            <h2>{post.postTitle}</h2>
                            <h3>- {post.username}</h3>
                        </div>
                        <div className="preview-post-info">
                            <p>Ban Meter: </p>
                            <progress id="banMeter" value={post.banMeter} max="0.6">{post.banMeter}</progress>
                            <h4>{post.createdAt}</h4>
                        </div>
                    </div>
                    <div className="post-body-div">
                        <div className="preview-post-body-locked">
                            <p className="preview-post-text">{post.postText}</p>
                        </div>
                        <div className="preview-post-body-overlay"></div>
                    </div>
                    {loggedIn ?
                        <Link className="preview-post-link" to={`/Single-post/${post._id}`}>Click To View Post</Link>
                        :
                        <Link className="preview-post-link" to='/signup'>Signup or Login to View Post</Link>
                    }
                </section>
            ))}
        </>
    )
}

export default Home;