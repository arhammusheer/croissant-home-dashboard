import { Button, ButtonProps } from "@chakra-ui/react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export default function Logout(props: ButtonProps) {
  const { logout, isLoading } = useKindeAuth();

  return (
    <Button {...props} onClick={() => logout()} isLoading={isLoading}>
      Logout
    </Button>
  );
}
