// import { Request, Response, NextFunction } from "express";
// import { UploadedFile } from "express-fileupload";
// import path from "path";
// import fs from "fs";
// import UploadType from "../constants/enums/uploadType";

// const uploadTypes = Object.values(UploadType);

// const upload = {
//   single: (fieldName: string) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//       if (!req.files) {
//         throw new Error("No files were uploaded");
//       }
//       if (Object.keys(req.files).length !== 1) {
//         throw new Error("Only one file can be uploaded");
//       }
//       if (!uploadTypes.includes(req.body.uploadType)) {
//         throw new Error("Invalid upload type");
//       }

//       const file = req.files[fieldName] as UploadedFile;

//       //converse capital extension name to lowercase. (for all extensions.)
//       const extension = path.extname(file.name).toLowerCase();
//       const fileSize = file.size;
//       let acceptedExtensions: string[] = [];

//       // *Check file size
//       let maxFileSize;
//       switch (req.body.uploadType) {
//         case UploadType.COPYRIGHT_DOCUMENT:
//         case UploadType.COPYRIGHT_SUPPORTING_DOCUMENT:
//         case UploadType.OLD_COPYRIGHT_DOCUMENT:
//           acceptedExtensions = [
//             ".png",
//             ".jpeg",
//             ".jpg",
//             ".gif",
//             ".zip",
//             ".docx",
//             ".pdf",
//             ".doc",
//             ".mp4",
//             ".mkv",
//             ".mp3",
//             ".pptx",
//             ".xlsx",
//             ".xls",
//           ];
//           maxFileSize = 100 * 1024 * 1024;
//           break;
//         case UploadType.COMPLAINT_DOCUMENT:
//           acceptedExtensions = [
//             ".png",
//             ".jpeg",
//             ".jpg",
//             ".pdf",
//             ".docx",
//             ".doc",
//             ".xlsx",
//             ".xls",
//             ".pptx",
//           ];
//           maxFileSize = 10 * 1024 * 1024;
//           break;
//         case UploadType.COPYRIGHT_CLAIM_DOCUMENT:
//           acceptedExtensions = [
//             ".png",
//             ".jpeg",
//             ".jpg",
//             ".pdf",
//             ".docx",
//             ".doc",
//             ".xlsx",
//             ".xls",
//             ".pptx",
//           ];
//           maxFileSize = 10 * 1024 * 1024;
//           break;
//         case UploadType.PROFILE_IMAGE:
//           acceptedExtensions = [".png", ".jpeg", ".jpg"];
//           maxFileSize = 2 * 1024 * 1024;
//           break;
//         case UploadType.INDIVIDUAL_CITIZENSHIP:
//         case UploadType.INDIVIDUAL_PP:
//           acceptedExtensions = [".png", ".jpeg", ".jpg"];
//           maxFileSize = 5 * 1024 * 1024;
//           break;

//         case UploadType.AGENCY_REGISTRATION_DOCUMENT:
//         case UploadType.AGENCY_PAN_VAT:
//         case UploadType.AGENCY_STAMP:
//           acceptedExtensions = [".png", ".jpeg", ".jpg"];
//           maxFileSize = 5 * 1024 * 1024;
//           break;

//         case UploadType.REMARKS_DOCUMENT:
//           acceptedExtensions = [
//             ".png",
//             ".jpeg",
//             ".jpg",
//             ".pdf",
//             ".xls",
//             ".docx",
//             ".doc",
//             ".xlsx",
//             ".pptx",
//           ];
//           maxFileSize = 10 * 1024 * 1024;
//           break;
//         case UploadType.CERTIFICATE_AUTHORITY_SIGNATURE:
//           acceptedExtensions = [".png", ".jpeg", ".jpg"];
//           maxFileSize = 2 * 1024 * 1024;
//           break;
//         case UploadType.STAMP:
//           acceptedExtensions = [".png", ".jpeg", ".jpg"];
//           maxFileSize = 2 * 1024 * 1024;
//           break;
//         case UploadType.COMPANY_LOGO:
//           acceptedExtensions = [".png", ".jpeg", ".jpg"];
//           maxFileSize = 2 * 1024 * 1024;
//           break;
//         case UploadType.PAYMENT_VOUCHER:
//         case UploadType.COPYRIGHT_PROOF_DOCUMENT:
//           acceptedExtensions = [".png", ".jpeg", ".jpg", ".pdf"];
//           maxFileSize = 3 * 1024 * 1024;
//           break;
//         default:
//           acceptedExtensions = [".png", ".jpeg", ".jpg"];
//           maxFileSize = 2 * 1024 * 1024;
//       }

//       const isValidExtension = acceptedExtensions.includes(extension);

//       if (!isValidExtension)
//         throw new Error(
//           "Invalid file format. Supported formats are: " +
//             acceptedExtensions.join(", ")
//         );

//       if (fileSize >= maxFileSize)
//         throw new Error(
//           "File size is too large. Maximum file size is " +
//             maxFileSize / (1024 * 1024) +
//             " MB"
//         );

// //       // it causes issues when file name is too long.. in DB as well as in server. so it is reduced.

// //       // const name = `${Date.now()}-${
// //       //   file.name.length < 15
// //       //     ? file.name
// //       //     : file.name.substring(0, 15).replace(".", "").replace(" ", "")
// //       // }${extension}`;

//       const name = `${req.body.uploadType}-${Date.now()}${extension}`;

//       const tempFolderPath = path.join(
//         process.cwd(),
//         "public",
//         "uploads",
//         "temp"
//       );
//       !fs.existsSync(tempFolderPath) &&
//         fs.mkdirSync(tempFolderPath, { recursive: true });
//       const tempFilePath = path.join(tempFolderPath, name);
//       file.mv(tempFilePath, (err) => {
//         if (err) {
//           throw new Error(err.message);
//         }
//       });
//       file.name = name;
//       file.tempFilePath = tempFilePath;
//       next();
//     };
//   },
// };

// export default upload;
