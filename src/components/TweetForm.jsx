import { useForm } from "react-hook-form";
import "./TweetForm.css"
import { toast } from "react-toastify";
import { useCreateTweeet } from "../services/tanStack";
function TweetForm() {
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
        mode: "onChange", defaultValues: {
            content: ""
        }
    });
    /*  Use Mutation kullanmadan önce.
    const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/tweet",
                data,
                {
                    withCredentials: true //bu istekte browser'ın cookileri kullanmasına izin verir.
                }
            );
            reset();
            console.log(response.data);
            toast.success("Tweet başarıyla yüklendi...");
        } catch (error) {
            console.log(error.response.data);
            toast.error("Tweet yüklenirken bir hata oluştu...");

        } */
    const { mutate } = useCreateTweeet();
    const onSubmit = (data) => {
        mutate(data, {
            onSuccess: () => {
                reset();
                toast.success("Tweet başarıyla yüklendi...");
            },

            onError: (error) => {
                toast.error("Tweet yüklenirken bir hata oluştu...");
            },
        });

    }
    return (
        <div className="tweet-form-container">
            <form onSubmit={handleSubmit(onSubmit)} className="tweet-form">
                <textarea
                    placeholder="Ne düşünüyorsun?"
                    {...register("content",
                        {
                            required: true, maxLength: {
                                value: 280,
                                message: "Tweet en fazla 280 karakter olmalıdır."
                            }
                        }
                    )}
                />
                <div className="tweet-form-button">
                    <button type="submit" disabled={!isValid}>
                        Tweetle
                    </button>
                </div>

            </form>
            {errors.content && (<span className="tweet-error">{errors.content.message}</span>)}
        </div>)
}
export default TweetForm;