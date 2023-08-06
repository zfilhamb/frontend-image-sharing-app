import { getAllPhoto } from "@/modules/fetch/photos"
import { Box, Button, Center, CircularProgress, Container, Flex, HStack, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import PhotoCard from "../components/PhotoCard"
import Layout from "@/components/Layout"
import { getAllCategory } from "@/modules/fetch/categories"
import { useRouter } from "next/router"

export default function Home() {
  const [photos, setPhotos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const router = useRouter()
  const { category_id } = router.query;

  const fetchPhotos = async (category_id) => {
    const data = await getAllPhoto(category_id)
    setPhotos(data)
    setIsLoading(false)
  }
  
  const fetchCategories = async () => {
    const data = await getAllCategory()
    setCategories(data)
    setIsLoading(false)
  }
  useEffect(() => {
    setIsLoading(true)
    fetchCategories()
    fetchPhotos(category_id)
  }, [])

  if (isLoading) {
    return (
      <>
        <Flex height="full" width="full" align="center">
          <CircularProgress isIndeterminate color="green.300" />
        </Flex>
      </>
    );
  }

  function handleClick() {
    router.push({
      pathname: "/",
    });

    fetchPhotos(!category_id);
  }

  return (
    <>
      <Layout fetchPhotos={fetchPhotos}>
        <Flex align="center" justify="center" gap={5} mt={2}>
          {categories.map((category) => (
            <Text
              key={category.id}
              fontSize="xl"
              as='u'
              onClick={() => {
                router.push({
                  pathname: "/",
                  query: {
                    category_id: category.id,
                  },
                });
                fetchPhotos(category.id);
              }}
            >
              {category.name}
            </Text>
          ))}
        </Flex>
        <HStack ml={5} mt={3} spacing={8}>
          {photos.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </HStack>
        {router.asPath.includes(category_id) && (
          <Button m={4}
            onClick={handleClick}
          >
            View All Photos
          </Button>
        )}
      </Layout>
    </>
  )
}


