// import { useRouter } from "next/router";

// export default function LangSwitcher() {
//     const {locale, locales, asPath, push} = useRouter()

//     return (
//         <select value={locale}
//         onChange={e => push(asPath, asPath, {locale: e.target.value})} 
//         >
//             {
//                 locales!.map(loc => (
//                     <option key={loc} value={loc}>
//                         {loc.toLocaleUpperCase()}
//                     </option>
//                 ))
//             }
//         </select>
//     )
// }


// "use client"

// import { useRouter } from "next/router"


// export default function Page() {
//     const router = useRouter();

//     return (
//         <button onClick={() => { router.push("/dashboard") }}></button>
//     )
// }