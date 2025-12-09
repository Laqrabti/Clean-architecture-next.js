const cart = [
  { name: 'Laptop', price: 999, quantity: 1 },
  { name: 'Mouse', price: 25, quantity: 2 },
  { name: 'Keyboard', price: 75, quantity: 1 }
];


const totalAmount = cart.reduce((sum, item) => {
  return sum + item.price* item.quantity
}, 0)

console.log(totalAmount);














































// "use client"
// import React from 'react';
// import { useState, useEffect, memo } from 'react';

// export function Counter() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     console.log(`Count updated to: ${count}`);
//     // Side effect here, e.g., update title or log
//   }, [count]); // Triggers on mount and count changes

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//     </div>
//   );
// }



// type props = {
//   userId: number
// }

// function UserProfile({ userId }: props) {
//   const [user, setUser] = useState(null);
  
//   useEffect(() => {
//     const controller = new AbortController();
    
//     console.log(`Starting fetch for user ${userId}`);
//     fetch(`/api/users/${userId}`, { signal: controller.signal })
//       .then(res => res.json())
//       .then(user => {
//         console.log(`Received user ${userId}:`, user.name);
//         setUser(user);
//       })
//       .catch(err => {
//         if (err.name !== 'AbortError') {
//           console.error('Fetch failed:', err);
//         }
//       });
    
//     return () => {
//       console.log(`Cleaning up fetch for user ${userId}`);
//       controller.abort(); // 🛑 Stops the request
//     };
//   }, [userId]);

//   return <div>{user?.name || 'Loading...'}</div>;
// }

// // Usage:
// <UserProfile userId={1} />
// // User quickly changes to:
// <UserProfile userId={2} />