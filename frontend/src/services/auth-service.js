import { toast } from "react-hot-toast";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const handleErrors = async (res) => {
  if (!res.ok) {
    const errorData = await res.json();

    if (errorData.errors) {
      if (errorData.errors.non_field_errors) {
        toast.error(
          errorData.errors.non_field_errors[0] ===
            "Password and Confirm Password don't match"
            ? "Confirm Password didn't Match"
            : errorData.errors.non_field_errors[0] ===
              "You are not a Registered User"
            ? "Email not registered"
            : ""
        );
      }
      if (errorData.errors.email) {
        toast.error(
          errorData.errors.email[0] === "user with this Email already exists."
            ? "User Already Exists"
            : ""
        );
      }
    }
  }
};

export const registerRole = async (register, role) => {
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
      toast.success("Registration Done!");
      const responseData = await res.json();
      console.log(responseData.token);
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
      toast.success("Login Success!");
      const responseData = await res.json();
      console.log(responseData.token);
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
      toast.success("Link sent on Registered Email");
      const responseData = await res.json();
      localStorage.setItem(
        "forgetToken",
        responseData.reset_link.substring(37, responseData.reset_link.length)
      );
      console.log(
        responseData.reset_link.substring(37, responseData.reset_link.length)
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
      `${API_BASE_URL}/reset-password-admin/${localStorage.getItem(
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
