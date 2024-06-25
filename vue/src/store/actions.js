import axiosClient from "../axios";

const getUser = ({ commit }, data) => {
    return axiosClient.get("/user", data).then(({ data }) => {
        commit("setUser", data);
        return data;
    });
};

const register = ({ commit }, data) => {
    return axiosClient.post("/register", data).then(({ data }) => {
        commit("setUser", data.user);
        commit("setToken", data.token);
        return data;
    });
};

const login = ({ commit }, data) => {
    return axiosClient.post("/login", data).then(({ data }) => {
        commit("setUser", data.user);
        commit("setToken", data.token);
        return data;
    });
};

const logout = ({ commit }) => {
    return axiosClient.post("/logout").then((response) => {
        commit("setToken", null);
        return response;
    });
};

const createVideos = ({ commit }, data) => {
    const form = new FormData();

    form.append("title", data.title);
    form.append("thumbnail", data.thumbnail);
    form.append("video", data.video);

    data = form;

    return axiosClient.post("/videos", data);
};

const getVideos = ({ commit }) => {
    commit("setVideos", [false]);
    return axiosClient.get("/videos").then(({ data }) => {
        commit("setVideos", [false, data]);
    });
};

const getVideo = ({ commit }, id) => {
    return axiosClient.get(`/videos/${id}`);
};

export { getUser, register, login, logout, createVideos, getVideos, getVideo };
