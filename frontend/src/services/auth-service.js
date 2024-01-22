import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const storeTokens = ({ access, refresh }) => {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
};

export const storeRole = (role) => {
  localStorage.setItem("role", role);
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refresh_token");
};

export const getRole = () => {
  return localStorage.getItem("role");
};

export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("role");
};

export const handleErrors = async (res) => {
  if (!res.ok) {
    const errorData = await res.json();
    console.log(errorData.error);

    const nonFieldErrors = errorData.errors?.non_field_errors || [];

    // Handling non-field errors
    if (nonFieldErrors.length > 0) {
      const nonFieldError = nonFieldErrors[0];

      toast.error(
        nonFieldError === "Password and Confirm Password don't match"
          ? "Confirm Password didn't Match"
          : nonFieldError === "You are not a Registered User"
          ? "Email not registered"
          : nonFieldError === "Email or Password is not Valid"
          ? "Invalid Credentials"
          : ""
      );
    }

    // Handling email errors
    const emailError = errorData.errors?.email?.[0];
    if (emailError) {
      toast.error(
        emailError === "user with this Email already exists."
          ? "User Already Exists"
          : ""
      );
    }

    // Handling other errors
    const generalError = errorData.error;
    if (generalError) {
      toast.error(
        generalError === "Invalid QR code data."
          ? "QR Code Expired"
          : generalError === "Device is outside from geofence location"
          ? "Device is not in Range"
          : generalError === "Attendance already marked for today."
          ? "Attendance Already Marked"
          : generalError === "Device Error" ? "Device Error" : generalError
      );
    }
  }
};

export const registerRole = async (register, role) => {
  console.log(register);
  try {
    const res = await fetch(`${API_BASE_URL}/register/${role}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Include additional headers if needed (e.g., authorization)
      },
      body: JSON.stringify(register),
    });

    if (res.ok) {
      toast.success(
        role === "admin"
          ? "Registration Done!"
          : "Registration Pending for Approval"
      );
      const responseData = await res.json();
      return responseData.token;
    } else {
      await handleErrors(res);
    }
  } catch (error) {
    console.error(error);
  }
};

export const loginRole = async (login, role) => {
  try {
    const res = await fetch(`${API_BASE_URL}/login/${role}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Include additional headers if needed (e.g., authorization)
      },
      body: JSON.stringify(login),
    });

    if (res.ok) {
      storeRole(role);
      toast.success("Login Success!");
      const responseData = await res.json();
      storeTokens({
        access: responseData.token.access,
        refresh: responseData.token.refresh,
      });
      return responseData.token;
    } else {
      await handleErrors(res);
    }
  } catch (error) {
    console.error(error);
  }
};

export const forgetPasswordRole = async (email, role) => {
  const toastId = toast.loading("Loading...");
  try {
    const res = await fetch(`${API_BASE_URL}/reset/password/${role}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Include additional headers if needed (e.g., authorization)
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      toast.dismiss(toastId);
      localStorage.setItem("forgetRole", role);
      toast.success("Link sent on Registered Email");
      const responseData = await res.json();
      role === "admin"
        ? localStorage.setItem(
            "forgetToken",
            responseData.reset_link.substring(
              37,
              responseData.reset_link.length
            )
          )
        : localStorage.setItem(
            "forgetToken",
            responseData.reset_link.substring(
              45,
              responseData.reset_link.length
            )
          );
      console.log(
        responseData.reset_link.substring(45, responseData.reset_link.length)
      );
      // return responseData.token;
    } else {
      await handleErrors(res);
    }
  } catch (error) {
    console.error(error);
  }
};

export const resetPasswordAdmin = async (newPasswords) => {
  const toastId = toast.loading("Loading...");
  try {
    const res = await fetch(
      `${API_BASE_URL}/reset-password/${localStorage.getItem("forgetToken")}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include additional headers if needed (e.g., authorization)
        },
        body: JSON.stringify(newPasswords),
      }
    );

    if (res.ok) {
      toast.dismiss(toastId);
      toast.success("Password Reset successful");
      const responseData = await res.json();
      localStorage.removeItem("forgetToken");
      localStorage.removeItem("forgetRole");
      console.log(responseData);
      return responseData;
    } else {
      await handleErrors(res);
    }
  } catch (error) {
    console.error(error);
  }
};

export const resetPasswordStudent = async (newPasswords) => {
  const toastId = toast.loading("Loading...");
  try {
    const res = await fetch(
      `${API_BASE_URL}/reset-password-student/${localStorage.getItem(
        "forgetToken"
      )}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include additional headers if needed (e.g., authorization)
        },
        body: JSON.stringify(newPasswords),
      }
    );

    if (res.ok) {
      toast.dismiss(toastId);
      toast.success("Password Reset successful");
      const responseData = await res.json();
      localStorage.removeItem("forgetToken");
      console.log(responseData);
      return responseData;
    } else {
      await handleErrors(res);
    }
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => {
  clearTokens();
  toast.success("Logged out!");
};

export const isAuthenticated = () => {
  return !!getAccessToken() && getRole() === "admin";
};

export const isAuthenticatedStudent = () => {
  return !!getAccessToken() && getRole() === "student";
};

export const refreshTokens = async () => {
  // Check if access token is still valid
  if (!isAccessTokenValid()) {
    try {
      const refreshToken = getRefreshToken();
      const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        const { access } = await response.json();
        storeTokens({ access, refresh: refreshToken });
        return access;
      } else {
        await handleErrors(response);
        return null;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      return null;
    }
  }

  return getAccessToken();
};

export const isAccessTokenValid = () => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(accessToken);
    // Check expiration time (exp) or any other criteria based on your server setup
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    console.error("Error decoding access token:", error);
    return false;
  }
};
