import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Header from "./Header";
import "./TweetPage.css"
import TweetCard from "./TweetCard";
import { useGetTweetById } from "../services/tanStack";
import TweetPageHeader from "./TweetPageHeader";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import TweetEditModal from "./TweetEditModal";
import { useState } from "react";

function TweetPage() {
    const { id } = useParams();
    if (!id) return <p>Yükleniyor...</p>
    const { data: tweet, isPending, error } = useGetTweetById(id);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    return (
        <>
            <Header />
            <main className="tweet-detail-container">
                {isPending ? (
                    <p>Tweet yükleniyor...</p>
                ) : error ? (
                    <p>Bir hata oluştu...</p>
                ) : tweet ? (
                    <>
                        <TweetPageHeader tweet={tweet} setIsEditModalOpen={setIsEditModalOpen} />
                        <TweetCard tweet={tweet} />
                        <CommentForm tweet={tweet} />
                        {(tweet.comments.length === 0) ? (
                            <p>Henüz yorum yok.</p>
                        ) : (
                            [...(tweet.comments)].reverse().map((comment) => {
                                return <CommentCard key={comment.id} comment={comment} tweet={tweet} />
                            })
                        )}
                    </>
                ) : (
                    <p>Tweet bulunamadı.</p>
                )}
            </main>
            {isEditModalOpen && (
                <TweetEditModal
                    tweet={tweet}
                    setIsEditModalOpen={setIsEditModalOpen}
                />
            )}
        </>
    );
}
export default TweetPage;
















/*const [tweet, setTweet] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getTweet = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/tweet/findById/${id}`,
                    {
                        withCredentials: true
                    }
                );
                console.log(response.data);
                setTweet(response.data)

            } catch (error) {
                console.log(error.response?.data);
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            getTweet();
        }

    }, [id])*/