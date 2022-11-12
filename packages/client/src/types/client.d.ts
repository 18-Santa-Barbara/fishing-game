declare const __SERVER_PORT__: number;

export type User = {
  id?: number | null;
  login: string;
  firstName: string;
  secondName: string;
  displayName?: string;
  avatar?: string;
  phone: string;
  email: string;
};

export type UserToServer = {
  login: string;
  password: string;
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
};

export type OkResponse = {
  error: {
    data: string | Reason;
  };
};

type Reason = {
  reason: string
}