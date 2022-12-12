// import { useState } from "react";
// import useSWR, { SWRConfig, useSWRConfig } from "swr";
// import { prop, map, reject, eq, propEq } from "lodash/fp";
// import Image from "next/image";
// import Layout from "../components/layout";
// import style from "./user.module.css";
// import { del, post, read } from "../hooks/request";

// const fetcher = async (url) => {
//   const res = await fetch(url);
//   return res.json();
// };

// export default function User({ fallback }) {
//   const [inputVal, setInputVal] = useState("");
//   const [cnt, setCnt] = useState(0);

//   console.log("cnt==> User", cnt);
//   const { data, error } = useSWR(
//     ["http://localhost:3000/api/users", cnt],
//     fetcher
//   );

//   return (
//     <Layout>
//       <article>
//         {!error && !data && <div>loading</div>}
//         {error && <div>Error fetching data</div>}
//         {map((item) => {
//           return (
//             <div className={style.item} key={prop("_id")(item)}>
//               {item.name}
//               <Image
//                 priority
//                 src="/icons/delete.svg"
//                 className={style.deleteIcon}
//                 height={30}
//                 width={30}
//                 alt=""
//                 onClick={async () => {
//                   const xx = await del("http://localhost:3000/api/users", {
//                     id: prop("_id")(item),
//                   }).then((res) => {
//                     console.log("del==>>res", res);
//                     setCnt((val) => val - 1);
//                   });
//                   console.log("del del del===>", xx);
//                 }}
//               />
//             </div>
//           );
//         })(data)}
//       </article>
//       <div className={style.flex}>
//         <input value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
//         <Image
//           priority
//           src="/icons/add.svg"
//           height={30}
//           width={30}
//           alt=""
//           onClick={() => {
//             post("http://localhost:3000/api/users", { inputVal }).then(
//               (res) => {
//                 console.log("res", res);
//                 setInputVal("");
//                 console.log("ssssss");
//                 setCnt((val) => val + 1);
//               }
//             );
//           }}
//         />
//       </div>
//     </Layout>
//   );
// }

// export async function getStaticProps() {
//   const res = await fetch("http://localhost:3000/api/users");
//   const users = await res.json();

//   return {
//     props: {
//       fallback: {
//         "/api/users": users,
//       },
//     },
//   };
// }

// function Users({ cnt, setCnt }) {
//   console.log("cnt", cnt);
//   const { data, error } = useSWR(
//     ["http://localhost:3000/api/users", cnt],
//     fetcher
//   );
//   if (error) {
//     return <div>Error fetching data</div>;
//   }

//   if (!error && !data) return <div>loading</div>;

//   return (
//     <article>
//       {map((item) => {
//         return (
//           <div className={style.item} key={prop("_id")(item)}>
//             {item.name}
//             <Image
//               priority
//               src="/icons/delete.svg"
//               className={style.deleteIcon}
//               height={30}
//               width={30}
//               alt=""
//               onClick={() => {
//                 del("http://localhost:3000/api/users", {
//                   id: prop("_id")(item),
//                 }).then((res) => {
//                   setCnt((val) => val - 1);
//                 });
//               }}
//             />
//           </div>
//         );
//       })(data)}
//     </article>
//   );
// }
