import UploadType from "../constants/enums/uploadType";

const filecheck = (fieldname: string, extension: string, fileSize: number) => {
  let acceptedExtensions: string[] = [];
  let maxFileSize;

  switch (fieldname) {
    case UploadType.COPYRIGHT_DOCUMENT:
    case UploadType.COPYRIGHT_SUPPORTING_DOCUMENT:
    case UploadType.OLD_COPYRIGHT_DOCUMENT:
      acceptedExtensions = [
        ".png",
        ".jpeg",
        ".jpg",
        ".gif",
        ".zip",
        ".docx",
        ".pdf",
        ".doc",
        ".mp4",
        ".mkv",
        ".mp3",
        ".pptx",
        ".xlsx",
        ".xls",
      ];
      maxFileSize = 100 * 1024 * 1024;
      break;
    case UploadType.COMPLAINT_DOCUMENT:
      acceptedExtensions = [
        ".png",
        ".jpeg",
        ".jpg",
        ".pdf",
        ".docx",
        ".doc",
        ".xlsx",
        ".xls",
        ".pptx",
      ];
      maxFileSize = 10 * 1024 * 1024;
      break;
    case UploadType.COPYRIGHT_CLAIM_DOCUMENT:
      acceptedExtensions = [
        ".png",
        ".jpeg",
        ".jpg",
        ".pdf",
        ".docx",
        ".doc",
        ".xlsx",
        ".xls",
        ".pptx",
      ];
      maxFileSize = 10 * 1024 * 1024;
      break;
    case UploadType.PROFILE_IMAGE:
      acceptedExtensions = [".png", ".jpeg", ".jpg"];
      maxFileSize = 2 * 1024 * 1024;
      break;
    case UploadType.INDIVIDUAL_CITIZENSHIP:
    case UploadType.INDIVIDUAL_PP:
      acceptedExtensions = [".png", ".jpeg", ".jpg"];
      maxFileSize = 5 * 1024 * 1024;
      break;

    case UploadType.AGENCY_REGISTRATION_DOCUMENT:
    case UploadType.AGENCY_PAN_VAT:
    case UploadType.AGENCY_STAMP:
      acceptedExtensions = [".png", ".jpeg", ".jpg"];
      maxFileSize = 5 * 1024 * 1024;
      break;

    case UploadType.REMARKS_DOCUMENT:
      acceptedExtensions = [
        ".png",
        ".jpeg",
        ".jpg",
        ".pdf",
        ".xls",
        ".docx",
        ".doc",
        ".xlsx",
        ".pptx",
      ];
      maxFileSize = 10 * 1024 * 1024;
      break;
    case UploadType.CERTIFICATE_AUTHORITY_SIGNATURE:
      acceptedExtensions = [".png", ".jpeg", ".jpg"];
      maxFileSize = 2 * 1024 * 1024;
      break;
    case UploadType.STAMP:
      acceptedExtensions = [".png", ".jpeg", ".jpg"];
      maxFileSize = 2 * 1024 * 1024;
      break;
    case UploadType.COMPANY_LOGO:
      acceptedExtensions = [".png", ".jpeg", ".jpg"];
      maxFileSize = 2 * 1024 * 1024;
      break;
    case UploadType.PAYMENT_VOUCHER:
    case UploadType.COPYRIGHT_PROOF_DOCUMENT:
      acceptedExtensions = [".png", ".jpeg", ".jpg", ".pdf"];
      maxFileSize = 3 * 1024 * 1024;
      break;
    default:
      acceptedExtensions = [".png", ".jpeg", ".jpg"];
      maxFileSize = 2 * 1024 * 1024;
  }
  const isValidExtension = acceptedExtensions.includes(extension);

  if (!isValidExtension)
    throw new Error(
      "Invalid file format. Supported formats are: " +
        acceptedExtensions.join(", ")
    );

  if (fileSize >= maxFileSize)
    throw new Error(
      "File size is too large. Maximum file size is " +
        maxFileSize / (1024 * 1024) +
        " MB"
    );
};
export default filecheck;
