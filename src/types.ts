export type UserRole = 'user' | 'manager' | 'admin';

export interface AppUser {
  userId: string;
  email: string;
  name: string;
  nid: string;
  phone?: string;
  licensePhoto?: string;
  vehicleNumber: string;
  vehicleClass?: string;
  manufactureYear?: string;
  village?: string;
  postCode?: string;
  upazila?: string;
  district?: string;
  role: UserRole;
  isApproved: boolean;
  nextFuelDate?: string; // ISO string
  createdAt: string; // ISO string
}

export interface FuelPrice {
  octane: number;
  petrol: number;
  diesel: number;
  updatedAt: string;
}

export interface Pump {
  pumpId: string;
  name: string;
  location: string;
  address?: string;
  mapUrl?: string;
  syncEst?: string;
  deliveryDate?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  vehicleNumber: string;
  managerId: string;
  pumpId: string;
  amountBdt: number;
  liters: number;
  fuelType: 'octane' | 'petrol' | 'diesel';
  timestamp: string;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}
