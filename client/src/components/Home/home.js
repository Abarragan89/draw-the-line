import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS, QUERY_ME_BASIC } from '../../utils/queries';
import { Link } from 'react-router-dom';
import Signup from '../Signup/signup';
import Login from '../Login/login';
import Nav from '../Nav/nav';


function Home () {
    const { data } = useQuery(QUERY_ME_BASIC);
    console.log(data)
    const {data: postQuery } = useQuery(QUERY_POSTS);
    console.log(postQuery)
    // user information
    const username = data?.me.username || '';
    const userId = data?.me._id || '';
    // Post Info
    const postData = postQuery?.posts || [];


    // check if user is logged in
    const loggedIn = Auth.loggedIn()

    return (
        <>
        <p>Welcome to our page!</p>
        {loggedIn ? <p>You're logged in, {username}!</p> : 
        <>
            <p>please login</p>
            <Link to="/login">Login</Link>
        </>
        }

        {loggedIn ? 
        <>
        <button onClick={() => Auth.logout()}>Logout</button> 
        <Link to={`/profile/${userId}`}>View my profile</Link>
        {postData.map( post => (<p key={post._id}>{post.postText}</p>))}
        </>
        :
        <>
        </>
        
        }
        
{/*      
        <h1>{data.me._id}</h1> */}

        </>
    )
}

export default Home;
