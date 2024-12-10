import api from "../client";

export const CreateJob = async (data: any) => {
  const response = await api.post("/jobs", data);
  return response.data;
};
