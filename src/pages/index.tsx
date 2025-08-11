import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to jobs page since we only need the job list
    router.replace("/jobs");
  }, [router]);

  return null; // No content needed since we're redirecting
}
