/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Cart = "cart",
	Inventory = "inventory",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type CartRecord = {
	amount?: number
	item?: RecordIdString
	user?: RecordIdString
}

export type InventoryRecord = {
	amount?: number
	description?: HTMLString
	image?: string
	name?: string
	price?: number
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type CartResponse<Texpand = unknown> = Required<CartRecord> & BaseSystemFields<Texpand>
export type InventoryResponse<Texpand = unknown> = Required<InventoryRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	cart: CartRecord
	inventory: InventoryRecord
	users: UsersRecord
}

export type CollectionResponses = {
	cart: CartResponse
	inventory: InventoryResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'cart'): RecordService<CartResponse>
	collection(idOrName: 'inventory'): RecordService<InventoryResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
