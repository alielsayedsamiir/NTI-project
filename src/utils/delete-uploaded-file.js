const fs = require("fs").promises;
const path = require("path");

const deleteUploadedFile = async (foldername, filename) => {
  if (!filename || filename === "default-user.webp") return;
  const filePath = path.join(__dirname, "../../uploads", foldername, filename);
  try {
    await fs.unlink(filePath);
  } catch (err) {
    console.error(`Error deleting file (${filePath}):`, err.message);
  }
};

module.exports = deleteUploadedFile;