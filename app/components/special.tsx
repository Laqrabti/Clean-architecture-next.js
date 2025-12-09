"use client"
import React, { useState, useMemo } from 'react';

function ExpensiveFilterComponent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  // Without useMemo: This expensive filter runs on EVERY render
  // const filteredItems = items.filter(item => {
  //   console.log('Filtering...'); // Logs every time!
  //   return item % 2 === 0; // Simulate expensive op
  // });

  // With useMemo: Only recomputes if 'items' changes
  const filteredItems = useMemo(() => {
    console.log('Filtering...'); // Logs only when dependencies change
    return items.filter(item => item % 2 === 0); // Simulate expensive op
  }, [items]); // Dependency array: recompute only if 'items' changes

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <p>Filtered Even Items: {filteredItems.join(', ')}</p>
      <button onClick={() => setItems([...items, items.length + 1])}>Add Item</button>
    </div>
  );
}

export default ExpensiveFilterComponent;