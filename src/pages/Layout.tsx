import { ReactNode } from "react";
import HeaderBar from "./header";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <HeaderBar />
      <main>{children}</main>
    </>
  );
}
