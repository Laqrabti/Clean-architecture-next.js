

// "use client";

// import { useState, useEffect, FormEvent } from "react";

// export default function MyFormPage() {
//   const [initialData, setInitialData] = useState<string | null>(null);
//   const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

//   // 1) Fetch some data on mount only:
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await fetch("/api/get-some-data");
//         const json = await res.json();
//         setInitialData(json.value);
//       } catch (err) {
//         console.error("Failed to fetch initial data", err);
//       }
//     }
//     fetchData();
//   }, []); // ← empty deps → runs once on mount

//   // 2) Handler for form submit:
//   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setStatus("submitting");

//     const formData = new FormData(e.currentTarget);
//     const payload = {
//       name: formData.get("name"),
//       email: formData.get("email"),
//     };

//     try {
//       const res = await fetch("/api/submit-form", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       if (!res.ok) throw new Error("Network response was not ok");
//       setStatus("success");
//       console.log("Form submitted!");
//     } catch (err) {
//       console.error("Submit failed", err);
//       setStatus("error");
//     }
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl mb-4">My Form</h1>

//       {initialData === null ? (
//         <p>Loading initial data…</p>
//       ) : (
//         <p>Initial data: {initialData}</p>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1">Name</label>
//           <input name="name" required className="border px-2 py-1 w-full" />
//         </div>
//         <div>
//           <label className="block mb-1">Email</label>
//           <input name="email" type="email" required className="border px-2 py-1 w-full" />
//         </div>
//         <button
//           type="submit"
//           disabled={status === "submitting"}
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
//         >
//           {status === "submitting" ? "Submitting…" : "Submit"}
//         </button>
//       </form>

//       {status === "success" && <p className="mt-4 text-green-700">Submitted successfully!</p>}
//       {status === "error"   && <p className="mt-4 text-red-700">Submission failed.</p>}
//     </div>
//   );
// }
