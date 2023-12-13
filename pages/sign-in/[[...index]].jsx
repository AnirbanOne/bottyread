import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="w-full sm:max-w-md p-6 bg-white rounded-md shadow-md">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        afterSignInUrl="/"
      />
    </div>
  </div>
);

export default SignInPage;
