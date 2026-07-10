import api from "./api";

export const submitQuoteRequest = (data: any) => {
    return api.post("/quote-requests", data);
};

export const getAllQuotes = () => 
  api.get("/admin/quotes");
