import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

export type StoredUser = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: Date;
};

class UserStore {
  #users = new Map<string, StoredUser>();

  async createUser(name: string, email: string, password: string) {
    const normalizedEmail = email.toLowerCase();
    if (this.#users.has(normalizedEmail)) {
      throw new Error("Email is already registered");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user: StoredUser = {
      id: randomUUID(),
      email: normalizedEmail,
      name,
      passwordHash,
      createdAt: new Date(),
    };

    this.#users.set(normalizedEmail, user);
    return this.stripPassword(user);
  }

  async verifyUser(email: string, password: string) {
    const user = this.#users.get(email.toLowerCase());
    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return null;
    }

    return this.stripPassword(user);
  }

  getUser(email: string) {
    const user = this.#users.get(email.toLowerCase());
    return user ? this.stripPassword(user) : null;
  }

  private stripPassword(user: StoredUser) {
    const { passwordHash, ...publicProfile } = user;
    return publicProfile;
  }
}

export const userStore = new UserStore();
