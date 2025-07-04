// import { signOutAction } from "@/app/actions";

// import Link from "next/link";
// import { Badge } from "./ui/badge";
// import { Button } from "./ui/button";
// import { createClient } from "@/utils/supabase/server";

// export default async function AuthButton() {
//   const supabase = await createClient();

//   // Check for required environment variables
//   const hasEnvVars =
//     !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!hasEnvVars) {
//     return (
//       <>
//         <div className="flex gap-4 items-center">
//           <div>
//             <Badge
//               variant={"default"}
//               className="font-normal pointer-events-none"
//             >
//               Please update .env.local file with anon key and url
//             </Badge>
//           </div>
//           <div className="flex gap-2">
//             <Button
//               asChild
//               size="sm"
//               variant={"outline"}
//               disabled
//               className="opacity-75 cursor-none pointer-events-none"
//             >
//               <Link href="/sign-in">Sign in</Link>
//             </Button>
//             <Button
//               asChild
//               size="sm"
//               variant={"default"}
//               disabled
//               className="opacity-75 cursor-none pointer-events-none"
//             >
//               <Link href="/sign-up">Sign up</Link>
//             </Button>
//           </div>
//         </div>
//       </>
//     );
//   }
//   return user ? (
//     <div className="flex items-center gap-4">
//       Hey, {user.email}!
//       <form action={signOutAction}>
//         <Button type="submit" variant={"outline"}>
//           Sign out
//         </Button>
//       </form>
//     </div>
//   ) : (
//     <div className="flex gap-2">
//       <Button asChild size="sm" variant={"outline"}>
//         <Link href="/sign-in">Sign in</Link>
//       </Button>
//       <Button asChild size="sm" variant={"default"}>
//         <Link href="/sign-up">Sign up</Link>
//       </Button>
//     </div>
//   );
// }
