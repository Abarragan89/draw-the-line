import Nav from '../Nav/nav';
import './home.css';


function Home() {
    return (
        <>
            <Nav />
            <section id="home-page">
                <article id="discussions-forum">
                    <div id="start-discussion">
                        <textarea id="start-subject" placeholder="Subject/Topic" rows="2"></textarea>
                        <textarea id="start-convo-text" placeholder="What are your thoughts?" rows="15"></textarea>
                        <button id="submit-thought">Submit</button>
                    </div>
                </article>
            </section>
        </>

    )
}

export default Home