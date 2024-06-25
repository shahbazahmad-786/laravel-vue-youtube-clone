export default {
    app: {
        name: "YouTube",
        textLogo: "http://localhost:3000/src/assets/images/logo-text.png",
        logo: "http://localhost:3000/src/assets/images/logo.png",
    },

    user: {
        token: sessionStorage.getItem("TOKEN"),
        data: {},
    },

    videos: {
        loading: false,
        videos: [],
    },
};
