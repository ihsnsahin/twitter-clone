import axios from "axios";
//
export const getUser = async () => {
    const response = await axios.get(
        "http://localhost:3000/me",
        {
            withCredentials: true
        }
    );
    return response.data;
};


// Tüm tweetleri getiren Api isteği
export const getTweets = async () => {
    const response = await axios.get(
        "http://localhost:3000/tweet",
        {
            withCredentials: true
        }
    );
    return response.data;
};
//Tweet gönderen Api isteği
export const createTweet = async (tweet) => {
    const response = await axios.post(
        "http://localhost:3000/tweet",
        tweet,
        {
            withCredentials: true //bu istekte browser'ın cookileri kullanmasına izin verir.
        });
    return response.data;
}
//Tweet beğenen Api isteği
export const likeTweet = async (tweetId) => {
    const response = await axios.post(
        "http://localhost:3000/like",
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
        "http://localhost:3000/dislike",
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
        "http://localhost:3000/retweet",
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
        `http://localhost:3000/retweet/${retweetId}`,
        {
            withCredentials: true
        });
    return response.data;
}
//Id'ye göre tweet getiren Api isteği
export const getTweetById = async (tweetId) => {
    const response = await axios.get(
        `http://localhost:3000/tweet/findById/${tweetId}`,
        {
            withCredentials: true
        }
    );
    return response.data;
};
//Id'ye göre tweet silen Api isteği
export const deleteTweet = async (tweetId) => {
    const response = await axios.delete(
        `http://localhost:3000/tweet/${tweetId}`,
        {
            withCredentials: true
        });
    return response.data;
}
//Yorum yap.
export const createComment = async (comment) => {
    const response = await axios.post(
        "http://localhost:3000/comment",
        comment,
        {
            withCredentials: true
        });
    return response.data;
}
//Id'ye göre Comment Silme Api isteği
export const deleteComment = async ({ commentId }) => {
    const response = await axios.delete(
        `http://localhost:3000/comment/${commentId}`,
        {
            withCredentials: true
        });
    return response.data;
}

//Id'ye göre Tweet düzenleme Api isteği
export const updataTweet = async ({ tweetId, tweet }) => {
    const response = await axios.put(
        `http://localhost:3000/tweet/${tweetId}`,
        tweet,
        {
            withCredentials: true
        });
    return response.data;
}
//Id'ye göre Comment düzenleme Api isteği

export const updataComment = async ({ commentId, comment }) => {
    const response = await axios.put(
        `http://localhost:3000/comment/${commentId}`,
        comment,
        {
            withCredentials: true
        });
    return response.data;
}

//UserId'ye göre tweet listesi getirme Api isteği
export const getTweetByUserId = async (userId) => {
    const response = await axios.get(
        `http://localhost:3000/tweet/findByUserId/${userId}`,
        {
            withCredentials: true
        }
    );
    return response.data;
};

export const getUserByUserId = async (userId) => {
    const response = await axios.get(
        `http://localhost:3000/user/${userId}`,
        {
            withCredentials: true
        }
    );
    return response.data;
};