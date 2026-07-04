import axios from "axios";

// ================= API INSTANCE =================
const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// ================= PATIENT APIs =================
export const getPatients = () =>
  API.get("/patients");

// ================= LOG APIs =================
export const getLogs = () =>
  API.get("/logs");

export const createLog = (data) =>
  API.post("/logs", data);

// ================= FOLLOWUP APIs =================
export const getFollowUps = () =>
  API.get("/followups");

export const scheduleFollowUp = (data) =>
  API.post("/schedule-followup", data);

export const completeFollowUp = (id) =>
  API.post(`/complete-followup/${id}`);

export const deleteFollowUp = (id) =>
  API.delete(`/followups/${id}`);

// ================= AI APIs =================
export const generateResponse = () =>
  API.get("/generate-response");

// ================= ERROR HANDLER =================
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API ERROR:",
      error.response?.data || error.message
    );

    return Promise.reject(error);
  }
);

export default API;