import Header from "@/components/layout/Header";
import Board from "@/components/ludo/Board";
import Tokens from "@/components/ludo/Tokens";
import Link from "next/link";

export default function Home() {
  return (
   <>
   <Link href='/local' className="mt-20 bg-green-400 text-center">Play Local</Link>
   </>
  );
}
