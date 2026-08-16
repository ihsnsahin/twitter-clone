import { useForm } from "react-hook-form";
import "./TweetEditModal.css";
import { useUpdateTweet } from "../services/tanStack";
import { toast } from "react-toastify";
function TweetEditModal({ tweet, setIsEditModalOpen }) {
    const { register, handleSubmit, reset, formState: { errors, isValid, isDirty } } = useForm({
        mode: "onChange", defaultValues: {
            content: tweet?.content || ""
        }
    });
    const updataTweet = useUpdateTweet();
    const onSubmit = (data) => {
        updataTweet.mutate({
            tweet: data,
            tweetId: tweet.id
        },
            {
                onSuccess: () => {
                    reset();
                    toast.success("Tweet başarıyla güncellendi...");
                    setIsEditModalOpen(false);
                },

                onError: (error) => {
                    toast.error("Tweet güncellenirken bir hata oluştu...");
                },
            });

    }
    return (
        <div className="tweet-modal-container">
            <form className="tweet-modal-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="tweet-modal-form-header">
                    <h3>{tweet.userName}</h3>
                    <textarea
                        placeholder="Ne düşünüyorsun?"
                        {...register("content", {
                            required: true,
                            maxLength: {
                                value: 280,
                                message: "Tweet en fazla 280 karakter olabilir."
                            }
                        })}
                    />
                </div>
                <div className="tweet-modal-form-buttons">
                    <button type="button" onClick={() => setIsEditModalOpen(false)}>
                        İptal
                    </button>
                    <button type="submit" disabled={!isValid || !isDirty}>
                        Düzenle
                    </button>
                </div>
                {errors.content && <span>{errors.content.message}</span>}
            </form>

        </div>
    );
}

export default TweetEditModal;