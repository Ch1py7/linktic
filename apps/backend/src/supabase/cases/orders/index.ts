import { create } from './create'
import { delete_ } from './delete'
import { get } from './get'
import { update } from './update'

export namespace Orders {
  export const Create = create
  export const Delete = delete_
  export const Get = get
  export const Update = update
}