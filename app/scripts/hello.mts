import { strict } from "assert";
import { parse } from "path";
import { useMemo, useState } from "react";
import {boolean, never, number, z} from "zod"

// // const users = [
// //   { id: 1, name: "Alice", age: 25 },
// //   { id: 2, name: "Bob", age: 17 }
// // ];

// import { use } from "react";
// import { number, string } from "zod";
// import { extend } from "zod/mini";
// import { VariableIcon } from "lucide-react";
// import { log } from "node:console";
// import path from "node:path";


// import { error } from "console";
// import { promises } from "dns";


// // const output = users.filter((user) => user.age > 18)
// //                 .map((user) => `the name is ${user.name} and the age is ${user.age}` )
// //                 .join('')
// // console.log(output);

// // const users = [
// //   { id: 1, name: "Alice", age: 25, isActive: true, role: "admin", skills: ["React", "Node"] },
// //   { id: 2, name: "Bob", age: 17, isActive: false, role: "user", skills: ["HTML"] },
// //   { id: 3, name: "Charlie", age: 30, isActive: true, role: "user", skills: ["React", "CSS", "JavaScript"] },
// //   { id: 4, name: "Diana", age: 16, isActive: true, role: "moderator", skills: ["Python", "SQL"] },
// //   { id: 5, name: "Eve", age: 22, isActive: false, role: "user", skills: ["Vue", "TypeScript"] }
// // ];

// // // Complex processing chain:
// // const result = users
// //   .filter(user => user.isActive && user.age >= 18)           // Active adults only
// //   .sort((a, b) => b.age - a.age)                             // Sort by age descending
// //   .map(user => ({
// //     profile: `${user.name} (${user.role})`,
// //     senior: user.age > 25 ? "Senior" : "Junior",
// //     skillsCount: user.skills.length,
// //     topSkill: user.skills[0]
// //   }))                                                        // Transform to new format
// //   .filter(profile => profile.skillsCount >= 2)               // Only multi-skilled
// //   .slice(0, 3);                                              // Top 3 results

// // console.log(result);


// // const names = ["Charlie", "Alice", "Bob", "hassan", "nazih"];
// // const afterSlicing = names.slice(1, 3)
// // console.log(afterSlicing);


// // Custom descending
// // names.sort((a, b) => b.localeCompare(a)); // ["Charlie", "Bob", "Alice"]

// // const cart = ['apple', 'banana'];
// // const cartCopy = [...cart]; // ['apple', 'banana']
// // cartCopy.push("avocado")
// // console.log(cartCopy);

// // const fruits = ['apple', 'banana'];
// // const veggies = ['carrot', 'spinach'];
// // const total = [...fruits, ...veggies]
// // console.log(total);


// // const users = ['Alice', 'Bob'];

// // const newUsers = ["hassan", ...users, "nazih"]
// // console.log(newUsers);


// // const user = { name: 'John', age: 30 };

// // const updatedUser = {...user, age: 31,  city: 'NYC' };
// // console.log(updatedUser);


// const defaults = { theme: 'dark', notifications: true };
// const userPrefs = { theme: 'light' };

// // const settings = {...userPrefs, ...defaults}
// // console.log(settings);


// // const numbers = [1, 5, 3, 9, 2];
// // const maxNumber = Math.max(...numbers)
// // console.log(maxNumber);


// // const cart = ['apple', 'banana'];
// // const cartCopy = [...cart];
// // cartCopy.push(...['orange', 'grape', 'mango']);
// // ['apple', 'banana', 'orange', 'grape', 'mango']

// // console.log(cartCopy);


// // const coordinates = [10, 20];
// // const point = { x: 0, y: 0, ...Object.fromEntries(coordinates.map((v, i) => [['x','y'][i], v])) };
// // // { x: 10, y: 20 }
// // console.log(point);


// // const colors = ['red', 'green', 'blue'];
// // const returnedObject = Object.keys(colors.map((v, i) =>  i, v))
// // console.log(returnedObject);


// // const target = {a: 1};
// // const source = {b: 2};
// // Object.assign(target, source); 
// // console.log(target);

// // const array = [3,4,2,9,32,5]
// // const result = array.sort((a,b) => a - b)
// // console.log(result);

// // const result2 = array.sort((b,a) => a - b)
// // console.log(result2);


// // const array = [3, 4, 2, 9, 32, 5];

// // const result = [...array].sort((a, b) => a - b);    
// // const result2 = [...array].sort((b, a) => a - b);   

// // console.log(result);   
// // console.log(result2);  

// interface Cart {
//     name: string;
//     price: number;
//     quantity: number
// }

// const cart: Cart[] = [
//   { name: 'Laptop', price: 999, quantity: 1 },
//   { name: 'Mouse', price: 25, quantity: 2 },
//   { name: 'Keyboard', price: 75, quantity: 1 }
// ];


// const calculateTotalPrice = () => {
//     let sum = 0;
//     console.log(`the length of the cart is: ${cart.length}`);
    
//     if (cart.length == 0) {
//         throw new Error("Cart is empty")
//     }
//     for (let i=0; i < cart.length; i++) {
//         sum += cart[i].price * cart[i].quantity
//     }
//     console.log(`The sum is ${sum}`);
//     return sum
// }

// calculateTotalPrice();


// export const APP_CONFIG = {
//   API_URL: 'https://api.example.com',
//   MAX_UPLOAD_SIZE: 1000000,
//   FEATURE_FLAGS: { darkMode: true }
// };

// // Multiple functions use the same config
// const fetchUsers = (users: string) => fetch(APP_CONFIG.API_URL + `/${users}`);

// // types/user.ts
// export interface User {
//   id: number;
//   name: string;
//   email: string;
//   avatar: string;
//   bio: string;
// }

// export interface UserPageProps {
//   user: User;
// }

// const API_BASE = process.env.API_BASE_URL

// const getAllUserIds = async (): Promise<Number[]> => {
//     const res = await fetch(`${API_BASE}/users`);
//     const users: User[] = await res.json()
//     return users.map(user => user.id);
// }

// const getUserData = async (id: number): Promise<User> => {
//     const res = await fetch(`${API_BASE}/users/${id}`);
//     const user: User = await res.json()
//     return user
// }


// const cart = [
//   { name: 'Laptop', price: 999, quantity: 1 },
//   { name: 'Mouse', price: 25, quantity: 2 },
//   { name: 'Keyboard', price: 75, quantity: 1 }
// ];


// const totalAmount = cart.reduce((sum, item) => {
//   return sum + item.price* item.quantity
// }, 0)

// console.log(totalAmount);

// let sum = 0;
// const totalAmount2 = cart.forEach((value, i) => {
//     sum += value.price * value.quantity
// })

// console.log(totalAmount2);
// console.log(sum);


// const filteredData = orders.map((order, i) => {
//     if (order.status === "completed")
//         return Object.fromEntries([[i, order]])
// })

// console.log(filteredData);

// const filteredArray = orders.filter((order) => {
//     return order.status == "completed"
// })

// console.log(filteredArray);

// const words = ["hi", "cat", "book", "sunrise", "go"];

// const shortStrings = words.filter((word) => {
//     return word.length < 3
// })

// console.log(shortStrings);


// const products = [
//   { name: "Phone", inStock: true },
//   { name: "Laptop", inStock: false },
//   { name: "Mouse", inStock: true }
// ];

// const inStock = products.filter((product) => {
//     return !product.inStock 
// })

// console.log(inStock);


// const orders = [
//   { id: 1, customer: "Ali", amount: 120, status: "completed" },
//   { id: 2, customer: "Sara", amount: 80,  status: "pending" },
//   { id: 3, customer: "Ali", amount: 200, status: "completed" },
//   { id: 4, customer: "Youssef", amount: 50, status: "canceled" },
//   { id: 5, customer: "Sara", amount: 150, status: "completed" },
// ];


// const aliSpend = orders.reduce((totalSpend, order) => {
//     totalSpend += order.customer === "Ali" ? order.amount : 0
//     return totalSpend
// }, 0)

// console.log(aliSpend);

// const newArrayData = orders.map((order) => {
//     return Object.fromEntries([["id", order.id], ["summary", `${order.customer} paid: ${order.amount}`]])
// })

// console.log(newArrayData);

// const customersName = orders.map((order) => {
//     return order.customer
// })

// console.log(customersName);





// const totalAmount = orders.reduce((sum, order) => {
//     return sum += order.status == "completed" ? order.amount : 0 
// }, 0)

// console.log(totalAmount);

// const statusCompleted = orders.filter((order) => {
//     return order.status != "completed" && order.status == "canceled"
// })

// console.log(statusCompleted);

// const numbers = [1, 2, 3,4,5,6,7,8,9];


// const evens = numbers.filter((n) => {
//   return n % 2 == 0;
// });

// console.log(evens);

// function Closure() {
//     let i = 0;
//     return function() {
//         return ++i
//     }
// }


// const closureInstance = Closure()
// console.log(closureInstance());
// console.log(closureInstance());


// interface Config {
//     allowed: boolean;
//     execute?: () => {};
//     retryAfter?: number
// }
// interface Data {
//     limit: number;
//     windowMs: number
// }

// function callPermission(data: Data) {
//      const {limit, windowMs} = data
//      let calls : number[] = [];
     
//      return function(ApiCallFunction: () => {}): Config {
//        const FirstCall = calls[0]
//        const currentTime = Date.now()
//        const validTimes = calls.filter(time => currentTime- time < windowMs)
//        calls = validTimes

//        let remainingTime = windowMs - (currentTime - FirstCall)

//        if (calls.length < limit) {
//             calls.push(currentTime)
//             return {allowed: true, execute: ApiCallFunction}
//        } else {
//              return {allowed: false, retryAfter: remainingTime}
//        }
//      }
// }


// const colors = ['red', 'green', 'blue'];

// const see = ['red', 'green', 'blue'][2]
// console.log(see);


// const fruits = ['apple', 'banana', 'orange'];

// const output = fruits.map((fruit, i) => console.log(fruit, i));

// console.log(output);


// const users = [
//   { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
//   { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
//   { id: 3, name: 'Charlie', age: 35, email: 'charlie@example.com' }
// ];


// const desiredOutput = users.map((user, _) => ({name: user.name, email: user.email}))

// console.log(desiredOutput);


// const products = [
//   { id: 1, name: 'Laptop', price: 1000, quantity: 2 },
//   { id: 2, name: 'Mouse', price: 25, quantity: 5 },
//   { id: 3, name: 'Keyboard', price: 75, quantity: 3 }
// ];

// const productTotalValue = products.map((product, i) => ({name: product.name, totalValue: product.price * product.quantity * 0.9}))
// console.log(productTotalValue);

// let students: string[] = ["hassan", "karim"]
// let age: number = 23; 
// let isActive: boolean = true;

// let user: {name: string; age: number} = {name: "hassan", age: 27}
// console.log(user.age);


// const keys = userData[0];
// const newArray = userData.map((row, i) => 
//     i === 0 ? null : Object.fromEntries(keys.map((key, j) => [key, row[j]]))
// ).filter(Boolean); // Remove the null first element

// console.log(newArray);

// const newUserData = userData.slice(1)

// const newArray = newUserData.map((sample, _) => 
//     Object.fromEntries([[keys[0], sample[0]], [keys[1], sample[1]], [keys[2], sample[2]]])
// )

// console.log(newArray);

// const keys = userData[0];
// const dataRows = userData.slice(1); // Gets all rows except first

// const newArray = dataRows.map(row => 
//     Object.fromEntries(keys.map((key, index) => [key, row[index]]))
// );


// console.log(newArray);


// const users = [
//   { name: 'Alice', active: true },
//   { name: 'Bob', active: false },
//   { name: 'Charlie', active: true }
// ];

// const activeUsers = users.filter(user => !user.active)
// console.log(activeUsers);


// const numbers = [1, 5, 10, 15, 20];

// const bigThanTen = numbers.filter(number => number >= 10)
// console.log(bigThanTen);


// const words = ['apple', 'banana', 'cat', 'elephant', 'dog', 'ant'];

// const newLongWrods = words.filter( word => word.length > 3)
// console.log(newLongWrods);


// const products = [
//   { name: 'Laptop', price: 1000, inStock: true },
//   { name: 'Mouse', price: 25, inStock: false },
//   { name: 'Keyboard', price: 75, inStock: true },
//   { name: 'Monitor', price: 300, inStock: false }
// ];


// const acceptableProducts = products.filter(product => product.inStock && product.price < 500)
// console.log(acceptableProducts);
// const userData = [
//   ['name', 'age', 'city'],
//   ['Alice', 25, 'New York'],
//   ['Bob', 30, 'London'], 
//   ['Charlie', 35, 'Tokyo']
// ];

// const keys = userData[0];
// const newArray = userData.reduce((acc, row, i) => {
//     if (i === 0) return acc; // Skip header
//     acc.push(Object.fromEntries(keys.map((key, j) => [key, row[j]])));
//     return acc;
// }, []);


// let dynamicObject: Record<string, string | number> = {
//   name: "hassan", 
//   age: 24
// }

// console.log(dynamicObject.age);

// type Status = "pending" | "approved" | "rejected";
// type ID = string | number;

// function updateStatus(id: ID, status: Status) {
//   console.log(`Updating ${id} to ${status}`);
// }

// updateStatus(123, "approved");
// updateStatus("user-456", "pending");

// type Person = {
//   name: string;
//   age: number;
// };

// type Employee = {
//   employeeId: string;
//   department: string;
// };

// const emp: Person & Employee = {
//   name: "hassan", 
//   employeeId: "2",
//   department: "It",
//   age: 34
// }

// console.log(emp.employeeId);


// type PartialUser = {
//   [k in keyof User]?: User[k]
// }

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   active: boolean
// };

// // Get ALL value types as union
// type UserValues = User[keyof User];

// type StringValue = {
//   [k in keyof User]: User[k] extends string ? k: never
// }[keyof User]


// type User1 = {
//   id: number;        // Not editable via UI
//   name: string;      // Editable text field
//   email: string;     // Editable text field  
//   age: number;       // Editable number field
//   createdAt: Date;   // Not editable
// };

// const user: User1 = {
//   id: 1,
//   name: "Alice",
//   email: "alice@test.com", 
//   age: 25,
//   createdAt: new Date()
// };

// type extendedUser1 = User1 & {
//    phone: string;           // ✅ New string field
//    website?: string;        // ✅ Optional string field  
//    socialMedia: {
//     twitter: string;       // ✅ Nested string field
//     github: string;
//  }
// }

// type EditableStringFields = {
//   [k in keyof extendedUser1]: extendedUser1[k] extends string? k : never
// }[keyof extendedUser1]


// function(field: EditableStringFields, value: string) {
  
// } 

// type Greeting = "Hello";
// type Name = "Alice" | "Bob";

// type Message = `${Greeting} ${Name}`;
// // = "Hello Alice" | "Hello Bob"


// const example: Message = "Hello Alice"; // Hover over 'Message'

// type Action = "get" | "post";
// type Resource = "user" | "product";

// type Endpoint = `${Action}/${Resource}`;
// // = "get/user" | "get/product" | "post/user" | "post/product"


type status = "sucess" | "error"
type Message = `request_${status}`;

const message1: Message = "request_error"
const message2: Message = "request_sucess"

type Event = "click" | "hover"
type handleEvent = `on${Capitalize<Event>}`

type Events = "click" | "change" | "input";
type HandlerNames = `handle${Capitalize<Events>}`;

type ButtonProps = {
  [K in HandlerNames]?: () => void;
};


type checkUnion = "Hello hassan" extends boolean | number ? "Yes" : "No"


type IsString<T> = T extends string ? "YES" : "NO";

type instance = IsString<"hello">
type instance2 = IsString<43>

// // Without OnlyString - mixed types
// type MixedData = "email" | "name" | 123 | true | null;

// // With OnlyString - ONLY strings remain
// type StringFields = OnlyString<MixedData>;
// // = "email" | "name"  (123, true, null are filtered out as 'never')


// type OnlyString<T> = T extends string ? T : never



// type AllStringValues<T> = {
//   [k in keyof T]: T[k] extends string ? T[k] : T[k] extends object ? AllStringValues<T[k]> : never
// }[keyof T]

// type test = AllStringValues<ApiResponse>


// type newObj = {id: number, name: string}

// type ProcessObjects<T> = {
//   [k in keyof T]: T[k] extends number ? T[k] : never
// }[keyof T]


// type result = ProcessObjects<newObj>

// type ApiResponse = {
//   user: {id: number, name:string, email: string};
//   product: {sku: string, price: number};
//   metadata: string | number | boolean; 
// }

// type AssociateKeysToStrings<T> = {
//   [k in keyof T]: T[k] extends string ? k 
//     : T extends object ? AssociateKeysToStrings<T[k]> : never 
// }[keyof T]

// type test3 = AssociateKeysToStrings<ApiResponse>

// type Example<T> = T extends any ? T : never;

// type Test = Example<string | number | boolean>;


// type ExampleNoDistribute<T> = T extends any ? T : never;


// type OnlyStrings<T> = T extends any 
//   ? T extends string ? T : never 
//   : never;

// type Test4 = OnlyStrings<string | number | boolean | "hello">;
// // = string | "hello" ✅

// type play = string extends any ? (string extends number ? number : never) : never
// // = string extends any → TRUE → string extends string → TRUE → returns string

// type play2 = number extends any ? (number extends string ? number : never) : never

// type play3 = boolean extends any ? (boolean extends string ? boolean : never) : never

// type OnlyStrings4<T> = T extends any 
//   ? T extends string ? T : never
//   : never; // ← This line never runs!


// // Equivalent to:
// type OnlyStrings5<T> = T extends string ? T : never;
// // But this WON'T distribute over unions! 

// type Result1 = OnlyStrings4<TestUnion>;
// // = never ❌ (treats "hello" | 42 | true | "world" as one unit)

// type Result2 = OnlyStrings5<TestUnion>; 
// // = "hello" | "world" ✅ (processes each member separately)

// type TestUnion = "hello" | 42 | true | "world";

// type OnlyStrings3<T> = T extends string ? T : never;

// type testResult = OnlyStrings3<TestUnion>


// type person = "children" | "parent"
// type job = "engineer" | "teacher"

// type PersonJob = `${person}- ${job}`

// type World = "world";
// type Greeting = `hello ${World}`;

// type VerticalAlignment = "top" | "middle" | "bottom";
// type HorizontalAlignment = "left" | "center" | "right";
// type Alignment = `${VerticalAlignment}-${HorizontalAlignment}`;


// type firstPart<T> = T extends `${infer start}-${string}` ? start : never

// type sample = firstPart<"hssina-world">

// type DeepStringKeys<T> = T extends object
//   ? {
//       [K in keyof T]: 
//         T[K] extends string 
//           ? K
//           : T[K] extends object 
//             ? `${K & string}.${DeepStringKeys<T[K]> & string}`
//             : never
//     }[keyof T]
//   : never;

// type User9 = {
//   profile: {
//     name: string;
//     age: number;  // ← number, not string
//   };
//   email: string;
// };

// type Result = DeepStringKeys<User9>;
// = "email" | "profile.name"
// NOT "profile.age" (because age is number)


// // type Version = "v1" | "v2" | "v3";
// // type Endpoint = "users" | "products" | "orders";

// // type ApiPath = `/api/${Version}/${Endpoint}`;


// type Version = "v1" | "v2";
// type Resource = "users" | "products" | "orders";
// type Action = "create" | "read" | "update" | "delete";

// // Only these exact paths are allowed
// type ApiPath = 
//   | `/api/${Version}/${Resource}`
//   | `/api/${Version}/${Resource}/${string}` // Dynamic ID
//   | `/api/${Version}/${Resource}/${string}/${Action}`;


// type ApiResponseMap = {
//   "/api/v1/users": {id: number, name: string, email: string};
//   "/api/v1/users/:id": { id: number; name: string; email: string };
//   "/api/v1/products": { sku: string; price: number; inStock: boolean }
// }


// type apiPath = keyof ApiResponseMap

// async function FetchData<T extends apiPath>(path: T): Promise<ApiResponseMap[apiPath]> {
//   const response = await fetch(`https://myIpAddress${path}`)
//   return response.json()
// }

// const UserSchema = z.object({
//   id: z.number(),
//   name: z.string().min(1),
//   email: z.string().email()
// })


// let validUser;

// try {
//   validUser = UserSchema.parse({
//     id: 1,
//     name: "Alice",  // ✅ Has characters
//     email: "alice@example.com"  // ✅ Valid email format
//   });
//   // console.log("✅ VALID USER:", validUser);
//   // Output: { id: 1, name: "Alice", email: "alice@example.com" }
// } catch (error) {
//   const typedError = error as any
//   console.error("❌ Validation failed:", typedError.errors);
// }

// console.log(validUser);

// const value: string = "hello";
// if (typeof value === 'string') {
//   const newString = value.toUpperCase()
//   console.log(newString);  
// }

// var temp = "temporary";

// if (2>1) {
//   temp = "hassan"
// }

// // console.log(temp);


// for (let i = 0; i < 3; i++) {
//   setTimeout(() => console.log("the result is:",i), 100);
// }

// function scopeExample() {
//   if (true) {
//     var functionVar = "I'm accessible everywhere in function";
//     let blockLet = "I'm only in this block";
//     const blockConst = "I'm only in this block too";
//   }
  
//   console.log(functionVar); // ✅ Works - "I'm accessible everywhere in function"
//   console.log(blockLet);    // ❌ Error - blockLet is not defined
//   console.log(blockConst);  // ❌ Error - blockConst is not defined
// }


// function example() {
//   // const i;
//   let j;
//   console.log(j);
  

//   // i = 0
//   j= 1
//   console.log(j);
  

//   // console.log(i);
//   // console.log(j);
  
  
  
// }

// example()


// console.log(letVar); // ❌ ReferenceError (breaks code!)
// let letVar = "value";


// function oldStyle() {
//   if (true) {
//     let count = 5;
//   }
//   console.log(count); // 5 - leaked outside block! 😕
// }



// function processOrders(orders: number[], customers: number[]) {
//   // Process orders
//   for (var i = 0; i < orders.length; i++) {
//     console.log("Processing order", i);
//   }
//   const end = i + customers.length
//   // Later, process customers (forgot we already used i)
//   for ( i < end; i++) {
//     console.log("Processing customer", i); // ❌ i starts from orders.length!
//   }
// }

// processOrders([1, 2, 3], [4, 5]);
// Output: "Processing customer 3", "Processing customer 4" 😕

// const id = 2000
// const generatedString = String(id)
// console.log(typeof generatedString == "string");

// type Result = OnlyStrings<"hello" | 42>; // = "hello"


// type OnlyStrings<T> = T extends string ? T : never;



// const ids: OnlyStrings = 3



// const ProcessFunction = (array: any[]): string[] =>  {
//   return array.filter(arr => typeof arr == "string")
// }

// const result = ProcessFunction(mixed)

// console.log(result);


// type OnlyStrings<T> = T extends string ? T : never;

// function getStrings<T>(arr: any[]): OnlyStrings<T>[] {
//   return arr.filter((item): item is OnlyStrings<T> => 
//     typeof item === 'string'
//   );
// }

// const mixed = [1, "hello", true, "world"]
// const strings = getStrings(mixed);

// const directions = ["up", "down", "left", "right"] as const;
// type Direction = typeof directions[number]; // "up" | "down" | "left" | "right"


// type OnlyStrings<T> = T extends string ? T : never;

// const mixed = [1, "hello", true, "world"] as const; 
// // Type: readonly [1, "hello", true, "world"]

// // SIMPLE VERSION - LOSES INFORMATION
// const simpleStrings = mixed.filter(x => typeof x === "string");
// // Type: string[] - ❌ We lost that it was specifically "hello" and "world"

// // OnlyStrings VERSION - PRESERVES INFORMATION  
// type StringsFromMixed = OnlyStrings<typeof mixed[number]>;
// // Type: "hello" | "world" - ✅ Preserves the exact string literals!

// function getExactStrings<T>(arr: readonly T[]): OnlyStrings<T>[] {
//   return arr.filter((x): x is OnlyStrings<T> => typeof x === "string");
// }

// const exactStrings = getExactStrings(mixed);
// // Type: ("hello" | "world")[] - ✅ Knows exactly which strings!

// type OnlyStrings<T> = T extends string ? T : never

// const Arrays = ["hello", "hassan", 34, true]

// const newArrayStrings = Arrays.filter(arr => typeof arr OnlyStrings<typeof arr>)


type Version = "v1" | "v2" | "v3"
type Endpoint = "Product" | "Users" | "Orders"

type ApiPath = `/api/${Version}/${Endpoint}`

const apiInstance: ApiPath = "/api/v2/Orders"

type Spacing = "m" | "p"; // margin | padding
type Direction = "t" | "b" | "l" | "r" | "x" | "y"; // top, bottom, left, right, horizontal, vertical
type Size = 0 | 1 | 2 | 3 | 4;

type UtilityClass = `${Spacing}${Direction}-${Size}`;
// = "mt-0" | "mt-1" | ... | "py-4" | etc.

type FileCategory = "components" | "utils" | "types"
type FileExtension = "ts"| "tsx" | "js" | "jsx"

type ImportPath = `@/${FileCategory}/${string}.${FileExtension}`

const pathInstance: ImportPath = "@/components/button.tsx"

const mixedFiles = [
  "@/components/button.tsx", 
  "@/utils/helpers.ts", 
  "some-other-file.js",  // ❌ This will be filtered out
  "@/types/index.d.ts"   // ❌ This doesn't match our extension pattern
]

// function getPaths(paths: string[]): ImportPath[] {
//   // Check if the length of paths == 0

//    const newPaths = paths.filter(path => path.startsWith("@/"))
//    for (let i= 0; i < newPaths.length; i++) {
//     const processPath = newPaths[i]
//     const afterSplit = processPath.split("/")
//     console.log(afterSplit);
//     if (afterSplit.length == 3) {
//         const furtherPathProcessing = processPath.split(".")
//         if (typeof afterSplit[1] as FileCategory && typeof furtherPathProcessing[1] as FileExtension) {   
//         } else {
//           // handle the opposite case in case the types did not match 
//         }
//     } else {
//       console.log("Invalid Path");
//       throw new Error("Invalid Path")
//     }
//    }
// }

// console.log(getPaths(mixedFiles));

// const CATEGORIES: [string, string, string] = ["components", "utils", "types"] as const;

// const CategorySet = new Set<string>(CATEGORIES as readonly string[])

// type FileCategory2 = (typeof CATEGORIES)[number];

// type FileCategory3 = "components" | "utils" | "types"

// const EXTENSIONS = ["ts", "tsx", "js", "jsx"] as const;
// type FileExtension2= (typeof EXTENSIONS)[number]

// // const s = new Set(["a", "b", "a", "c", "b"]);
// // console.log(s);

// const s = new Set(["x", "y", "z"])

// for (const value of s ) {
//   console.log(value);
// }

// s.add("p")
// s.delete("x")


// var num = 0

// const s1 = new Set([1,2,3,3])

// s1.forEach((element) => {
//   num += element
// })

// console.log(num);

// console.log(s1);

// const arr = ["a", "b", "a"];
// arr.push("c");

// console.log(arr);

// const set = new Set(["a", "b", "a"]);
// console.log(set);        // Set(2) { "a", "b" }
// console.log(set.has("b")); // true
// set.add("c");
// console.log(set);

// const myArray = [1,2,3,4,5,3]

// const s1 = new Set([...myArray])

// console.log(s1);

// const tuple: [string, number] = ["age", 20];
// console.log(tuple); // ["age", 20]    // runtime = normal array

// const arr = [1, "hassan", {id: 3}, [3,4]]

// console.log((arr[3] as number[])[1]);

// if (Array.isArray(arr[3])) {
//   console.log(arr[3][1]);
// }

// const arr = [1, "hassan", {id:3}, [3,4]];

// console.log(Array.isArray(arr[0])); // false
// console.log(Array.isArray(arr[3])); // true

// let myArraynow: number[] = []
// for (let i=0; i < 5; i++) {
//    myArraynow = [...myArraynow, i]
// }
// console.log(myArraynow);

// const myArray = Array.of(1,2,3);    
// console.log(myArray);

// const castToArray = <T>(value: T | T[]): T[] => {
//     if(Array.isArray(value)) {
//       return value
//     } else {
//       return [value]
//     }
// }

// console.log(castToArray([1,2,4]));
// console.log(castToArray(4));

// function castingToArray<T>(value: T | T[]): T[] {
//    if(Array.isArray(value)) {
//       return value
//     } else {
//       return [value]
//   }
// }

// console.log(castingToArray([2,3]));
// console.log(castingToArray("hello"));
// function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//   const originalMethod = descriptor.value;
//   descriptor.value = function (...args: any[]) {
//     console.log(`Calling ${propertyKey} with args:`, args);
//     return originalMethod.apply(this, args);
//   };
// }

// // Usage in a class
// class Calculator {
//   @log
//   add(a: number, b: number): number {
//     return a + b;
//   }
// }

// const calc = new Calculator();
// calc.add(2, 3);  // Should now work! ✅



// // HOF: Takes a function and returns a memoized version with caching
// function memoize<T extends any[], R>(fn: (...args: T) => R  ): (...args: T) => R {
//   const cache = new Map<string, R>();  // Cache store using JSON-stringified args as keys
//   return function (...args: T): R {
//     const key = JSON.stringify(args);  // Create a unique key from arguments
//     if (cache.has(key)) {
//       // If cached, return the stored result
//       return cache.get(key)!;
//     }
//     // Otherwise, compute the result
//     const result = fn(...args);
//     // Store it in cache
//     cache.set(key, result);
//     return result;
//   };
// }

// // Example: Original expensive function (e.g., API data processor)
// function computeHeavyTask(x: number, y: number): number {
//   // Simulate heavy computation
//   console.log('Computing...');
//   return x * y * Math.random();  // Random to show it's only called once per unique args
// }

// // Using the HOF
// const memoizedTask = memoize(computeHeavyTask);
// // First call: Logs 'Computing...' and computes
// memoizedTask(2, 3);
// // Second call with same args: Uses cache, no log
// memoizedTask(2, 3);
// // Different args: Computes again
// memoizedTask(4, 5);


// const timer = setTimeout(() => {
//     console.log("hassan"); 
// }, 4000)


// class Animal {
//   constructor(protected name: string, protected age = 2 ) {
//     this.name = name.trim()

//     console.log(`the correct name is: ${this.name}`);
    
//   }
//   speak(): string {
//     return `${this.name} makes a sound and its age is ${this.age}`
//   }
// }
// class Dog extends Animal {
//   constructor(username: string, age: number, private breed?: string) {
//     super(username, age)
//   }

//   doesItBreed(): boolean {
//     return this.breed ? true : false
//   }
// }

// const dogInstance = new Dog("bergi", 3, "yes")
// console.log(dogInstance.speak());
// console.log(dogInstance.doesItBreed());

// class Animal {
//     protected name: string;
//     protected age: number;
    
//     constructor(name: string) {
//         this.name = name;
//         this.age = 0;
//     }
    
//     speak(): string {
//         return `${this.name} makes a sound`;
//     }
    
//     eat(food: string): string {
//         return `${this.name} is eating ${food}`;
//     }
    
//     celebrateBirthday(): string {
//         this.age += 1;
//         return `${this.name} is now ${this.age} years old!`;
//     }
    
//     // Method that uses 'this' context - important for binding demonstration
//     introduce(): string {
//         return `I am ${this.name}, a ${this.constructor.name}`;
//     }
// }

// const instance = new Animal("dog")
// console.log(instance.introduce());


// // Derived class inheriting from Animal
// class Dog extends Animal {
//     private breed: string;
    
//     constructor(name: string, breed: string) {
//         // Call parent class constructor
//         super(name);
//         this.breed = breed;
//     }
    
//     // Override parent method
//     speak(): string {
//         return `${this.name} barks: Woof! Woof!`;
//     }
    
//     // New method specific to Dog
//     fetch(item: string): string {
//         return `${this.name} (${this.breed}) fetches the ${item}`;
//     }
    
//     // Override introduce method
//     introduce(): string {
//         return `${super.introduce()} of breed ${this.breed}`;
//     }
// }


// class Animals {
//     introduce() {
//         return `I'm a ${this.constructor.name}`;
//     }
// }

// class Dogi extends Animals {}
// class Cati extends Animals {}

// const dog = new Dogi();
// console.log(dog.introduce());
//  // "I'm a Dog" ✅

// const cat = new Cati();
// console.log(cat.introduce());
//  // "I'm a Cat" ✅


// // Types of products
// interface Animal {
//     speak(): string;
// }

// class Dog implements Animal {
//     speak() { return "Woof!"; }
// }

// class Cat implements Animal {
//     speak() { return "Meow!"; }
// }

// // Factory
// class AnimalFactory {
//     static createAnimal(type: 'dog' | 'cat'): Animal {
//         if (type === 'dog') return new Dog();
//         if (type === 'cat') return new Cat();
//         throw new Error("Unknown animal type");
//     }
// }

// // Usage
// const myPet = AnimalFactory.createAnimal('dog');
// console.log(myPet.speak()); // "Woof!" ✅
// // You don't know it's a Dog, just that it's an Animal


// const jsonString = '{"name":"John","age":30}';
// const parsedData = JSON.parse(jsonString)
// console.log(parsedData);

// const obj = JSON.parse('{"name":"John"}');

// export async function() {
//   const response = await fetch("url")

// }

// async function myFunction() {

// }

// export const newFunction = function() {
//   return "hello"
// }

// export const anotherFunction = () => {
//   return "hey"
// }

// export default anotherFunction()


// let x; // undefined - never had a value
// console.log(x); // undefined

// const myError = new Error('Failed!');
// console.log(myError instanceof Error); // true

// const notError = 'just a string';
// console.log(notError instanceof Error); // false


// try {
//   const user = "hasan";
//   user.getName(); // TypeError: Cannot read properties of null
// } catch (error) {
//   if (error instanceof TypeError) {
//     console.log('TypeError:', error.message);
//   }
// }


// try {
//   const response = { data: null };
//   const parsed = JSON.parse(response.data); // What happens here?
//   console.log(parsed.user.name);
// } catch (error) {
//   if(error instanceof TypeError)  {
//     console.log("Type error cannot parse a null value to a string:", error.message);
//   }
// }

// const names = `{"name": "hassan"}`
// const parsedName = JSON.parse(names)
// console.log(parsedName);

// const name2 = null
// const parsedName2 = JSON.parse(name2)

// const obj = {1: "one", 2: "two", 3: "three"}
// console.log(Object.keys(obj)[1]);



// const jsonString = '{"name": "hassan"}'; // String with quotes
// const parsed = JSON.parse(jsonString);    // ✅ Works
// console.log(parsed.name); // "hassan"


// try {
//   let obj = undefined;
//   // obj = {property: "hassan"}
//   console.log( obj.property);
  
// } catch (error) {
//   if (error instanceof TypeError) {
//     console.log("TypeError:", error.message);
    
//   }
// }

// const newError = new Error("Custom message");
// // newError.cause = error; // Attach original error
// // throw newError;
// const name = "hassan"

// console.log(newError instanceof Error);



// const myObj = {name: "hassan", friend: "nazih"}

// const newObj = {...myObj, third: "batata"}
// console.log(newObj);


// const fruit = { apple: 1, banana: 2 };  

// const field = "banana"
// const newValue = 4

// const newObj = {...fruit, field: newValue}
// const correctObj = {...fruit, [field]: newValue}

// console.log("without overriding:", newObj);
// console.log("overring the value:", correctObj);


// const numbers = [1,2,3,4,6]

// const total = numbers.reduce((acc, num) => ( acc + num), 0)
// console.log(total);

// const newArray = numbers.map((number, i) => (
//         number * 2 
// ))

// console.log(newArray);

// const findNumber = numbers.find(number =>  number < 4 && number > 2)
// console.log(findNumber);

const products = [{id: 1}, {id: 2}, {id: 3}]
const notFound = products.find(p => p.id === 99)
// Returns: undefined

console.log(notFound);
