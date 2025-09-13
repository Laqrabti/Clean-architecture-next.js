// import { number } from "zod";

import { randomBytes } from "crypto";
import { send } from "process";

// interface AppConfig {
//   port: number,
//   dbUrl: string,
//   env: "prod" | "staging" | "dev"
// }

// type configError = 
//   | {type: "fileNotFound", path: string}
//   | {type: "invalidFormat", erros: string[]}
//   | {type: "validationFaild", field: string}


// type Result<T , E> = 
//   | { success: true; data: T }
//   | { success: false; error: E };
  

//   async function loadConfig(
//     configPath: string,
//     validator: (raw: unknown) => raw is AppConfig,
//   ): Promise<Result<AppConfig, configError >> {
//     try {
//       const rawData = await simulateFileRead(configPath)

//       if (!validator(rawData)) {
//         return {
//           success: false,
//           error: {
//             type: "invalidFormat",
//                erros: ['Missing port property']
//            }
//           }
//        }

//        if (rawData.port > 7000 ) {
//         return {
//           success: false,
//           error: {
//             type: "validationFaild", field: "port surpass the authorized range"
//           }
//         }
//        }

//        return {
//         success: true,
//         data: rawData
//        }
//       } catch (err) {
//          return {
//           success: false,
//           error: {type: "fileNotFound", path: configPath}
//         }
//       }
//     }

// const isConfig = (raw: unknown): raw is AppConfig  => (
//       typeof raw === "object" &&
//       raw != null &&
//       "port" in raw &&
//       "dbUrl" in raw && 
//       "env" in raw

// )


// const sample = {port: 43, dbUrl: "he", env: "something"}

// // console.log(isConfig(sample));


// const isConfig2 = (raw: unknown): raw is AppConfig => {
//   return (
//     typeof raw === "object" &&
//     raw !== null &&
//     typeof (raw as any).port === "number" &&
//     typeof (raw as any).dbUrl === "string" &&
//     ["prod", "staging", "dev"].includes((raw as any).env)
//   );
// };

// console.log(isConfig2(sample));

// const obj = {};
// const arr: number[] = [10,20,3,6,7];

// const numbers = [32,23,4]
// const numbers2 = [323,234,45]


// const totalNumbers = [...numbers, ...numbers2]
// console.log(totalNumbers);

// arr.splice(1,3, ...numbers)
// console.log(arr);



// console.log(arr.slice(2, 4));


// const a = [1, 2];
// const b = [3, 4];

// const total = [...a, ...b]
// // console.log(total);


// const h = [1, 2, 3, 4];

// const index = h.findIndex((value) => value > 3);
// console.log(index);


// const arr2 = [1, 2, 3,4,5,6,7,8];

// const squared = arr2.map(x => { return x * 2})
// console.log(squared);


// const filtering = arr2.filter(item => 
// item % 2 === 0
// )

// console.log(filtering);


// const useReduce = arr2.reduce((acc, x) => acc + x, 0)
// console.log(useReduce);




// const found = arr.find(x => x > 5);
// console.log(found);

// console.log(arr.includes(2));
// console.log(arr.includes(100));

// console.log(arr.indexOf(6)); // -1

// console.log(arr.sort());

// const arr = [1, 2,7,8, 3];

// arr.flat()
// console.log(arr);


// const sorted = [...arr].sort((a, b) => a - b);
// // console.log(sorted);
// // console.log(arr);


// arr.slice(); // also creates a shallow copy
// Array.from(arr);

// // console.log(arr);
// const arr4 = [1, 2, 3];
// console.log(arr.join("/"));
// console.log(arr4);





// File: app/scripts/app-script.mts

// (If your Node version is <20, you may need to `npm install node-fetch` 
//  and uncomment the next line:)
// import fetch from "node-fetch";

// File: app/scripts/app-script.mts

// 1) Helper: create a promise-based delay to mimic network latency
// const delay = (ms: number) =>
//   new Promise<void>(resolve => setTimeout(resolve, ms));

// // 2) Top‑level await to “call” our fake API
// console.log("⏳ Calling fake API...");
// const data = await (async () => {
//   // simulate a 1.5 s network request
//   await delay(1500);
//   return {
//     userId: 42,
//     id: 101,
//     title: "Learn top‑level await",
//     completed: false
//   };
// })();

// console.log("✅ Fake API responded:", data);

// // 3) Further processing (e.g. transform the data)
// const transformed = {
//   ...data,
//   displayTitle: data.title.toUpperCase()
// };

// console.log("🔄 Transformed data:", transformed);



// File: app/scripts/demo-await.mts

// mimic a network call with a delay
// const delay = (ms: number) =>
//   new Promise<void>((resolve) => setTimeout(resolve, ms));

// // here we “call” our fake API
// console.log("⏳ Starting fake request...");
// const result = await (async () => {
//   await delay(1000);
//   return { status: "ok", timestamp: new Date().toISOString() };
// })();
// console.log("✅ Result:", result);

// // you can even destructure directly:
// const { status, timestamp } = result;
// console.log(`Status = ${status}, at ${timestamp}`);


// const productPrices: Record<string, number> = {
//   laptop: 1500,
//   mouse: 29,
//   keyboard: 100,
//   monitor:  300,
// }


// type orderItems = {productID: string, quantity: number}

// const items: orderItems[] = [
//   { productID: 'laptop',   quantity: 2 },
//   { productID: 'mouse',    quantity: 3 },  
//   { productID: 'keyboard', quantity: 1 },
// ]

// const total = items.reduce((sum, i) => {
//   // 1) Look up just the unit price:
//   const unitPrice  = productPrices[i.productID] || 0;
//   // 2) Compute this line’s total:
//   const lineTotal  = unitPrice * i.quantity;
//   // 3) Compute the new running total:
//   const newSum     = sum + lineTotal;

//   // 4) Log a single clear message:
//   console.log(
//     `Added ${i.quantity} × ${i.productID} @ $${unitPrice} each; ` +
//     `line = $${lineTotal} → running total = $${newSum}`
//   );

//   return newSum;
// }, 0);

// console.log(`Grand total is $${total}`);


// class DomainError extends Error {
//   constructor(message: string) {
//     super(message)
//     this.name = "DomainError"
//   }
// }



// class Money {
//   constructor(public readonly cents: number) {
//     if (cents < 0) throw new Error('Amount cannot be negative');
//   }

//   add(other: Money): Money {
//     return new Money(this.cents + other.cents);
//   }
// }

// // Instantiate
// const walletA = new Money(1000);  // 1000 cents = $10.00

// // Log details
// console.log('walletA (raw):', walletA);
// console.log('walletA is instance of Money?', walletA instanceof Money);
// console.log('walletA type:', typeof walletA);
// console.log('walletA.cents:', walletA.cents);
// console.log('walletA methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(walletA)));



// class Car {
//   constructor(
//     public readonly brand: string 

//   )
//   {}
// }

// export class Car {
//   constructor(
//     public brand: string
//   ){}


//   describe() {
//     console.log(`the car is: ${this.brand}`);
//   }
// }

// const instance = new Car("toyota")
// // const something = instance.brand
// instance.describe()



// class Car {
//   constructor(
//     public readonly brand: string,
//     public startEngine?: () => void
//   ){
    
//     this.startEngine = () => {
//       console.log(`Starting ${this.brand}'s engine!`);
//     }
//   }
// }


// const car = new Car("bentely")
// console.log(car.brand);
// car.startEngine?.()


class DatabaseLogger {
  private connectionString: string

  constructor(
    // dbHost: string,
    dbUser: string,
    dbPassword: string,
    dbHost: string,

    public readonly loggerName: string

  ){
    
    this.connectionString = this.buildConnectionString(dbHost, dbUser, dbPassword);
  }
  
  private buildConnectionString(host, user, password): string {
    return `Server: ${host};User=${user};Password=${password}`
  }

  log(message: string) {
    console.log(`[${this.loggerName}] ${message}`);
  }
}

const logger = new DatabaseLogger(
  "db.example.com",  
  "admin",            
  "s3cr3t!",         
  "hssina"
)



interface ILoggerTransport {
  send(message: string): void
}

class Logger {
  constructor(
     private transport: ILoggerTransport
  ){}

  log(message: string) {
    this.transport.send(message) 
  }
}

class ConsoleTransport implements ILoggerTransport {
  send(message: string): void {
    console.log(`here is the ${message}`);
  }
}

// const instance = new Logger(new ConsoleTransport)
// instance.log("message containing hassan")




// class DefaultSettings {
//   theme: string
//   fontSize: number
//   // Empty parentheses
//   constructor() {
//     this.loadDefaults; // Get values internally
//   }
  
//   public loadDefaults() {
//     this.theme = "dark";
//     this.fontSize = 16;
//     console.log(`${this.theme} and ${this.fontSize}`);
    
//   }
// }
// const settings = new DefaultSettings(); // No parameters needed


// class Try {
//   constructor(
//     public readonly myNumber,
//     public readonly engineOn
//   ){
//     this.myNumber = myNumber + 5
//     this.engineOn = false;
//   }
// }

// const hello = new Try(33, true)
// console.log(hello.myNumber);

// console.log(hello.engineOn);

class User {
  constructor(public isAdmin) {
    // Logic to set properties conditionally
    this.isAdmin = Math.random() > 0.5; // Random admin flag
  }
}

// const user = new User(randomBytes)
// console.log(user.isAdmin);


// class Button {
//   constructor() {
//     this.handleClick = this.handleClick.bind(this);
//   }
//   handleClick() {
//     console.log(this);  // always the Button instance
//   }
// }
// const btn = new Button();
// const fn = btn.handleClick;
// fn();                  // “this” is still btn, because we .bind’ed it

// class Foo {


//   foo(): void {
//     console.log(this);
// }
// }



// const instance = new Foo
// instance.foo()



// class Foo {
//   argument: string
//   constructor(
//     public brand?: string
//   ){
//     this.argument = brand || "hassan"
    
//   }
//   foo(): void { console.log(`${this.argument}`); }
// }

// const firstInstance =new Foo()
// const secondInstance = new Foo("nazih")

// console.log(firstInstance.foo());
// console.log(secondInstance.foo());



// const printName = () => {
//   console.log("hassan");
  
// }

// printName()
// console.log(printName());




class TaskScheduler<T>{

  constructor(
    private tasks: Map<string, () => Promise<T>>,
    private concurrency: number,
    public options?: { concurrency?: number; defaultPayload?: T },
  ) {
    this.concurrency = options?.concurrency || 1

  }


}


// class Food {

//   constructor(
//     public name: string,
//     public greet?: () => void  
//   ) {
//     this.greet = greet ?? (
//       function greet() {console.log(`hassan and ${this.name}`);
//       }
//     )
//   }
//   }

// let myFunction = () => console.log("fuck");


// const instance = new Food("Alice", myFunction);
// instance.greet?.()


class Foo {
  constructor(public name: string) {
    this.name = name;
  }
  greet() {
    console.log(`Hello, I’m ${this.name}!`);
  }
}



// 1. Creates a new empty object
// const instance = {}; 

// // 2. Sets prototype linkage
// Object.setPrototypeOf(instance, Foo.prototype);

// const prototype = Object.getPrototypeOf(instance); 
// console.log(prototype);



// 3. Binds 'this' and runs constructor
// const toSee = Foo.call(instance, "Alice"); // this.name = "Alice" inside constructor
// console.log(toSee);


// 4. Returns the object
// return instance;




// class Demo {
//   // Prototype method (shared by all instances)
//   greet() {
//     console.log("Hello from greet");
//   }

//   // Arrow function property (per-instance)
//   logId = () => {
//     console.log("I am bound to this specific instance");
//   };
// }

// const a = new Demo();
// const b = new Demo();

// console.log(a.greet === b.greet); // true  (shared function on prototype)
// console.log(a.logId === b.logId); // false (different functions for each)


// class Demo {
//   logId = () => console.log(this);

//   normal() {
//     console.log(this);
//   }
// }

// const d = new Demo();
// const log = d.logId;
// const normal = d.normal;

// log();    // Always prints the instance (arrow captured `this`)
// normal(); // `undefined` or global (lost `this` when called standalone)


console.log("hassan");


// test-script.mjs
const fetchData = () => new Promise(resolve => 
  setTimeout(() => resolve("Data received!"), 1000)
);

// Top-level await assignment
const result = await fetchData();
console.log(result);

// Another example
const delayedMessage = await new Promise(resolve => 
  setTimeout(() => resolve("Hello after timeout!"), 500)
);
console.log(delayedMessage);