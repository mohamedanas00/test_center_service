import jwt from "jsonwebtoken";
import crypto from "crypto";

// Define your secret key as a byte array
const SECRET_KEY_BYTES = Buffer.from([
  0x53, 0x65, 0x63, 0x72, 0x65, 0x74, 0x4b, 0x65, 0x79, 0x2e, 0x46, 0x6f, 0x72,
  0x4a, 0x61, 0x76, 0x61, 0x2e, 0x53, 0x65, 0x63, 0x72, 0x65, 0x74, 0x4b, 0x65,
  0x79, 0x2e, 0x53, 0x65, 0x63, 0x72, 0x65, 0x74, 0x4b, 0x65,
]);

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY_BYTES, {
      algorithms: [process.env.SECRET_KEY_ALGO],
    });
    return decoded;
  } catch (error) {
    console.error(error);
    return null;
  }
}
