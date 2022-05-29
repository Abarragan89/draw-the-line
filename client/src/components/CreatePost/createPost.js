import { useParams, Link } from 'react-router-dom';
import { QUERY_POSTS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Form from 'react-bootstrap/Form';

//HAS NOT BEEN TESTED!!!!
function CreatePost() {

    const { id: userId } = useParams()
    const { data } = useQuery(QUERY_POSTS, {
        variables: { id: userId },
      });
    
    const userPosts = data?.user.posts || [];
    const userTitle = data?.user.title || [];


    return (
        <>  
        <section>
            <h1>Title</h1>
            {userTitle.map((title, index) => (
                <section key={index}>
                    <h3>{post.postTitle}</h3>
                    <p>{post.postText}</p>
                </section>
            ))}
        </section>
        <section>
            <h1>Posts</h1>
            {userPosts.map((post, index) => (
                <div key={index}>
                   <Link to={`/CreatePost/${user._id}`}>{id.username}</Link>
                </div>
            ))} 
        </section>
        <Form.Group controlId="postTitle">
            <Form.Label>Title</Form.Label>
             <Form.Control 
             required
             type="post" 
             placeholder="Post Title" 
             name="title" 
             onChange={handleInputChange} />
                <Form.Control.Feedback type="invalid">
                    You must have a title for your post!
                     </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="postContent">
                            <Form.Label>Post Content</Form.Label>
                            <Form.Control as="textarea" rows={5} 
                                required
                                name="body" 
                                onChange={handleInputChange} />
                            <Form.Control.Feedback type="invalid">
                                You gotta have something to post!
                            </Form.Control.Feedback>
                        </Form.Group>
        <Modal.Footer>
            <Button onClick={handleFormSubmit}>Submit Post</Button>
                </Modal.Footer>
    </>

        // <p>This will be a form where you can submit a new post. Form should have a title and a body. Post Model needs to be updated to account for Post Title</p>
     )
    
}

export default CreatePost;