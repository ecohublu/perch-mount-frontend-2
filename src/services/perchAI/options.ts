import type { Behavior, Camera, Event, MountType } from '@/types/options'
import { perchAIApi } from '@/services/perchAI/api'
import type { Habitat, MountLayer } from '@/types/perchMount'

const ROOT_BEHAVIORS_PATH = '/api/perchai/behaviors/'
const ROOT_MOUNT_TYPES_PATH = '/api/perchai/mount_types/'
const ROOT_CAMERAS_PATH = '/api/perchai/cameras/'
const ROOT_HABITATS_PATH = '/api/perchai/habitats/'
const ROOT_MOUNT_LAYERS_PATH = '/api/perchai/mount_layers/'
const ROOT_EVENTS_PATH = '/api/perchai/events/'

export const getBehaviors = async (): Promise<Array<Behavior>> => {
  return await perchAIApi.get<Array<Behavior>>(ROOT_BEHAVIORS_PATH)
}
export const addBehavior = async (name: string) => {
  await perchAIApi.post<string>(ROOT_BEHAVIORS_PATH), { body: { name: name } }
}

export const getMountTypes = async (): Promise<Array<MountType>> => {
  return await perchAIApi.get<Array<MountType>>(ROOT_MOUNT_TYPES_PATH)
}

export const addMountType = async (name: string) => {
  await perchAIApi.post<string>(ROOT_MOUNT_TYPES_PATH), { body: { name: name } }
}

export const getCameras = async (): Promise<Array<Camera>> => {
  return await perchAIApi.get<Array<Camera>>(ROOT_CAMERAS_PATH)
}

export const addCamera = async (model_name: string) => {
  await perchAIApi.post<string>(ROOT_CAMERAS_PATH), { body: { model_name: model_name } }
}

export const getHabitats = async (): Promise<Array<Habitat>> => {
  return await perchAIApi.get<Array<Habitat>>(ROOT_HABITATS_PATH)
}
export const getMountLayers = async (): Promise<Array<MountLayer>> => {
  return await perchAIApi.get<Array<MountLayer>>(ROOT_MOUNT_LAYERS_PATH)
}

export const getEvents = async (): Promise<Array<Event>> => {
  return await perchAIApi.get<Array<Event>>(ROOT_EVENTS_PATH)
}

export const addEvent = async (name: string) => {
  return await perchAIApi.post(ROOT_EVENTS_PATH, { body: { name: name } })
}
