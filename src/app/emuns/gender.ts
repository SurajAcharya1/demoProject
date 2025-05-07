export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER"
}

export namespace Gender {

  export function list(): Gender[] {
    return Object.values(Gender).filter(value => typeof value === 'string') as Gender[];
  }

  export function listWithKeys(): { key: string; value: Gender }[] {
    return Object.entries(Gender)
      .filter(([key, value]) => typeof value === 'string')
      .map(([key, value]) => ({
      key,
      value: value as Gender
    }));
  }
}

