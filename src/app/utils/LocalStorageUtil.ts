import {Gender} from "../emuns/gender";
import {RoleType} from "../emuns/role-type";

export class LocalStorageUtil {
  protected static readonly LOCALSTORAGE_NAME = 'dls';

  public static setStorage(storage: LocalStorage) {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem(LocalStorageUtil.LOCALSTORAGE_NAME, JSON.stringify(storage));
    }
  }

  public static getStorage(): LocalStorage {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const storage = localStorage.getItem(LocalStorageUtil.LOCALSTORAGE_NAME);
      return storage === null ? new LocalStorage() : JSON.parse(storage);
    }
    return new LocalStorage(); // fallback for SSR/test
  }

  public static clearStorage() {
    this.setStorage(new LocalStorage());
  }
}

export class LocalStorage {
  at!: string;
  rt!: string;
  name!: string;
  username!: string;
  email!: string;
  roleType!: RoleType;
  gender!: Gender;
}
