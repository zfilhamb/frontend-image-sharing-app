import Layout from "@/components/Layout"
import { deletePhotoById, getPhotoDetail } from "@/modules/fetch/photos"
import { Center, Box, CircularProgress, Divider, Flex, HStack, Heading, Image, Stack, Text, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import Swal from "sweetalert2"
import { useRouter } from "next/router";
import EditPhoto from "@/components/EditPhoto"
import { getLoginUser } from "@/modules/fetch/users"

dayjs.extend(relativeTime);

export default function blogDetail({ id }) {
  const [photo, setPhoto] = useState({})
  const [currentUser, setCurrentUser] = useState("");
  const [isLoading, setIsLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false);
  const [updateDelete, setUpdateDelete] = useState(false);

  const router = useRouter();


  const fetchUser = async () => {
    if (window.localStorage.getItem("token")) {
      const data = await getLoginUser();
      setCurrentUser(data);
    }
  };

  useEffect(() => {
    if (currentUser.id === +photo.user_id) {
      setUpdateDelete(true);
    }
  }, [currentUser, photo]);

  const fetchPhoto = async () => {
    const data = await getPhotoDetail(id)
    setPhoto(data)
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true)
    fetchPhoto()
    fetchUser()
  }, [])

  function FormatDate({ createdDate }) {
    const date = new Date(createdDate);
    const formattedDate = date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return formattedDate;
  }

  const handleDeletePhoto = async () => {
    const result = await Swal.fire({
      title: "Are You Sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      confirmButtonColor: "#14b8a6",
      cancelButtonColor: "#d33",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    });
    if (result.isConfirmed) {
      await deletePhotoById(id);
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Delete Photo Successfully.",
        showConfirmButton: false,
        timer: 2000
      });
      await router.push("/");
    }
  };

  if (isLoading) {
    return (
      <>
        <Flex height="full" width="full" align="center">
          <CircularProgress isIndeterminate color="green.300" />
        </Flex>
      </>
    );
  }

  return (
    <>
      <Layout>
        <Flex justifyContent="center" mt={1}>
          <Box>
            <Image boxSize="3xl" fallback="https://placehold.co/800x450" src={photo.image} />
          </Box>
        </Flex>
        <Divider mt={2} orientation='horizontal' />
        <Center mt={4}>
          <VStack>
            <Text as='b' fontSize='3xl'>{photo.title}</Text>
            <FormatDate createdDate={photo.createdAt} />
          </VStack>
        </Center>
        <Center>

          {updateDelete && (
            <>
              <DeleteIcon
                boxSize={9}
                color={"gray.100"}
                backgroundColor="teal.500"
                p={2}
                borderRadius={"lg"}
                cursor={"pointer"}
                _hover={{
                  color: "teal.500",
                  backgroundColor: "gray.100"
                }}
                transitionDuration={"400ms"}
                border={"1px"}
                borderColor={"gray.400"}
                onClick={handleDeletePhoto}
              />
              <EditIcon
                boxSize={9}
                color={"teal.500"}
                backgroundColor="gray.100"
                p={2}
                borderRadius={"lg"}
                cursor={"pointer"}
                _hover={{
                  color: "gray.100",
                  backgroundColor: "teal.500"
                }}
                transitionDuration={"400ms"}
                onClick={() => setOpenModal(true)}
                border={"1px"}
                borderColor={"gray.400"}
              />
              {openModal && <EditPhoto id={id} setOpenModal={setOpenModal} fetchPhotos={fetchPhoto} />}
            </>
          )}
        </Center>
      </Layout>
    </>
  )
}


export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  return {
    props: {
      id
    }
  };
}