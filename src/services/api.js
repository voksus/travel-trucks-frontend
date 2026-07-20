import axios from "axios";

const api = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.log("GET Request Error Response Details:", {
        status: error.response.status,
        headers: error.response.headers,
        data: error.response.data,
        config: error.config,
      });
    } else if (error.request) {
      console.log("GET Request Error (No response received):", error.request);
    } else {
      console.log("GET Request Error Message:", error.message);
    }

    const isGetCampers =
      error.config &&
      error.config.method === "get" &&
      error.config.url.includes("/campers");

    // Handling 404 for campers query (no results found on MockAPI)
    if (error.response && error.response.status === 404 && isGetCampers) {
      console.log(
        "MockAPI returned 404 for campers query (no results found). Resolving as empty array.",
      );

      return Promise.resolve({
        data: {
          items: [],
          total: 0,
        },
      });
    }

    return Promise.reject(error);
  },
);

export default api;
