import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_ME_BASIC, GET_USER_POSTS } from '../../utils/queries';
import { Link } from 'react-router-dom';
import Signup from '../Signup/signup';
import Login from '../Login/login';
import Nav from '../Nav/nav';


function Home () {
    const { data } = useQuery(QUERY_ME_BASIC);
    console.log(data)
    const {data: postQuery } = useQuery(GET_USER_POSTS);
    // user information
    const username = data?.me.username || '';
    // Post Info
    const postData = postQuery?.posts || [];
    console.log(postData)

    // check if user is logged in
    const loggedIn = Auth.loggedIn()

    return (
        <>
            <p>Welcome to our page!</p>
            {loggedIn ? 
            <>
            <p>You're logged in, {username}!</p>
            <button onClick={() => Auth.logout()}>Logout</button> 
            <Link to="/profile">View my profile</Link>


            
            {postData.map((post, index) => 
                (
                <section key={index}>
                    <h3>{post.postTitle}</h3>
                    <p>Ban Meter: </p>
                    <progress id="banMeter" value={post.banMeter} max="0.6">{post.banMeter} </progress>
                    <p>{post.createdAt}</p>
                    <p>{post.postText}</p>
                    <p>{post.username}</p>
                    <p>{post.likes}<a>  👍</a></p>
                    <p>{post.dislikes}<a>  👎</a></p>
                </section>
                ))}
            </>
            :
            <>
            <p>please login</p>
            <Link to="/login">Login</Link>

            </>
            }
        </>
    )
}

export default Home;
