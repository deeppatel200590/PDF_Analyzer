import multer from "multer";

// Configure where and how files should be stored
const storage = multer.diskStorage({
    // Folder where uploaded files will be saved
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    // Name of the file after saving
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// Create the multer middleware
const upload = multer({
    storage: storage,

    // Allow only PDF files
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed!"), false);
        }
    },

    // Maximum file size (10 MB)
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

export default upload;