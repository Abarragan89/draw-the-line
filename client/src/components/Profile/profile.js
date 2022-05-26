import { Link } from 'react-router-dom'

function Profile() {
    return (
        <>
            <p>This is my profile page with all my posts, friends, ability to make a post, and links to my friends profiles pages</p>
            <Link to="/Create-post">Make a new post!</Link>

        </>
    )
}

export default Profile;