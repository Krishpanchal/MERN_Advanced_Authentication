import axios from "axios";

export const isAuthenticated = () => {
  if (localStorage.getItem("authToken")) {
    return true;
  }
  return false;
};

export const signupUser = async (formData) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await axios.post(
      "http://127.0.0.1:5000/api/v1/users/signup",
      formData,
      config
    );

    if (response.data.status === "success") {
      localStorage.setItem("authToken", response.data.data.token);
      return {
        status: true,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error.response.data.error,
    };
  }
};

export const loginUser = async (formData) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await axios.post(
      "http://127.0.0.1:5000/api/v1/users/login",
      formData,
      config
    );

    if (response.data.status === "success") {
      localStorage.setItem("authToken", response.data.data.token);
      return {
        status: true,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error.response.data.error,
    };
  }
};

export const forgotPassword = async (formData) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await axios.post(
      "http://127.0.0.1:5000/api/v1/users/forgotPassword",
      formData,
      config
    );

    if (response.data.status === "success") {
      return {
        status: true,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error.response.data.error,
    };
  }
};

export const resetPassword = async (token, password) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await axios.patch(
      `http://127.0.0.1:5000/api/v1/users/resetPassword/${token}`,
      {
        password,
      },
      config
    );

    if (response.data.status === "success") {
      return {
        status: true,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error.response.data.error,
    };
  }
};
