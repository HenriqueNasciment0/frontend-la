import api from "../client";

export const CreateJob = async (data: unknown) => {
  const response = await api.post("/jobs", data);
  return response.data;
};
