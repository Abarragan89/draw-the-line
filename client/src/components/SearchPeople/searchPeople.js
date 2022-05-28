import './searchPeople.css';
import Nav from '../Nav/nav';

import { QUERY_USER_BY_NAME } from '../../utils/queries';
import { useLazyQuery } from '@apollo/client';
import { ADD_FRIEND } from '../../utils/mutations';

function SearchPeople() {
    // find user Query
    const [findUser, { data }] = useLazyQuery(QUERY_USER_BY_NAME);

    // Add friend Query
    // const [addFriend, { data: newFriend }] = useLazyQuery(ADD_FRIEND);

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
                <input id='search-bar' type='text' name='search-bar' />
                <button id="search-friend-btn" type='submit'>Search</button>
                {data && data.userByName === null && <p>User does not exist</p>}
                {data && data.userByName !== null &&
                    <>
                        <p>{data.userByName.username}</p>
                        <button id="add-friend-btn" type='submit'>Add Friend</button>
                    </>
                }
            </form>
            <div>

            </div>
        </>
    )
}

export default SearchPeople;