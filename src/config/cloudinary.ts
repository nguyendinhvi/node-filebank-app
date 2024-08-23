import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "djbob7bxy",
  api_key: "889937242292554",
  api_secret: "x997Lq96G3HLSQHfEK83dx_wLyE",
});

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     public_id: (req, file) => {
//       console.log("file storage:", file);
//       console.log("req storage:", req);
//       return file.originalname.split(".")[0];
//     }, // Tên file
//     //   folder: 'uploads', // Thư mục lưu trữ file
//     //   format: async () => 'jpg', // Định dạng file
//   },
// });

export default cloudinary;
// export const upload = multer({ storage });
