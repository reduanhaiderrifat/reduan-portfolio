import { useSession } from "next-auth/react";

export default Session = () => {
  const session = useSession();
  const email = session?.data?.user?.email;
  return email;
};
