// // const users = [
// //   { id: 1, name: "Alice", age: 25 },
// //   { id: 2, name: "Bob", age: 17 }
// // ];
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
var userData = [
    ['name', 'age', 'city'],
    ['Alice', 25, 'New York'],
    ['Bob', 30, 'London'],
    ['Charlie', 35, 'Tokyo']
];
var keys = userData[0];
var newArray = userData.reduce(function (acc, row, i) {
    if (i === 0)
        return acc; // Skip header
    acc.push(Object.fromEntries(keys.map(function (key, j) { return [key, row[j]]; })));
    return acc;
}, []);
// let students: string[] = ["hassan", "karim"]
// let age: number = 23; 
// let isActive: boolean = true;
// let user: {name: string; age: number} = {name: "hassan", age: 27}
// console.log(user.age);
// This means: "This object can have ANY string key, and ALL values must be strings"
var dynamicObject = {
    name: "Alice", // ✅ key: string, value: string
    email: "alice@test.com" // ✅ key: string, value: string
};
dynamicObject.phone = "123-4567"; // ✅ Allowed - any new string key
dynamicObject.address = "123 Main St"; // ✅ Allowed
dynamicObject.age = 25; // ❌ ERROR - value must be string, not number
console.log(dynamicObject.phone);
console.log(dynamicObject.age);
export {};
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
