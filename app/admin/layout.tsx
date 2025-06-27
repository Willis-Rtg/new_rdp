import { ProductContextProvider } from "./prouct-context";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProductContextProvider>{children}</ProductContextProvider>;
}
