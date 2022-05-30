import './searchPeople.css';
import Nav from '../Nav/nav';

import { QUERY_USER_BY_NAME } from '../../utils/queries';
import { useLazyQuery, useMutation } from '@apollo/client';
import { ADD_FRIEND } from '../../utils/mutations';

function SearchPeople() {
    // find user Query
    const [findUser, { data }] = useLazyQuery(QUERY_USER_BY_NAME);

    // Add friend Query
    const [addFriend, { data: newFriend }] = useMutation(ADD_FRIEND);
    console.log(data)
    return (
        <>
            <div id="hamburger">
                <Nav />
            </div>
            <form id="search-friend-form" onSubmit={async (e) => {
                e.preventDefault();
                const inquiryUser = await document.getElementById('search-bar').value
                await findUser({ variables: { username: inquiryUser } })
            }
            }>
                <label id="sfp-label">Search for People</label>
                <input type='text' name='search-bar' id='search-bar'/>
                <button id="search-friend-btn" type='submit'>Search</button>
                { data && data.userByName === null && <p>User does not exist</p>}
                { data && data.userByName !== null && 
                <>
                    <div id="foundFriendDiv">
                    <p id="foundFriend">{data.userByName.username}</p>
                    <button id="addFriendBTN"onClick={() => {
                        try {
                            addFriend({variables: {friendId: data.userByName._id}})
                            alert("friend has been added!")
                        } catch(e) {
                            console.log(e)
                            alert("You are already friends")
                        }
                    }}>Add Friend</button>
                    </div>
                </>
                }
            </form>
            <div>

            </div>
        </>
    )
}

export default SearchPeople;