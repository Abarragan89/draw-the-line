import { useParams, Link } from 'react-router-dom';
import { QUERY_FRIEND } from '../../utils/queries';
import { useQuery } from '@apollo/client';

function SinglePost () {

    const { id: userId } = useParams()
    const { loading, data } = useQuery(QUERY_FRIEND, {
        variables: { id: userId },
      });
    
    const userPosts = data?.user.posts || [];
    const userFriends = data?.user.friends || [];

    return (
        <>  
            <section>
                <h1>Posts</h1>
                {userPosts.map((post, index) => (
                    <section key={index}>
                        <h3>{post.postTitle}</h3>
                        <p>{post.postText}</p>
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

export default SinglePost;