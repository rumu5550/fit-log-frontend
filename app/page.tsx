import { Suspense } from "react";
import Banner from "@/components/home/Banner";
import LibrarySection from "@/components/home/LibrarySection";
import { LibrarySkeleton } from "@/components/home/LibrarySkeleton";

export default function Home() {
  return (
    <div className="w-full">
      <Banner />
      <Suspense fallback={<LibrarySkeleton />}>
        <LibrarySection />
      </Suspense>
    </div>
  );
}
