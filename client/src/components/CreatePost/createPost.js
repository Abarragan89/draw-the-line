import React, { useState, useEffect, useRef } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import { QUERY_POSTS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AUTH from "../../utils/auth.js";

//style imports
import '../../components/CreatePost';

export default function CreatePost() {
    //get routes and stuff here

    // User information is not being pulled :(
    const [user, setUser] = useState("");
    const [fullUser, setFullUser] = useState({});
    const [loading, setLoading] = useState(false);
    let formObject = {};
    const formEl = useRef(null);
    const { id: userId } = useParams()
    const { data } = useQuery(QUERY_POSTS, {
        variables: { id: userId },
      });
    
    const userPosts = data?.user.posts || [];
    const userTitle = data?.user.title || [];

    
    

    useEffect(() => {
        loadUser();
    }, []);


    function loadUser() {
        setLoading(true);
        AUTH.getUser()
            .then(res => {
                setUser(res.data.user);
                // console.log(res.data.user);
                return res.data.user;
            })
            .then(async (userData) => {
                await getSingleUser(userData._id);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    async function getSingleUser(userId) {
        await API.getSingleUser(userId)
            .then(async res => {
                // console.log("Full User is:");
                console.log(res.data);
                await setFullUser(res.data);
            })
    }
    const [validated, setValidated] = useState(false);

    function handleFormSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false){
            event.preventDefault();
            event.stopPropagation();
        } else {

    API.createPost({
        tag: formObject.tag,
        title: formObject.title,
        body: formObject.body,
        createdby: user._id
    })
        .then(res => {
            formEl.current.reset();
            setModalShow(false);
        })
        .catch(err => console.log(err));
        
}

setValidated(true);
};

function PostModel(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create New Post
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} ref={formEl}>

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
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleFormSubmit}>Submit Post</Button>
            </Modal.Footer>
        </Modal>
    );
   
}};
