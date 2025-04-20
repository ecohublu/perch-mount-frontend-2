import { useEnv } from '@/composables/useEnv'

const env = useEnv()

// This is a devolepment function for environment without S3 service.
export const convertIDToS3Link = (id: string, isImage: boolean): string => {
  return new URL('@/assets/demo_media.jpg', import.meta.url).href
}
// export const convertIDToS3Link = (id: string, isImage: boolean): string => {
//   if (isImage) {
//     return `${env}${id}.jpg`
//   } else {
//     return `${env}${id}.mp4`
//   }
// }
