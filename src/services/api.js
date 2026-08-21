import axios from "axios";
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
//
export const getUser = async () => {
    const response = await axios.get(
        `${API_BASE_URL}/me`,
        {
            withCredentials: true
        }
    );
    return response.data;
};


// Tüm tweetleri getiren Api isteği
export const getTweets = async () => {
    const response = await axios.get(
        `${API_BASE_URL}/tweet`,
        {
            withCredentials: true
        }
    );
    return response.data;
};
//Tweet gönderen Api isteği
export const createTweet = async (tweet) => {
    const response = await axios.post(
        `${API_BASE_URL}/tweet`,
        tweet,
        {
            withCredentials: true //bu istekte browser'ın cookileri kullanmasına izin verir.
        });
    return response.data;
}
//Tweet beğenen Api isteği
export const likeTweet = async (tweetId) => {
    const response = await axios.post(
        `${API_BASE_URL}/like`,
        {
            tweetId: tweetId,
        },
        {
            withCredentials: true
        });
    return response.data;
}
//Beğenilen tweetten beğeniyi kaldıran Api isteği
export const dislikeTweet = async (tweetId) => {
    const response = await axios.post(
        `${API_BASE_URL}/dislike`,
        {
            tweetId: tweetId,
        },
        {
            withCredentials: true
        });
    return response.data;
}
//Retweet Api isteği
export const retweet = async (tweetId) => {
    const response = await axios.post(
        `${API_BASE_URL}/retweet`,
        {
            tweetId: tweetId,
        },
        {
            withCredentials: true
        });
    return response.data;
}
//Retweet kaldıran Api isteği
export const removeRetweet = async ({ retweetId }) => {
    const response = await axios.delete(
        `${API_BASE_URL}/retweet/${retweetId}`,
        {
            withCredentials: true
        });
    return response.data;
}
//Id'ye göre tweet getiren Api isteği
export const getTweetById = async (tweetId) => {
    const response = await axios.get(
        `${API_BASE_URL}/tweet/findById/${tweetId}`,
        {
            withCredentials: true
        }
    );
    return response.data;
};
//Id'ye göre tweet silen Api isteği
export const deleteTweet = async (tweetId) => {
    const response = await axios.delete(
        `${API_BASE_URL}/tweet/${tweetId}`,
        {
            withCredentials: true
        });
    return response.data;
}
//Yorum yap.
export const createComment = async (comment) => {
    const response = await axios.post(
        `${API_BASE_URL}/comment`,
        comment,
        {
            withCredentials: true
        });
    return response.data;
}
//Id'ye göre Comment Silme Api isteği
export const deleteComment = async ({ commentId }) => {
    const response = await axios.delete(
        `${API_BASE_URL}/comment/${commentId}`,
        {
            withCredentials: true
        });
    return response.data;
}

//Id'ye göre Tweet düzenleme Api isteği
export const updataTweet = async ({ tweetId, tweet }) => {
    const response = await axios.put(
        `${API_BASE_URL}/tweet/${tweetId}`,
        tweet,
        {
            withCredentials: true
        });
    return response.data;
}
//Id'ye göre Comment düzenleme Api isteği

export const updataComment = async ({ commentId, comment }) => {
    const response = await axios.put(
        `${API_BASE_URL}/comment/${commentId}`,
        comment,
        {
            withCredentials: true
        });
    return response.data;
}

//UserId'ye göre tweet listesi getirme Api isteği
export const getTweetByUserId = async (userId) => {
    const response = await axios.get(
        `${API_BASE_URL}/tweet/findByUserId/${userId}`,
        {
            withCredentials: true
        }
    );
    return response.data;
};
//userId'ye göre kullanıcı bilgileri
export const getUserByUserId = async (userId) => {
    const response = await axios.get(
        `${API_BASE_URL}/user/${userId}`,
        {
            withCredentials: true
        }
    );
    return response.data;
};
//userId'ye göre tweet listesi getirme Api isteği
export const getRetweetsByUserId = async (userId) => {
    const response = await axios.get(
        `${API_BASE_URL}/retweet/findByUserId/${userId}`,
        {
            withCredentials: true
        }
    );
    return response.data;
};