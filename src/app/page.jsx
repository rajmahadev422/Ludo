import Header from "@/components/layout/Header";
import Board from "@/components/ludo/Board";
import Tokens from "@/components/ludo/Tokens";
import Link from "next/link";

export default function Home() {
  return (
   <>
   <Link href='/local'>Play Local</Link>
   <div>
    <Board size={600} />
    {/* <Tokens height={540} width={540} /> */}
   </div>
   </>
  );
}
