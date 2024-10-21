import config from "../config";

export const handleFetch = async (path, options) => {
  try {
    const response = await fetch(`${config.apiUrl}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const responseJson = await response.json()

    if (!response.ok) {
      throw new Error(responseJson?.message || response.statusText);
    }

    return responseJson;
  } catch (error) {
    throw error;
  }
}

export const handleFetchWithCredentials = async (path, options = {}) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${config.apiUrl}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
    const responseJson = await response.json()

    if (!response.ok) {
      throw new Error(responseJson?.message || response.statusText);
    }

    return responseJson;
  } catch (error) {
    if (error.message === "TokenExpiredError") {
      const refreshToken = localStorage.getItem("refreshToken");
      return handleFetch("/auth/refresh-tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      }).then((data) => {
        localStorage.setItem("token", data.access.token);
        localStorage.setItem("refreshToken", data.refresh.token);
        return handleFetchWithCredentials(path, options);
      }).catch((error) => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
      });
    } else {
      throw error;
    }
  }
}


