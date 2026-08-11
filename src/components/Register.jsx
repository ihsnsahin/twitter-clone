import "./Register.css"
import twitterLogo from "../assets/twitter.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
function Register() {
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
        mode: "onChange",
        defaultValues: {
            userName: "",
            email: "",
            password: ""
        }
    });
    const history = useHistory();
    const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/register",
                data
            );
            reset();
            console.log(response.data);
            toast.success(`Aramıza hoş geldin ${response.data.userName}. Giriş sayfasına yönlendiriyorum...`)
            history.push("/login")

        } catch (error) {
            console.log("HATA: ", error.response.data.status, error.response.data.message);
            toast.error(
                error.response?.data?.message
            );
        }
    };
    return (
        <div className="register-container">
            <img src={twitterLogo} alt="Twitter Clone Logo" className="register-logo" />
            <div className="register-card">
                <div className="register-header">
                    <h1>Twitter Clone</h1>
                    <h3>Üye Ol</h3>
                </div>
                <div className="register-form-card">
                    <form onSubmit={handleSubmit(onSubmit)} className="register-form-group">
                        <div className="register-input-group">
                            <label htmlFor="userName">Kullanıcı Adı</label>
                            <input
                                id="userName"
                                type="text"
                                placeholder="Kullanıcı Adı"
                                {...register("userName", {
                                    required: "Kullanıcı adı zorunludur.",
                                    minLength: {
                                        value: 3,
                                        message: "Kullanıcı adı en az 3 karakter olmalıdır."
                                    }
                                })}
                            />
                            {errors.userName && (<span>{errors.userName.message}</span>)}
                        </div>

                        <div className="register-input-group">
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
                        <div className="register-input-group">
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
                        <button id="register-button" type="submit" disabled={!isValid}>
                            Kayıt Ol
                        </button>

                    </form>
                    <p>Kayıt olarak Hizmet Şartları, Gizlilik Politikası ve Çerez Kullanımı koşullarımızı kabul etmiş olursunuz.</p>
                    <button id="routing-button" onClick={() => { history.push("/login") }}>Mevcut Hesabım Var</button>
                </div>
            </div>
        </div>
    )
}

export default Register