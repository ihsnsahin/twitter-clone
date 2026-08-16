import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import "./TweetPageHeader.css"
import { useCurrentUser, useDeleteTweet } from "../services/tanStack";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
function TweetPageHeader(props) {

    const { tweet, setIsEditModalOpen } = props;

    //Tweet sahibi ise tweet silinebilir ve düzeltilebilir
    //Yorum sahini ise yorum silinebilir ve düzeltilebilir
    //Tweet sabib ise yorum silinebilir
    //Bu iki kod bunlardan dolayı yazıldı.
    const { data: currentUser } = useCurrentUser();

    const isTweetOwner = Number(currentUser?.id) === Number(tweet.userId);


    const deleteTweet = useDeleteTweet();
    const history = useHistory();

    const handleDeleteTweet = () => {
        deleteTweet.mutate(
            tweet.id,
            {
                onSuccess: () => {
                    history.push("/");
                    toast.success("Tweet başarılı bir şekilde silindi..")
                },
                onError: (error) => {
                    console.log(error?.response?.data?.message)
                    toast.error("Tweet silinirken bir hata oluştu..");
                }

            })
    }
    return (
        <div className="tweet-detail-header">
            <div className="tweet-detail-back">
                <FaArrowLeft className="tweet-detail-arrow-left" onClick={() => history.goBack()} />
                <h1>POST</h1>
            </div>
            {
                isTweetOwner
                &&
                (<div className="tweet-detail-actions">
                    <FaTrash className="tweet-detail-delete" onClick={handleDeleteTweet} />
                    <FaEdit className="tweet-detail-edit" onClick={() => setIsEditModalOpen(true)} />
                </div>)
            }
        </div>
    )
}
export default TweetPageHeader;