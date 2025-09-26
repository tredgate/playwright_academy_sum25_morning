// tests/learning/data-object-literals/
// data_in_object_literals.spec.ts

import { test } from "@playwright/test";

type UserData = {
  username: string;
  password: string;
  email: string;
  age: number;
  accountNumber: string;
};

// ? Alternativa k typu - interface z 90 % podobný type
interface UserAddress {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}

type Environment = "development" | "staging" | "production";

test("Basic object literal - test data", async () => {
  const userData = {
    username: "test_user",
    password: "test1234",
    email: "test_user@example.com",
    age: 30,
    accountNumber: "123456789",
  };

  console.log(`Username: ${userData.username}`);
  console.log(`Password: ${userData.password}`);
  console.log(`Email: ${userData.email}`);
  console.log(`Age: ${userData.age}`);
  console.log(`Account Number: ${userData.accountNumber}`);
  console.log("UserData: " + JSON.stringify(userData, null, 2));
  createUser(userData);
  setEnvironment("development");
  const address: UserAddress = {
    street: "123 Main St",
    city: "Anytown",
    zipCode: "12345",
    country: "USA",
  };
  console.log("UserAddress: " + JSON.stringify(address, null, 2));
});

function createUser(userData: UserData) {
  console.log(`Username: ${userData.username}`);
  console.log(`Password: ${userData.password}`);
  console.log(`Email: ${userData.email}`);
  console.log(`Age: ${userData.age}`);
  console.log(`Account Number: ${userData.accountNumber}`);
  console.log("UserData: " + JSON.stringify(userData, null, 2));
}

function setEnvironment(env: Environment) {
  console.log(`Environment set to: ${env}`);
}
