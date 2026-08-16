import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser, useGetTweetByUserId, useGetUserByUserId } from "../services/tanStack";
import Header from "./Header";
import "./ProfilPage.css"
import TweetCard from "./TweetCard";
import { FaUserCircle } from "react-icons/fa";
function ProfilPage() {
    const { id } = useParams();
    console.log("profile id: ", id);
    const { data: currentUser, isPending: isAuthPending, error: isAuthError } = useCurrentUser();

    const targetUserId = id || currentUser?.id;

    const { data: user, isPending: isTargetUserPending, error: isTargetUserError } = useGetUserByUserId(targetUserId);
    const { data: tweetListByUserId = [], isPending: isTweetsLoading, error: isTweetError } = useGetTweetByUserId(targetUserId)


    if (isAuthPending || isTweetsLoading || isTargetUserPending) return "Yükleniyor..."
    if (isAuthError || isTweetError || isTargetUserError) return "Yüklenirken bir hata oluştu..."
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
                        </div>
                    </div>
                </div>

                <div className="tweet-list">
                    {(tweetListByUserId.length === 0 ? (
                        <p>Henüz tweet yok.</p>
                    ) : (
                        [...tweetListByUserId].reverse().map((tweet) => (
                            <TweetCard
                                key={tweet.id}
                                tweet={tweet}
                            />
                        ))
                    ))}
                </div >
            </main>
        </>
    )
}
export default ProfilPage;