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
            <form onSubmit={ async (e)=> {
                e.preventDefault();
                const inquiryUser = await document.getElementById('search-bar').value
                await findUser({variables: {username: inquiryUser}})
                }   
            }>
                <label>Search for People</label>
                <input type='text' name='search-bar' id='search-bar'/>
                <button type='submit'>Search</button>
                { data && data.userByName === null && <p>User does not exist</p>}
                { data && data.userByName !== null && 
                <>
                    <p>{data.userByName.username}</p>
                    <button>Add Friend</button>
                </>
                }
            </form>
            <div>

            </div>
        </>
    )
}

export default SearchPeople;