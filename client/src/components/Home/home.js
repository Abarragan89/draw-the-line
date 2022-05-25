import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS, QUERY_ME_BASIC } from '../../utils/queries';


function Home () {
    // const { loadingUser, error,  userData } = useQuery(QUERY_ME_BASIC);
    const { loadingPost, error, postData } = useQuery(QUERY_POSTS);
    console.log(postData, error)

    return (
        <>
        <p>Hello</p>
        {/* <h1>{userData.me_id}</h1> */}
        </>
    )
}

export default Home;