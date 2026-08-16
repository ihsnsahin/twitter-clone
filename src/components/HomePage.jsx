import Header from "./Header";
import "./HomePage.css"
import TweetForm from "./TweetForm";
import TweetList from "./TweetList";


function HomePage() {
    return (
        <>
            <Header />
            <main className="main-container">
                <TweetForm />
                <TweetList />
            </main>
        </>
    )
}
export default HomePage;