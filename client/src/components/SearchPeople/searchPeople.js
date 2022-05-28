// import { Link } from 'react-router-dom';
import { QUERY_USER_BY_NAME } from '../../utils/queries';
import { useLazyQuery} from '@apollo/client';

function SearchPeople() {
    const searchedUser = document.getElementById('search-bar')
    const [
      searchPeople, 
      { loading, data }
    ] = useLazyQuery(QUERY_USER_BY_NAME, { variables: {username: searchedUser}});

    if (loading) return <p>Let's find some friends...</p>

    async function handleSubmit(event) {
        event.preventDefault();
        await searchPeople();
        console.log( await data);
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Search for People</label>
                <input type='text' name='search-bar' id='search-bar'/>
                <button type='submit'>Search</button>
            </form>
        </>
    )
}

export default SearchPeople;