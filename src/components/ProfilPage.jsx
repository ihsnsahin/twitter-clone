import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser, useGetRetweetsByUserId, useGetTweetByUserId, useGetUserByUserId } from "../services/tanStack";
import Header from "./Header";
import "./ProfilPage.css"
import TweetCard from "./TweetCard";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
function ProfilPage() {
    const [activeTab, setActiveTab] = useState("Tweets");

    const { id } = useParams();
    const { data: currentUser, isPending: isAuthPending, error: isAuthError } = useCurrentUser();

    const targetUserId = id || currentUser?.id;

    const { data: user, isPending: isTargetUserPending, error: isTargetUserError } = useGetUserByUserId(targetUserId);
    const { data: tweetListByUserId = [], isPending: isTweetsLoading, error: isTweetError } = useGetTweetByUserId(targetUserId);
    const { data: retweetListByUserId = [], isPending: isRetweetsLoading, error: isRetweetError } = useGetRetweetsByUserId(targetUserId);



    if (isAuthPending || isTweetsLoading || isTargetUserPending || isRetweetsLoading) return "Yükleniyor..."
    if (isAuthError || isTweetError || isTargetUserError || isRetweetError) return "Yüklenirken bir hata oluştu..."
    return (
        <>
            <Header />
            <main className="profil-container">
                <div className="profil-header">
                    <FaUserCircle className="user-circle" />
                    <div className="user-info">
                        <h1>@{user?.userName || currentUser?.userName}</h1>
                        <div className="tweet-info">
                            <div className="tweet">
                                <span >{tweetListByUserId.length}</span>
                                <span>Tweet</span>
                            </div>
                            <div className="tweet">
                                <span >{retweetListByUserId.length}</span>
                                <span>Retweet</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="profil-tabs">
                    <div className="profil-tab" onClick={() => setActiveTab("Tweets")}>
                        <span className={activeTab === "Tweets" ? "active" : ""}>
                            Tweetler
                        </span>
                    </div>
                    <div className="profil-tab" onClick={() => setActiveTab("Retweets")}>
                        <span className={activeTab === "Retweets" ? "active" : ""}>
                            Retweetler
                        </span>
                    </div>
                </div>

                <div className="tweet-list">
                    {(activeTab === "Tweets") && (tweetListByUserId.length === 0 ? (
                        <p>Henüz tweet yok.</p>
                    ) : (
                        [...tweetListByUserId].reverse().map((tweet) => (
                            <TweetCard
                                key={tweet.id}
                                tweet={tweet}
                            />
                        ))
                    ))}
                    {(activeTab === "Retweets") && (retweetListByUserId.length === 0 ? (
                        <p>Henüz retweet yok.</p>
                    ) : (
                        [...retweetListByUserId].reverse().map((retweet) => (
                            <TweetCard
                                key={retweet.id}
                                tweet={retweet.tweet}
                            />
                        ))
                    ))}
                </div >
            </main>
        </>
    )
}
export default ProfilPage;