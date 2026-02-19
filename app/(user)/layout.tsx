import AuthGuard from "@/components/auth/AuthGuard";
const layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default layout;
