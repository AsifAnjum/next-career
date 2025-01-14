import { createImageUpload } from "novel/plugins";
import { toast } from "sonner";
import { uploadFiles } from "./uploadFilesViaServer";

const onUpload = (file: File) => {
  const promise = uploadFiles(file);

  return new Promise((resolve) => {
    toast.promise(
      promise.then(async (res) => {
        // Successfully uploaded image
        if (res.data?.url) {
          const url = res.data.url;
          // preload the image
          const image = new Image();
          image.src = url;
          image.alt = res.data.name;
          image.onload = () => {
            resolve(image);
          };
        } else {
          throw new Error(`Error uploading image. Please try again.`);
        }
      }),
      {
        loading: "Uploading image...",
        success: "Image uploaded successfully.",
        error: (e) => e.message,
      }
    );
  });
};

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!file.type.includes("image/")) {
      toast.error("File type not supported.");
      return false;
    } else if (file.size / 1024 / 1024 > 1) {
      toast.error("File size too big (max 1MB).");
      return false;
    }
    return true;
  },
});
