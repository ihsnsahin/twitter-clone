import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createComment, createTweet, deleteComment,
    deleteTweet, dislikeTweet, getTweetById,
    getTweetByUserId,
    getTweets, getUser, getUserByUserId, likeTweet, removeRetweet,
    retweet, updataComment, updataTweet
}
    from "./api";

export function useCurrentUser() {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: getUser,
        retry: false,
        staleTime: Infinity
    });
}


export function useTweets() {
    return useQuery({
        queryKey: ["tweets"],
        queryFn: getTweets,
    });
};

export function useCreateTweeet() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createTweet,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tweets"],
            });
        }
    })
}

export function useLikeTweet() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: likeTweet,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tweets"],
            });
            queryClient.invalidateQueries({
                queryKey: ["tweet"],
            });
            queryClient.invalidateQueries({
                queryKey: ["tweet-user"],
            })
        }
    })
}
export function useDislikeTweet() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: dislikeTweet,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tweets"],
            });
            queryClient.invalidateQueries({
                queryKey: ["tweet"],
            });
            queryClient.invalidateQueries({
                queryKey: ["tweet-user"],
            })
        }
    })
}
export function useRetweet() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: retweet,

        onSuccess: async (_, tweetId) => {
            await queryClient.invalidateQueries({
                queryKey: ["tweets"],
            });
            await queryClient.invalidateQueries({
                queryKey: ["tweet", tweetId.toString()],
            });
            await queryClient.invalidateQueries({
                queryKey: ["tweet-user"],
            });
        },
    });
}
export function useRemoveRetweet() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: removeRetweet,
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({
                queryKey: ["tweets"],
            });
            await queryClient.invalidateQueries({
                queryKey: ["tweet", (variables.tweetId).toString()],
                //Sorun: Detay sayfasındaki ID metin ("12"), mutasyondaki ID ise sayı (12) olduğu için TanStack Query bunları farklı önbellekler sandı ve sayfayı yenilemedi.
                //Çözüm: Tüm ID'leri String(tweetId) ile aynı tipe getirerek önbellek anahtarlarını eşitledik.
            });
            await queryClient.invalidateQueries({
                queryKey: ["tweet-user"],
            });
        }
    })
}

export function useGetTweetById(tweetId) {
    return useQuery({
        queryKey: ["tweet", String(tweetId)],
        queryFn: () => getTweetById(tweetId)
    });     //Burada biz id'yi sayısal bir değer olarak kayıt ediyoruz.
};
export function useDeleteTweet() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteTweet,
        onSuccess: async (_, tweetId) => {
            await queryClient.invalidateQueries({
                queryKey: ["tweets"],
            });
            await queryClient.removeQueries({
                queryKey: ["tweet", String(tweetId)],
            });
        }
    })
}

export function useCreateComment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createComment,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["tweets"],
            });
            queryClient.invalidateQueries({
                queryKey: ["tweet", String(variables.tweetId)],
            });
        }
    })
}

export function useDeleteComment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteComment,
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({
                queryKey: ["tweets"],
            });
            await queryClient.invalidateQueries({
                queryKey: ["tweet", String(variables.tweetId)],
            });
        }
    })
}

export function useUpdateTweet() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updataTweet,
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({
                queryKey: ["tweets"],
            });
            await queryClient.invalidateQueries({
                queryKey: ["tweet", String(variables.tweetId)],
            });
        }
    })
}

export function useUpdataComment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updataComment,
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({
                queryKey: ["tweets"],
            });
            await queryClient.invalidateQueries({
                queryKey: ["tweet", String(variables.tweetId)],
            });
        }
    })
}

export function useGetTweetByUserId(userId) {
    return useQuery({
        queryKey: ["tweet-user", String(userId)],
        queryFn: () => getTweetByUserId(userId),
        enabled: !!userId && userId !== "undefined",
    });     //Burada biz id'yi sayısal bir değer olarak kayıt ediyoruz.
};


export function useGetUserByUserId(userId) {
    return useQuery({
        queryKey: ["user", String(userId)],
        queryFn: () => getUserByUserId(userId)
    });     //Burada biz id'yi sayısal bir değer olarak kayıt ediyoruz.
};

