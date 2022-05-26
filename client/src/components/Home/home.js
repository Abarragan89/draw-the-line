import './home.css';

function Home() {
    return (
    <section id="home-page">
        <article id="discussions-forum">
            <div id="start-discussion">
                <input id="start-subject" placeholder="Subject/Topic"></input>
                <input id="start-convo-text" placeholder="What are your thoughts?" rows="5"></input>
            </div>
        </article>
    </section>
    )
}

export default Home