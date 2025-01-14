"use server";

import { utapi } from "@/utils/uploadthingViaServer";

export const uploadFiles = async (file: File) => {
  return await utapi.uploadFiles(file);
};
