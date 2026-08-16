import { useForm } from "react-hook-form";
import "./CommentEditModal.css";
import { useUpdataComment } from "../services/tanStack";
import { toast } from "react-toastify";
function CommentEditModal({ comment, setIsCommentEditModalOpen }) {
    const { register, handleSubmit, reset, formState: { errors, isValid, isDirty } } = useForm({
        mode: "onChange", defaultValues: {
            content: comment?.content || "",
            tweetId: comment?.tweetId
        }
    });
    const updataComment = useUpdataComment();
    const onSubmit = (data) => {
        updataComment.mutate({
            comment: data,
            tweetId: comment?.tweetId,
            commentId: comment?.id
        },
            {
                onSuccess: () => {
                    reset();
                    toast.success("Yorum başarıyla güncellendi...");
                    setIsCommentEditModalOpen(false);
                },

                onError: (error) => {
                    console.log(error)
                    toast.error("Yorum güncellenirken bir hata oluştu...");
                },
            });

    }
    return (
        <div className="comment-modal-container">
            <form className="comment-modal-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="comment-modal-form-header">
                    <h3>{comment.userName}</h3>
                    <textarea
                        placeholder="Ne düşünüyorsun?"
                        {...register("content", {
                            required: true,
                            maxLength: {
                                value: 280,
                                message: "Comment en fazla 280 karakter olabilir."
                            }
                        })}
                    />
                </div>
                <div className="comment-modal-form-buttons">
                    <button type="button" onClick={() => setIsCommentEditModalOpen(false)}>
                        İptal
                    </button>
                    <button type="submit" disabled={!isValid || !isDirty}>
                        Düzenle
                    </button>
                </div>
            </form>

        </div>
    );
}

export default CommentEditModal;