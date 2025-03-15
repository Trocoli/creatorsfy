export type UserLoginParams = {
  username: string;
  password: string;
};

export type CreatorUser = {
  userId?: string;
  username?: string;
  store?: string;
  token: string;
};

export type UserInfo = CreatorUser & {
  token: string;
};
