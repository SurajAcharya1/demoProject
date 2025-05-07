export enum RoleType {
  USER = "USER",
  ADMIN = "ADMIN",
}

export namespace RoleType {

  export function list(): RoleType[] {
    return Object.values(RoleType).filter(value => typeof value === 'string') as RoleType[];
  }

  export function listWithKeys(): { key: string; value: RoleType }[] {
    return Object.entries(RoleType)
      .filter(([key, value]) => typeof value === 'string')
      .map(([key, value]) => ({
        key,
        value: value as RoleType
      }));
  }
}

