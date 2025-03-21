export type Order = {
  id: string;
  createdAt: Date;
  amount: number;
  currency: "BRL";
  product: string;
  status: Status;
};

export type Status = "PENDDING" | "APPROVED" | "REJECTED";
