import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { QUERY_POSTS } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { DISLIKE_POST, LIKE_POST, DELETE_POST, } from '../../utils/mutations';
import { QUERY_ME_BASIC } from '../../utils/queries';
import { ADD_POST } from '../../utils/mutations';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//HAS NOT BEEN TESTED!!!!
function CreatePost() {

    const { id: postId } = useParams()
    const { data } = useQuery(QUERY_POSTS, {
        variables: { id: postId },
    });

    const userPost = data?.post || [];
    console.log(userPost)

    const [addDislike] = useMutation(DISLIKE_POST)

    const [addLike, { error }] = useMutation(LIKE_POST);
    if (error) {
        console.log(error);
    }
    const { basic } = useQuery(QUERY_ME_BASIC);
    const username = basic?.me.username || '';
    const [deletePost] = useMutation(DELETE_POST)


    // set up state variables for comment section
    const [formState, setFormState] = useState({
        postTitle: '',
        postText: '',
        username: username,
      });
      
      const [addPost] = useMutation(ADD_POST);


    // handleChange for comment section
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
        ...formState,
        [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
    event.preventDefault();
    await addPost({
        variables: { ...formState },
    });
    };

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