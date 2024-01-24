import {
  getAccessToken,
  refreshTokens,
  isAccessTokenValid,
  handleErrors,
} from "./auth-service";
import toast from "react-hot-toast";

const API_URL = "http://127.0.0.1:8000/api";

// Admin GET/POST/PUT Requests
export const getAdminDashboardMetrics = async () => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    // If there is no access token, handle as needed (e.g., redirect to login)
    return Promise.reject("No access token available");
  }

  if (!isAccessTokenValid()) {
    // Attempt to refresh the access token
    const refreshedAccessToken = await refreshTokens();

    if (!refreshedAccessToken) {
      // If token refresh fails, handle as needed (e.g., redirect to login)
      return Promise.reject("Token refresh failed");
    }
  }

  try {
    const res = await fetch(`${API_URL}/dashboard/admin/metrics/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    if (res.ok) {
      const responseData = await res.json();
      return responseData;
    } else {
        await handleErrors(res);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getManageStudents = async (search) => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    // If there is no access token, handle as needed (e.g., redirect to login)
    return Promise.reject("No access token available");
  }

  if (!isAccessTokenValid()) {
    // Attempt to refresh the access token
    const refreshedAccessToken = await refreshTokens();

    if (!refreshedAccessToken) {
      // If token refresh fails, handle as needed (e.g., redirect to login)
      return Promise.reject("Token refresh failed");
    }
  }

  try {
    const res = await fetch(
      `${API_URL}/dashboard/admin/student-section/${
        search ? `?search=${search}` : ""
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );

    if (res.ok) {
      const responseData = await res.json();
      if (responseData.length > 0) {
        return responseData;
      } else {
        toast("No Data Found!", {
          icon: "👎",
        });
        return responseData;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const getManageAttendance = async (date) => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    // If there is no access token, handle as needed (e.g., redirect to login)
    return Promise.reject("No access token available");
  }

  if (!isAccessTokenValid()) {
    // Attempt to refresh the access token
    const refreshedAccessToken = await refreshTokens();

    if (!refreshedAccessToken) {
      // If token refresh fails, handle as needed (e.g., redirect to login)
      return Promise.reject("Token refresh failed");
    }
  }

  try {
    const res = await fetch(
      `${API_URL}/dashboard/admin/attendance-management/?date=${date}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );

    if (res.ok) {
      const responseData = await res.json();
      if (responseData.length > 0) {
        return responseData;
      } else {
        toast(`No Attendance Found (${date})`, {
          icon: "👎",
        });
        return responseData;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const getPendingApprovals = async () => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    // If there is no access token, handle as needed (e.g., redirect to login)
    return Promise.reject("No access token available");
  }

  if (!isAccessTokenValid()) {
    // Attempt to refresh the access token
    const refreshedAccessToken = await refreshTokens();

    if (!refreshedAccessToken) {
      // If token refresh fails, handle as needed (e.g., redirect to login)
      return Promise.reject("Token refresh failed");
    }
  }

  try {
    const res = await fetch(`${API_URL}/student/request-management-section/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    if (res.ok) {
      const responseData = await res.json();
      if (responseData.length > 0) {
        return responseData;
      } else {
        toast("No Pending requests", {
          icon: "👎",
        });
        return responseData;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const setPendingApprovals = async (email, type) => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    // If there is no access token, handle as needed (e.g., redirect to login)
    return Promise.reject("No access token available");
  }

  if (!isAccessTokenValid()) {
    // Attempt to refresh the access token
    const refreshedAccessToken = await refreshTokens();

    if (!refreshedAccessToken) {
      // If token refresh fails, handle as needed (e.g., redirect to login)
      return Promise.reject("Token refresh failed");
    }
  }

  try {
    const res = await fetch(`${API_URL}/student/pending-requests/`, {
      method: type,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      if (type === "POST") {
        toast.success(`${email} Approved`);
      }
      if (type === "DELETE") {
        toast(`${email} Deleted`, {
          icon: "🗑️",
        });
      }
      return res;
    } else {
      await handleErrors(res);
    }
  } catch (error) {
    console.error(error);
  }
};

// Student GET/POST/PUT Requests
export const getStudentDashboardMetrics = async () => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    // If there is no access token, handle as needed (e.g., redirect to login)
    return Promise.reject("No access token available");
  }

  if (!isAccessTokenValid()) {
    // Attempt to refresh the access token
    const refreshedAccessToken = await refreshTokens();

    if (!refreshedAccessToken) {
      // If token refresh fails, handle as needed (e.g., redirect to login)
      return Promise.reject("Token refresh failed");
    }
  }

  try {
    const res = await fetch(`${API_URL}/student/dashboard/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    if (res.ok) {
      const responseData = await res.json();
      return responseData;
    } else {
        await handleErrors(res);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getGenerateQR = async () => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    // If there is no access token, handle as needed (e.g., redirect to login)
    return Promise.reject("No access token available");
  }

  if (!isAccessTokenValid()) {
    // Attempt to refresh the access token
    const refreshedAccessToken = await refreshTokens();

    if (!refreshedAccessToken) {
      // If token refresh fails, handle as needed (e.g., redirect to login)
      return Promise.reject("Token refresh failed");
    }
  }

  try {
    const res = await fetch(`${API_URL}/student/generate-qr-code/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    if (res.ok) {
      const responseData = await res.json();
      console.log(responseData);
      return responseData;
    } else {
        await handleErrors(res);
    }
  } catch (error) {
    console.error(error);
  }
};

export const setScanQRAPI = async (data) => {
  const accessToken = getAccessToken();
  console.log(JSON.stringify(data));

  if (!accessToken) {
    // If there is no access token, handle as needed (e.g., redirect to login)
    return Promise.reject("No access token available");
  }

  if (!isAccessTokenValid()) {
    // Attempt to refresh the access token
    const refreshedAccessToken = await refreshTokens();

    if (!refreshedAccessToken) {
      // If token refresh fails, handle as needed (e.g., redirect to login)
      return Promise.reject("Token refresh failed");
    }
  }

  try {
    const res = await fetch(`${API_URL}/student/MarkAttendanceDynamicQRView/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const responseData = await res.json();
      toast.success("Attendance Marked Successfully");
      console.log("Response Data:", responseData);
      return responseData;
    } else {
      await handleErrors(res);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAttendanceStudent = async (date) => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    // If there is no access token, handle as needed (e.g., redirect to login)
    return Promise.reject("No access token available");
  }

  if (!isAccessTokenValid()) {
    // Attempt to refresh the access token
    const refreshedAccessToken = await refreshTokens();

    if (!refreshedAccessToken) {
      // If token refresh fails, handle as needed (e.g., redirect to login)
      return Promise.reject("Token refresh failed");
    }
  }

  try {
    const res = await fetch(
      `${API_URL}/student/get-attendence-by-date/?date=${date}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );

    if (res.ok) {
      const responseData = await res.json();
      return responseData;
    }
  } catch (error) {
    console.error(error);
  }
};
