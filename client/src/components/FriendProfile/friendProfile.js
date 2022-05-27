import { useParams, Link } from 'react-router-dom';
import { QUERY_FRIEND } from '../../utils/queries';
import { useQuery } from '@apollo/client';

function FriendProfile () {

    const { _id: userId } = useParams()
    const { loading, data } = useQuery(QUERY_FRIEND, {
        variables: { _id: userId },
      });
    
    const userPosts = data?.user.posts || [];
    const userFriends = data?.user.friends || [];

    console.log(userPosts)

    return (
        <>
            {/* <p>This is the profile of {userParam}</p>
            <p>{userParam} posts are: {userPosts.map( post => (
                <>
                    <p>{post.postText}</p>
                    <p>{post.postTitle}</p>
                </>
            ))} </p>
            <p>Here are Their friends:</p>
            <p>{userFriends.map( friend => (
                <p>{friend.username}</p>
            ))}</p> */}

{/*             
            <section>
                <h1>Posts</h1>
                {userPosts.map(post => (
                    <section key={post._id}>
                        <h3>{post.postTitle}</h3>
                        <p>{post.postText}</p>
                    </section>
                ))}
            </section>
            <section>
                <h1>Friends</h1>
                {userFriends.map(friend => (
                    <Link to=''>{friend.username}</Link>
                ))} 
            </section> */}



        </>

    )
}

export default FriendProfile;