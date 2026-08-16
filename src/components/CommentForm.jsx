import { useForm } from "react-hook-form";
import "./CommentForm.css"
import { useCreateComment } from "../services/tanStack";
import { toast } from "react-toastify";

function CommentForm({ tweet }) {
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
        mode: "onChange", defaultValues: {
            content: "",
            tweetId: tweet?.id || ""
        }
    });
    const createComment = useCreateComment();
    const onSubmit = (data) => {
        createComment.mutate(
            { tweetId: tweet.id, ...data },
            {
                onSuccess: () => {
                    reset({ content: "", tweetId: tweet?.id });
                },
                onError: (error) => {
                    console.log(error.response.data);
                }
            }
        )
    }
    return (<div className="comment-form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="comment-form">
            <textarea
                placeholder="Bu gönderi hakkında ne düşünüyorsun?"
                {...register("content",
                    {
                        required: true, maxLength: {
                            value: 280,
                            message: "Yorum en fazla 280 karakter olmalıdır."
                        }
                    }
                )}
            />
            <div className="comment-form-button">
                <button type="submit" disabled={!isValid}>
                    Yorum yap
                </button>
            </div>

        </form>
        {errors.content && (<span className="comment-error">{errors.content.message}</span>)}
    </div>)
}
export default CommentForm;