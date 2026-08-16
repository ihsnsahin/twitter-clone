
import { FaRegComment, FaRetweet, FaRegHeart, FaHeart } from 'react-icons/fa';
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import "./TweetCard.css"
import { useDislikeTweet, useLikeTweet, useRemoveRetweet, useRetweet } from '../services/tanStack';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
function TweetCard(props) {
    const { tweet } = props;
    const history = useHistory();


    const isLiked = tweet.likedByCurrentUser || false;
    const isRetweeted = !!tweet.currentUserRetweetId;


    const handleCardClick = () => {
        history.push(`/tweet/${tweet.id}`);
    }

    const like = useLikeTweet();
    const dislike = useDislikeTweet();
    const retweet = useRetweet();
    const removeRetweet = useRemoveRetweet();

    const handleLike = (e, tweetId) => {
        e.stopPropagation();
        like.mutate(tweetId);
    };

    const handleDislike = (e, tweetId) => {
        e.stopPropagation();
        dislike.mutate(tweetId)
    };
    const handleRetweet = (e, tweetId) => {
        e.stopPropagation();
        retweet.mutate(tweetId);
    };
    const handleRemoveRetweet = (e, retweetId) => {
        e.stopPropagation();
        removeRetweet.mutate({ retweetId, tweetId: tweet.id })

    }
    const handleProfileClick = (e) => {
        e.stopPropagation();
        history.push(`/profile/${tweet?.userId}`)
    }
    return (
        <div className="tweet-card" onClick={handleCardClick}>
            <h3 onClick={handleProfileClick}>{tweet.userName}</h3>
            <p>{tweet.content}</p>
            <div className="tweet-footer">
                <div className="tweet-action" >
                    <div className="tweet-action-icon">
                        {isLiked
                            ? <FaHeart onClick={(e) => handleDislike(e, tweet.id)} className="fa-heart" />
                            : <FaRegHeart onClick={(e) => handleLike(e, tweet.id)} className="fa-reg-heart" />}
                    </div>
                    <span>{tweet.likeCount == 0 ? "" : tweet.likeCount}</span>
                </div>
                <div className="tweet-action">
                    <div className="tweet-action-icon">
                        <FaRegComment className="fa-reg-comment" />
                    </div>
                    <span>{tweet.commentCount == 0 ? "" : tweet.commentCount}</span>
                </div>
                <div className="tweet-action">
                    <div className="tweet-action-icon">
                        {isRetweeted
                            ? <FaRetweet onClick={(e) => handleRemoveRetweet(e, tweet.currentUserRetweetId)} className="fa-retweeted" />
                            : <FaRetweet onClick={(e) => handleRetweet(e, tweet.id)} className="fa-retweet" />}
                    </div>
                    <span>{tweet.retweetCount == 0 ? "" : tweet.retweetCount}</span>
                </div>
                <span className="tweet-date">
                    {format(new Date(tweet.tweetTime), "dd MMMM yyyy", { locale: tr })}
                </span>
            </div>
        </div>
    )
}
export default TweetCard;