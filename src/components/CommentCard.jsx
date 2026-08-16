import { FaEdit, FaTrash } from "react-icons/fa";
import "./CommentCard.css"
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useCurrentUser, useDeleteComment } from "../services/tanStack";
import { toast } from "react-toastify";
import { useState } from "react";
import CommentEditModal from "./CommentEditModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function CommentCard({ comment, tweet }) {
    const history = useHistory();
    const deleteComment = useDeleteComment();
    const [isCommentEditModalOpen, setIsCommentEditModalOpen] = useState(false);

    //Tweet sahibi ise tweet silinebilir ve düzeltilebilir
    //Yorum sahini ise yorum silinebilir ve düzeltilebilir
    //Tweet sabib ise yorum silinebilir
    //Bu iki kod bunlardan dolayı yazıldı.
    const { data: currentUser } = useCurrentUser();
    const isCommentOwner = Number(currentUser?.id) === Number(comment?.user?.id);
    const isTweetOwner = Number(currentUser?.id) === Number(tweet.userId);

    const handleDeleteComment = () => {
        deleteComment.mutate(
            {
                tweetId: tweet?.id,
                commentId: comment?.id
            },
            {
                onSuccess: () => {
                    toast.success("Yorum başarılı bir şekilde silindi..")
                },
                onError: (error) => {
                    console.error(error?.response?.data?.message);
                    toast.error("Yorum silinirken bir hata oluştu..")
                }
            }
        );
    }
    const handleProfileClick = (e) => {
        e.stopPropagation();
        history.push(`/profile/${comment?.user?.id}`)
    }
    return (
        <div className="comment-card">
            <div className="comment-header">
                <h3 onClick={handleProfileClick}>{comment.user.userName}</h3>
                <div className="comment-detail-actions">
                    {(isTweetOwner || isCommentOwner) && <FaTrash className="comment-detail-delete" onClick={handleDeleteComment} />}
                    {isCommentOwner && <FaEdit className="comment-detail-edit" onClick={() => setIsCommentEditModalOpen(true)} />}
                </div>
            </div>
            <p>{comment.content}</p>
            <div className="comment-footer">
                <span className="comment-date">
                    {format(new Date(comment.commentTime), "dd MMMM yyyy", { locale: tr })}
                </span>
            </div>
            {isCommentEditModalOpen && (
                <CommentEditModal
                    comment={comment}
                    setIsCommentEditModalOpen={setIsCommentEditModalOpen}
                />
            )}
        </div>

    )
}
export default CommentCard;