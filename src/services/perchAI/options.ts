import type { Behavior, Camera, MountType } from '@/types/options'
import { perchAIApi } from '@/services/perchAI/api'

const ROOT_BEHAVIORS_PATH = '/api/perchai/behaviors/'
const ROOT_MOUNT_TYPES_PATH = '/api/perchai/mount_types/'
const ROOT_CAMERAS_PATH = '/api/perchai/cameras/'

export const getBehaviors = async (): Promise<Array<Behavior>> => {
  return await perchAIApi.get<Array<Behavior>>(ROOT_BEHAVIORS_PATH)
}

export const getMountTypes = async (): Promise<Array<MountType>> => {
  return await perchAIApi.get<Array<MountType>>(ROOT_MOUNT_TYPES_PATH)
}

export const getCameras = async (): Promise<Array<Camera>> => {
  return await perchAIApi.get<Array<Camera>>(ROOT_CAMERAS_PATH)
}
