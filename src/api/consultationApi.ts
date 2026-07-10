import api from "./api";

export const submitConsultationRequest = (data: any) => {
    return api.post("/consultations", data);
};

export const getAllConsultations = () =>
  api.get("/admin/consultations");