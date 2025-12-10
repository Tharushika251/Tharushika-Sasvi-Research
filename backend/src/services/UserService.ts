import { IUser } from '../models/User';

export interface IUserService {
  createUser(user: IUser): Promise<IUser>;
  login(credentials: { email: string; password: string }): Promise<{ user_id: string; token: string; role: String } | null>;
  getUserById(userId: string): Promise<IUser | null>;
  getUserByEmail(email: string): Promise<IUser | null>;
  getAllUsers(): Promise<IUser[]>;
  updateUser(userId: string, user: Partial<IUser>): Promise<IUser | null>;
  updateProfilePicture(userId: string, profilePictureUrl: string): Promise<IUser | null>;
  deleteUser(userId: string): Promise<boolean>;
  generateUserId(): Promise<string>;
}