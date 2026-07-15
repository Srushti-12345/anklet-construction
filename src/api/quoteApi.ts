import api from "./api";
import { AdminRecordStatus } from "../admin/adminStorage";

export const submitQuoteRequest = (data: any) => {
    return api.post("/quote-requests", data);
};

export const getAllQuotes = () =>
    api.get("/admin/quotes");


export const updateQuoteStatus = (
    quoteId: string,
    status: AdminRecordStatus
) => {
    return api.patch(
        `/admin/quotes/${quoteId}/status`,
        { status }
    );
};

export const deleteQuote = (quoteId: string) => {
  return api.delete(`/admin/quotes/${quoteId}`);
};