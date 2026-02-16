export interface AddressResponse {
  id: number
  street: string
  city: string
  country: string
  postalCode?: string
  userId: number
  userName?: string
}

export interface AddressCreate {
  street: string;
  city: string;
  country: string;
  postalCode?: string | null;
}

export interface AddressUpdate {
  street: string;
  city: string;
  country: string;
  postalCode?: string | null;
}

