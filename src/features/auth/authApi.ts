import type { User } from "./schema";

interface MockAccount extends User {
  password: string;
}

// TEMPORARY MOCK ACCOUNT
const accounts: MockAccount[] = [
  {
    id: 1,
    name: "Ana Admin",
    email: "admin@stockdesk.test",
    password: "Admin#1234",
    role: "admin",
  },
  {
    id: 2,
    name: "Sam Staff",
    email: "staff@stockdesk.test",
    password: "Staff#1234",
    role: "staff",
  },
];

export async function login(email: string, password: string): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const account = accounts.find(
    (a) => a.email === email && a.password === password,
  );

  if (!account) {
    throw new Error("Invalid email or password");
  }

  return {
    id: account.id,
    name: account.name,
    email: account.email,
    role: account.role,
  };
}
