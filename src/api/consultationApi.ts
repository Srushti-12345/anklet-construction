import { AdminRecordStatus } from "../admin/adminStorage";
import api from "./api";

export const submitConsultationRequest = (data: any) => {
    return api.post("/consultations", data);
};

export const getAllConsultations = () =>
  api.get("/admin/consultations");

export const updateConsultationStatus = (
  consultationId: string,
  status: AdminRecordStatus
) => {
  return api.patch(
    `/admin/consultations/${consultationId}/status`,
    { status }
  );
};

export const deleteConsultation = (consultationId: string) => {
  return api.delete(`/admin/consultations/${consultationId}`);
}