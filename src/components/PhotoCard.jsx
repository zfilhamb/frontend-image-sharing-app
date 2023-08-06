import {
  AspectRatio,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  HStack,
  Heading,
  Image,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";


export default function BlogCard(props) {
  const { photo } = props;

  return (
    <>
      <Card w="25%" >
        <Link href={`/photos/${photo.id}`}>
        <CardHeader>
          <AspectRatio ratio={16 / 9}>
            <Image fallback="https://placehold.co/800x450" src={photo.image} />
          </AspectRatio>
        </CardHeader>
        <CardBody>
          <Stack my="1" spacing="2">
            <Heading size="md">{photo.title}</Heading>
          </Stack>
        </CardBody>
        </Link>
      </Card>
    </>
  );
}
