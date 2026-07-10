import api from "./api";

export const submitTechnicalConsultation = (data: any) => {
    return api.post("/technical-consultations", data);
};

export const getAllTechnicalConsultations = () =>
  api.get("/admin/technical-consultations");