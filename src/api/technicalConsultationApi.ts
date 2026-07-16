import { AdminRecordStatus } from "../admin/adminStorage";
import api from "./api";

export const submitTechnicalConsultation = (data: any) => {
    return api.post("/technical-consultations", data);
};

export const getAllTechnicalConsultations = () =>
    api.get("/admin/technical-consultations");

export const updateCallbackStatus = (
    technicalConsultationId: string,
    status: AdminRecordStatus
) => {
    return api.patch(
        `/admin/technical-consultations/${technicalConsultationId}/status`,
        { status }
    );
};

export const deleteCallback = (technicalConsultationId: string) => {
  return api.delete(`/admin/technical-consultations/${technicalConsultationId}`);
}