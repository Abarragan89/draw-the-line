
import React from 'react'
import './postCard.css'

function PostCard(props) {
  return (
    <div>
            <div className="card-main">
                <p className="post-title">{props.postTitle} POST TILE</p>
            <p className="post-text">{props.postText} POST CONTENT</p>
            <a href={props.username} target="_blank" className="btn btn-primary portfolio-btn">Commenter One</a>
            <div className='commentBox'></div>
            <input type="text" id="fname" name="fname" placeholder='Comment' />
        </div>
    </div>
  )
}

export default PostCard

