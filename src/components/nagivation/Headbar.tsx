import { Heading, Spacer, Stack, StackProps } from "@chakra-ui/react";

const Headbar = ({
  title,
  children,
  ...props
}: {
  title: string;
  children?: React.ReactNode;
} & StackProps) => {
  return (
    <Stack direction={"row"} {...props} as={"header"}>
      <Heading as={"h3"}>{title}</Heading>
      <Spacer />
      {children}
    </Stack>
  );
};

export default Headbar;
