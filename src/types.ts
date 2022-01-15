interface UserInput {
  id: string; // ID from partner system
  email: string;
  name: string;
}

interface BusinessInput {
  id: string; // ID from partner system
  name: string;
  timezone: string;
  userRole: "OWNER" | "ADMIN" | "MEMBER";
}

export interface Input {
  user: UserInput;
  business: BusinessInput;
}

type Signed<T> = T & {
  signature: string;
};

export interface Payload {
  partnerId: string;
  timestamp: number;
  user: Signed<UserInput>;
  business: Signed<BusinessInput>;
}
