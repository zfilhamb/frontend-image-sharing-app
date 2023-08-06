import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Input,
  Box,
  Stack,
  Heading,
  InputGroup,
  InputRightElement,
  Center,
  Flex,
  Checkbox,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { editPhoto, getPhotoDetail } from "@/modules/fetch/photos";
import Swal from "sweetalert2";
import { getAllCategory } from "@/modules/fetch/categories";

export default function EditPhoto(props) {
  const { id, setOpenModal, fetchPhotos } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState("");
  const [photo, setPhoto] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [category_id, setCategory_Id] = useState("");

  const fetchPhoto = async () => {
    const data = await getPhotoDetail(id);
    setPhoto(data);
    setTitle(data.title);
    setCategory_Id(data.category_id);
  };

  const fetchCategory = async () => {
    const dataCategory = await getAllCategory();
    setCategories(dataCategory);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPhoto();
    fetchCategory();
    setIsLoading(true);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category_id", category_id);
    formData.append("image", image);

    const res = await editPhoto(id, formData);

    if (res) {
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Update Campaign Successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    fetchPhotos();
  }

  const handleCategoryChange = (event) => {
    const categoryId = +event.target.value;
    // Set the selected category_id directly as a string
    setCategory_Id(categoryId.toString());
  };

  const handleClose = (e) => {
    if (e.target.id === "modalBackground") setOpenModal(false);
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
      <Center
        id="modalBackground"
        h="100vh"
        w="100vw"
        position={"fixed"}
        inset={0}
        bg={"blackAlpha.800"}
        zIndex={10}
        backdropFilter="auto"
        backdropBlur="4px"
        onClick={handleClose}
      >
        <Box
          rounded={"xl"}
          boxShadow={"lg"}
          p={8}
          w={"md"}
          bg={"#fefefe"}
          data-aos="zoom-in-up"
        >
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                defaultValue={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Blog Category</FormLabel>
              <Stack spacing={[1, 5]} direction={["column", "row"]}>
                {categories.map((category, idx) => {
                  return (
                    <div key={idx}>
                      <Checkbox
                        onChange={handleCategoryChange}
                        value={category.id}
                        isChecked={category_id.includes(category.id)}
                      />
                      <FormLabel>{category.name}</FormLabel>
                    </div>
                  );
                })}
              </Stack>
            </FormControl>
            <FormControl>
              <FormLabel>Image</FormLabel>
              <Box display="flex" alignItems="center" boxShadow={"base"} p={2}>
                <Box>
                  <Input
                    name="avatar"
                    type="file"
                    accept="/avatar/*"
                    required
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </Box>
              </Box>
            </FormControl>
            <Stack spacing={4} direction={["column", "row"]}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
                w="full"
                onClick={handleSubmit}
              >
                Update
              </Button>
              <Button
                bg={"red.400"}
                color={"white"}
                _hover={{
                  bg: "red.500",
                }}
                w="full"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Center>
    </>
  );
}
