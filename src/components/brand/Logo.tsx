import { Image } from "@chakra-ui/react";

export default function Logo(props: React.ComponentProps<typeof Image>) {
  return <Image src="/croissant.svg" alt="Logo" h={8} {...props} />;
}
