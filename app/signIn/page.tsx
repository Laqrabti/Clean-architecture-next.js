// pages/signin.tsx
import { getCsrfToken } from "next-auth/react";

export default async function PublicSignIn() {
  const csrfToken = await getCsrfToken();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="/company-logo.png"
          alt="Company Logo"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Auth0 Sign-in Button (Visible to all) */}
          <form method="post" action="/api/auth/signin/auth0">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken ?? ''} />
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign in with Auth0
            </button>
          </form>

          {/* Hidden Employee Access Note */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Employees: Access your special login{' '}
            <a href="/employee-login" className="font-medium text-blue-600 hover:text-blue-500">
              here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}