const setUser = (state, user) => {
    state.user.data = user;
};

const setToken = (state, token) => {
    state.user.token = token;

    if (token) {
        sessionStorage.setItem("TOKEN", token);
    } else {
        sessionStorage.removeItem("TOKEN");
    }
};

const setVideos = (state, [loading, data = null]) => {
    if (data) {
        state.videos.videos = data;
    }
    state.videos.loading = loading;
};

export { setUser, setToken, setVideos };
