import { useParams, Link } from 'react-router-dom';
import { QUERY_FRIEND } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { DISLIKE_POST, LIKE_POST } from '../../utils/mutations';

function FriendProfile () {

    const { id: userId } = useParams()
    const { loading, data } = useQuery(QUERY_FRIEND, {
        variables: { id: userId },
      });
    
    const userPosts = data?.user.posts || [];
    const userFriends = data?.user.friends || [];

    const [addDislike ] = useMutation(DISLIKE_POST)
    
    const [addLike, {error}] = useMutation(LIKE_POST);
    if(error) {
        console.log(error);
    }

    return (
        <>  
            <section>
                <h1>Posts</h1>
                {userPosts.map((post, index) => (
                    <section key={index}>
                        <h3>{post.postTitle}</h3>
                        <p>{post.postText}</p>
                        {/* likes and dislies */}
                        <p>{post.likes}<a onClick={() =>addLike({variables: {postId: post._id}})}>    👍</a></p>


                        <p>{post.dislikes}<a onClick={() => {
                        addDislike({variables: {postId: post._id}})}
                        }>      👎</a></p>
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

export default FriendProfile;