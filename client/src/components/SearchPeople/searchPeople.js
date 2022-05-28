import { QUERY_USER_BY_NAME } from '../../utils/queries';
import { useLazyQuery } from '@apollo/client';

function SearchPeople() {
    const [
      findUser, 
      { loading, data, error }
    ] = useLazyQuery(QUERY_USER_BY_NAME, {
        onCompleted: () => {
            console.log(data)
        }
    });

    async function handleSubmit(e) {
        try {
            const searchedUser = await document.getElementById('search-bar').value
            console.log(await searchedUser)
            await findUser({variables: {username: searchedUser}});
            console.log(await data.userByName.username)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <form onSubmit={() => handleSubmit()}>
                <label>Search for People</label>
                <input type='text' name='search-bar' id='search-bar'/>
                <button type='submit'>Search</button>
            </form>
            <div>

            </div>
        </>
    )
}

export default SearchPeople;