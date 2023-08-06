import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    VStack,
    useToast,
    Stack,
    Checkbox,
    CircularProgress
  } from "@chakra-ui/react";
  import Layout from "@/components/Layout";
  import { createNewPhoto } from "@/modules/fetch/photos";
  import React, { useState, useEffect } from "react";
  import { getAllCategory } from "@/modules/fetch/categories";
  import { useRouter } from "next/router";
  
  
  function NewPhoto() {
    // using toast from chakra
    const toast = useToast();
    const router = useRouter();
    const [categories, setCategories] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [category_id, setCategory_id] = useState([]);
  
  
    useEffect(() => {
      Promise.all([getAllCategory()]).then((values) => {
        setCategories(...values);
        setLoading(false);
      });
    }, []);
    console.log(categories);
  
  
    // loading page
    if (isLoading) {
      return (
        <>
          <CircularProgress isIndeterminate color="green.300" />
        </>
      );
    }
    // submit function when user click the button
    async function handleSubmit(event) {
      event.preventDefault();
      // get new form data
      let formData = new FormData(event.target);
      formData.append("category_id", category_id);
      const res = await createNewPhoto(formData);
  
      toast({
        title: "Campaign created",
        description: "Campaign Successfull created",
        status: "success",
        duration: 3000,
        isClosable: true
      });
      router.push("/");
    }
    const handleCategoryChange = (event) => {
      if (event.target.checked === true) {
        setCategory_id(+event.target.value);
      } else {
        setCategory_id(null);
      }
    };
    return (
      <>
        <Layout >
          <form onSubmit={handleSubmit}>
            <VStack m="5" spacing="4">
              <FormControl>
                <FormLabel>Photo Name</FormLabel>
                <Input name="title" required />
              </FormControl>
              <FormControl>
                <FormLabel>Photo Category</FormLabel>
                <Stack spacing={[1, 5]} direction={["column", "row"]}>
                  {categories.map((category, idx) => {
                    return (
                      <div key={idx}>
                        <Checkbox
                          onChange={handleCategoryChange}
                          value={category.id}
                          isChecked={category.id === category_id}
                        />
                        <FormLabel>{category.name}</FormLabel>
                      </div>
                    );
                  })}
                </Stack>
              </FormControl>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <Input name="image" type="file" accept="/image/*" required />
              </FormControl>
              <Button type="submit">Create Photo</Button>
            </VStack>
          </form>
        </Layout>
      </>
    );
  }
  
  export default NewPhoto;