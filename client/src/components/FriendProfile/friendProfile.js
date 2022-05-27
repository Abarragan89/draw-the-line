import { useParams } from 'react-router-dom';
import { QUERY_FRIEND } from '../../utils/queries';
import { useQuery } from '@apollo/client';

function FriendProfile () {

    const { username: userParam } = useParams()
    const { loading, data } = useQuery(QUERY_FRIEND, {
        variables: { username: userParam },
      });
    
    const userPosts = data?.user.posts || [];
    const userFriends = data?.user.friend

    return (
        <>
            <p>This is the profile of {userParam}</p>
            <p>Tom's posts are {userPosts.map( post => (
                <p>{post.postText}</p>
            ))} </p>

        </>

    )
}

export default FriendProfile;