import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function BagPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/account/bag");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Your Shopping Bag</h1>
        
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Items in your bag
            </h3>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            {/* Bag items will be displayed here */}
            <p>Your bag items will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
}