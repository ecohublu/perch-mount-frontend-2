import { useEnv } from '@/composables/useEnv'

const env = useEnv()

export const convertIDToS3Link = (id: string, isImage: boolean): string => {
  if (isImage) {
    return `${env}${id}.jpg`
  } else {
    return `${env}${id}.mp4`
  }
}
