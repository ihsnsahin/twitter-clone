import TweetCard from "./TweetCard";
import "./TweetList.css"
import { useTweets } from "../services/tanStack";

function TweetList() {
    //const [tweetList, setTweetList] = useState([]);
    /*useEffect(() => {
        const getTweets = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/tweet",
                    {
                        withCredentials: true
                    }
                );

                setTweetList(response.data);
                console.log(response.data);

            } catch (error) {
                console.log(error.response?.data);
            }
        };

        getTweets();
    }, []);*/
    const { data: tweetList = [], isPending, error } = useTweets();
    if (isPending) return "Tweetler yükleniyor..."
    if (error) return "Tweetler yüklenirken bir hata oluştu..."
    return (
        <div className="tweet-list">
            {(tweetList.length === 0 ? (
                <p>Henüz tweet yok.</p>
            ) : (
                [...tweetList].reverse().map((tweet) => (
                    <TweetCard
                        key={tweet.id}
                        tweet={tweet}
                    />
                ))
            ))}
        </div >
    )
};
export default TweetList;