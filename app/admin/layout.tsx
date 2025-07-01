import AdminHeader from "@/components/AdminHeader";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Panel - Truly IAS",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="min-h-screen bg-background">
          <AdminHeader />
          <main className="max-w-7xl mx-auto py-6 px-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
