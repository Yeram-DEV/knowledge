import { Client } from 'minio'

export const minioClient = new Client({
  endPoint: process.env.NEXT_PUBLIC_API_MINIO_ENDPOINT!,
  port: parseInt(process.env.NEXT_PUBLIC_API_MINIO_PORT!, 10),
  useSSL: false,
  accessKey: process.env.NEXT_PUBLIC_API_MINIO_ACCESS_KEY!,
  secretKey: process.env.NEXT_PUBLIC_API_MINIO_SECRET_KEY!
})
