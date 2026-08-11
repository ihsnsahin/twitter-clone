import "./Login.css"
import { useForm } from "react-hook-form";
import twitterLogo from "../assets/twitter.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        mode: "onChange",
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const history = useHistory();
    const onSubmit = async (data) => {

        try {
            const response = await axios.post(
                "http://localhost:3000/login",
                data,
                {
                    withCredentials: true //bu istekte browser'ın cookileri kullanmasına izin verir.
                }
            );
            console.log(response.data);
            toast.success(`Giriş başarılı ana sayfaya yönlendiriliyorum...`)
            history.push("/")
        } catch (error) {
            if (error.response?.status === 401) {
                toast.error("E-posta veya şifre hatalı.");
            }
        }
    };
    return ((<div className="login-container">
        <img src={twitterLogo} alt="Twitter Clone Logo" className="login-logo" />
        <div className="login-card">
            <div className="login-header">
                <h1>Twitter Clone</h1>
                <h3>Giriş Yap</h3>
            </div>
            <div className="login-form-card">
                <form onSubmit={handleSubmit(onSubmit)} className="login-form-group">
                    <div className="login-input-group">
                        <label htmlFor="email">E-Posta</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="E-Posta"
                            {...register("email", {
                                required: "Email zorunludur.",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Geçerli bir email adresi giriniz."
                                }
                            })}
                        />
                        {errors.email && (<span>{errors.email.message}</span>)}
                    </div>
                    <div className="login-input-group">
                        <label htmlFor="password">Şifre</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Şifre"
                            {...register("password", {
                                required: "Şifre zorunludur.",
                                minLength: {
                                    value: 6,
                                    message: "Şifre en az 6 karakter olmalıdır."
                                }
                            })}
                        />
                        {errors.password && (<span>{errors.password.message}</span>)}
                    </div>
                    <button id="login-button" type="submit" disabled={!isValid}>
                        Giriş Yap
                    </button>

                </form>
                <button id="routing-button" onClick={() => { history.push("/register") }}>Yeni Kayıt Oluştur</button>
            </div>
        </div>
    </div>
    ))
}
export default Login;