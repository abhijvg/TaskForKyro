
export interface RegisterUserRequest {
  email?: string;
  first_name?: string;
  last_name?: string;
  display_name?: string;
  phone?: PhoneNumbers[];
  primary_location?: string;
  status?: string;
  roles?: string[];
  organization?: string;
}

export interface FetchUserResponse extends RegisterUserRequest {
  id: string;
}

export interface PhoneNumbers {
  type?: PhoneNumberType;
  number?: string;
}

export enum PhoneNumberType {
  office = "office",
  home = "home",
}
