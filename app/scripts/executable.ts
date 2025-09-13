// // jwt‐example.ts
// import jwt from 'jsonwebtoken';




// // 1️⃣ Configuration (shared secret, options)
// const JWT_SECRET   = '1234';  
// const JWT_OPTIONS: jwt.SignOptions = { expiresIn: '1h' };       

// // 2️⃣ Phase 1: Issuing the token (e.g. in your login API handler)
// function issueToken(userId: string, role: string): string {
//   // The payload can carry any claims you need:
//   const payload = { sub: userId, role };
//   // jwt.sign *encodes* and *signs* the token:
//   return jwt.sign(payload, JWT_SECRET, JWT_OPTIONS);
// }

// // 3️⃣ Phase 2: Client stores and sends the token
// //   • As an HttpOnly cookie, or
// //   • As an Authorization header: "Bearer <token>"

// // 4️⃣ Phase 3: Parsing & verifying (e.g. in middleware or getServerSideProps)
// function parseToken(token: string) {
//   try {
//     // jwt.verify both *decodes* and *validates* signature & expiry
//     const decoded = jwt.verify(token, JWT_SECRET);
//     return { valid: true, payload: decoded };
//   } catch (err) {
//     return { valid: false, error: (err as Error).message };
//   }
// }

// // --- Demo --- //
// const token = issueToken('user-123', 'admin');
// console.log("issued jwt", token);

// const result = parseToken(token);
// if (result.valid) {
//   console.log('\nDecoded payload:\n', result.payload);
// } else {
//   console.log('\nToken invalid:', result.error);
// }



// function greet(name?: string) {
//   // If name is falsy, default to "Guest"
//   const displayName = name || "hayssen";
//   console.log(`Hello, ${displayName}!`);
// }

// greet("Alice"); // → "Hello, Alice!"
// greet();        // → "Hello, Guest!"



// function mayFail() {
//   throw new Error("Oops!");
// }

// function wrapper() {
//   try {
//     mayFail()

//   } catch (error) {
//     console.log("Caught in wrapper:", (error as Error).message);

//   }
// }

// wrapper(); // the error bubbles up to here


// export async function safeParse(userId: string) {
//   try {
//     const res = await fetch("api/user/{userId}")
//     if (!res.ok) throw new Error(`HTTP ${res.status}`)
//   } catch (error) {
//     console.log("failed to fetch user profile:", (error as Error).message);
//     return { id: userId, name: "Guest" };  //
//   }
// }


// const profile = await safeParse("3")
// console.log("Profile is", profile);



// async function handleRequest(tenant: "A"|"B", userId: string) {
//   return tenant === "A" 
//     ? await getProfileA(userId)  // Uses Company A's DB
//     : await getProfileB(userId); // Uses Company B's DB
// }



// async function handleRequest(tenant: "A"|"B", userId: string) {
//   if (tenant === "A") {
//     return await getProfileA(userId)  
//   } else return await getProfileB(userId)
// }


// // Creating a promise
// const fetchData = (): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       Math.random() > 0.5 
//         ? resolve("Data received!") 
//         : reject("Error: Timeout");
//     }, 100);
//   });
// };


// const getData = async () => {
//   try {
//     const data = await fetchData();
//     console.log(data);
//   } catch (err) {
//     console.error(err);
//   }
// };


// // 1) A plain object
// const colors = {
//   red:   "#f00",
//   green: "#0f0",
//   blue:  "#00f",
// };

// // 2) Get its type
// //    typeof colors === { red: string; green: string; blue: string; }

// // 3) Extract keys
// type ColorName =  keyof typeof colors; 
// // => "red" | "green" | "blue"

// // 4) Use it in a function
// function paint(c: ColorName) {
//   console.log("Painting with", colors[c]);
// }

// paint("red");   // ✅ OK
// paint("green"); // ✅ OK
// // paint("yellow"); 
// // ❌ Error: Argument of type '"yellow"' is not assignable 
// //    to parameter of type '"red" | "green" | "blue"'.


// const fruitColors = {
//   apple:  "red",
//   banana: "yellow",
//   grape:  "purple",
// } as const;

// // 1) keyof typeof fruitColors  →  "apple" | "banana" | "grape"
// type Fruit = keyof typeof fruitColors;

// // 2) typeof fruitColors[Fruit]  →  "red" | "yellow" | "purple"
// type Color = typeof fruitColors[Fruit];


// type fruitColor = ValueOf< typeof fruitColors>

// // type  = fruitColors[keyof fruitColors];

// type fruita = keyof typeof fruitColors

// type value = typeof fruitColors[fruita]
// type value2 = ValueOf<typeof fruitColors>


// type FruitColorB =
//   (typeof fruitColors)[keyof typeof fruitColors]; // "red" | "yellow" | "purple"



// // 1. Mock implementations of the three profile-fetching functions
// async function getProfileA(userId: string) {
//   return {
//     id: userId,
//     name: "Alice (Tenant A)",
//     role: "Admin"
//   };
// }

// async function getProfileB(userId: string) {
//   return {
//     id: userId,
//     name: "Bob (Tenant B)",
//     permissions: ["read", "write"]
//   };
// }

// async function getProfileC(userId: string) {
//   return {
//     id: userId,
//     fullName: "Charlie C.",
//     settings: { theme: "dark" }
//   };
// }

// // 2. The dispatch map
// const profileServices = {
//   A: getProfileA,
//   B: getProfileB,
//   C: getProfileC
// };

// // 3. The generic handler that “dispatches” based on tenant key
// async function handleRequest(
//   tenant: keyof typeof profileServices,
//   userId: string
// ) {
//   // Pick the right function and call it
//   const fn = profileServices[tenant];
//   return fn(userId);
// }

// // 4. Sample calls
// async function demo() {
//   const users = [
//     { tenant: "A", id: "user123" },
//     { tenant: "B", id: "x42" },
//     { tenant: "C", id: "42abc" },
//   ] as const;

//   for (const { tenant, id } of users) {
//     const profile = await handleRequest(tenant, id);
//     console.log(`Tenant ${tenant} →`, profile);
//   }
// }

// demo().catch(console.error);



// type ActionType = 'start' | 'stop';

// const dispatchTable: Record<ActionType, (arg: string) => void> = {
//   start: (input: string) => console.log(`hello ${input}`),
//   stop: () => console.log("Stopped now "),
// };

// function dispatch(action: ActionType) {
//   dispatchTable[action]("hassan"); // invokes the correct function
// }



// dispatch("start")



// type Action = 
//   | {type: "increment", payload: number}
//   | {type: "reset"}


// function reducer(state: number, action: Action): number {
//   switch (action.type) {
//     case "increment": 
//       return state + action.payload
//     case 'reset': 
//       return 0
//     default: 
//       return state
//   } 
// }

// let state = 0

// state = reducer(state, { type: 'increment', payload: 5 })
// console.log(state);



// type Command = 'save' | 'load' | 'exit';


// const commandHandlers: Record<Command, () => void>  = {
//   save: () => console.log("saving..."),
//   load: () => console.log("loading..."),
//   exit: () => console.log("exiting...")
// }

// function runCommand(cmd: Command) {
//   commandHandlers[cmd]()
// }

// runCommand("save")
// runCommand("load")

