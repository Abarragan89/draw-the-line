import { useParams, Link } from 'react-router-dom';
import { QUERY_SINGLE_POST } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { DISLIKE_POST, LIKE_POST, DELETE_POST } from '../../utils/mutations';
import './singlePost.css';

function SinglePost() {

    const { id: postId } = useParams()
    const { data } = useQuery(QUERY_SINGLE_POST, {
        variables: { id: postId },
    });

    const userPost = data?.post || [];
    console.log(userPost)

    const [addDislike] = useMutation(DISLIKE_POST)

    const [addLike, { error }] = useMutation(LIKE_POST);
    if (error) {
        console.log(error);
    }

    const [deletePost] = useMutation(DELETE_POST)

    return (
        <>
            <section>
                <h1>Posts</h1>

                {
                    <div>

                        <div className='single-post-container'>
                        <p>Username: {userPost.username}</p>
                        <p>Post Title: {userPost.postTitle}</p>
                        <p>Post Content: {userPost.postText}</p>
                        <p>Post Creation Date: {userPost.createdAt}</p>
                        </div>

                        <div className='likes-container'>
                        <p>Likes: {userPost.likes}</p>
                        <p>Dislikes: {userPost.dislikes}</p>
                        </div>

                        <div className='comments-container'>
                        <p>Comments {userPost.comments}</p>
                        </div>

                        <br></br>

                        <div className='banmeter'>
                        <p>Ban meter: {userPost.banMeter}</p>
                        </div>
                        <p>{userPost.likes}<a onClick={() => {
                            addLike({variables: {postId: userPost._id}})
                            if(userPost.banMeter >= 0.6){
                                deletePost({variables: {postId: userPost._id}})
                                const deletedPost = document.getElementById();
                                deletedPost.remove();
                            }
                        
                        }}> 👍</a></p>
                        <p>{userPost.dislikes}<a onClick={() => {
                        addDislike({variables: {postId: userPost._id}})
                        if(userPost.banMeter >= 0.6){
                                deletePost({variables: {postId: userPost._id}})
                                const deletedPost = document.getElementById();
                                deletedPost.remove();
                            }}
                        }>      👎</a></p>
                        
                        {userPost.banMeter &&
                            <>
                                <p>Ban Meter <a>{userPost.banMeter}</a></p>
                                <progress id="banMeter" value={userPost.banMeter} max="0.6">{userPost.banMeter} </progress>
                            </>
                        }
                    </div>
                }

            </section>
        </>
    )
}

export default SinglePost;

