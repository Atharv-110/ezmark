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

export const registerLogin = async (login, role) => {
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
    //   return responseData.token;
    } else {
      await handleErrors(res);
    }
  } catch (error) {
    console.error(error);
  }
};
