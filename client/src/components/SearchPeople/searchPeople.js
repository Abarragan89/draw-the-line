import { QUERY_USER_BY_NAME } from '../../utils/queries';
import { useLazyQuery, useMutation } from '@apollo/client';
import { ADD_FRIEND } from '../../utils/mutations';
import './searchPeople.css'


function SearchPeople() {
    // find user Query
    const [findUser, { data }] = useLazyQuery(QUERY_USER_BY_NAME);

    // Add friend Query
    const [addFriend, { data: newFriend }] = useMutation(ADD_FRIEND);

    return (
        <>
            <section className="search-friend-section">
                <form id="search-friend-form" className='login-form' onSubmit={async (e) => {
                    e.preventDefault();
                    const inquiryUser = await document.getElementById('search-bar').value
                    await findUser({ variables: { username: inquiryUser } })
                }
                }>

                    <h2 className='section-heading'>Search Friends</h2>
                    <input id='search-bar' className='login-input' type='text' name='search-bar' placeholder='Search' />
                    <button id="search-friend-btn" className='login-button' type='submit'>Search</button>
                    {data && data.userByName === null && <p id='no-user-text'>User does not exist</p>}
                </form>
                {data && data.userByName !== null &&
                    <>
                        <div id="foundFriendDiv">
                            <p id="foundFriend">{data.userByName.username}</p>
                            <button id="addFriendBtn" className='post-mutation-btn' onClick={() => {
                                try {
                                    addFriend({ variables: { friendId: data.userByName._id } })
                                    alert("friend has been added!")
                                } catch (e) {
                                    console.log(e)
                                    alert("You are already friends")
                                }
                            }}>Add Friend</button>
                        </div>
                    </>

                }
            </section>
            <div>

            </div>
        </>
    )
}

export default SearchPeople;