import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <SignUp
    path="/sign-up"
    routing="path"
    signInUrl="/sign-in"
    afterSignUpUrl="/sign-in"
    className="min-h-screen flex items-center justify-center"
  />
);
export default SignUpPage;
