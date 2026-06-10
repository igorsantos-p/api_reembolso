import multer from "multer"
import path from "node:path"
import crypto from "node:crypto"

const TMP_FOLDER = path.resolve(__dirname, "..","..", "tmp")
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads")

const MAX_SIZE = 3
const MAX_FILE_SIZE = 1024 * 1024 * MAX_SIZE
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/heic"]

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString("hex")
            const fileName = `${fileHash}-${file.originalname}`

            return callback(null, fileName)
        }
    })
}

export default {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MAX_SIZE,
    MAX_FILE_SIZE,    IMAGE_TYPES,
    MULTER
}