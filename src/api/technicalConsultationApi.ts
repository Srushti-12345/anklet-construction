import api from "./api";

export const submitTechnicalConsultation = (data: any) => {
    return api.post("/technical-consultations", data);
};