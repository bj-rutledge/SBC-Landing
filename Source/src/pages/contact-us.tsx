
import * as React from 'react';
import Layout from '../components/Layout';
import {
   Box,
   Heading,
   Text,
   FormControl,
   FormErrorMessage,
   FormLabel,
   Input,
   Textarea,
   Button,
} from '@chakra-ui/react';

type ContactFormData = {
   name: string;
   email: string;
   message: string;
};

const defaultFormData: ContactFormData = {
   name: '',
   email: '',
   message: '',
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactFormEndpoint =
   process.env.GATSBY_CONTACT_FORM_ENDPOINT || 'http://localhost:8080';

const ContactUsPage = () => {
   const [formData, setFormData] = React.useState<ContactFormData>(defaultFormData);
   const [isSubmitting, setIsSubmitting] = React.useState(false);
   const [submitError, setSubmitError] = React.useState('');
   const [submitSuccess, setSubmitSuccess] = React.useState('');

   const isNameInvalid = formData.name.trim().length === 0;
   const isEmailInvalid =
      formData.email.trim().length === 0 || !emailRegex.test(formData.email.trim());
   const isMessageInvalid = formData.message.trim().length === 0;

   const handleInputChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
   ) => {
      const { name, value } = event.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (event: React.FormEvent<HTMLDivElement>) => {
      event.preventDefault();
      setSubmitError('');
      setSubmitSuccess('');

      if (isNameInvalid || isEmailInvalid || isMessageInvalid) {
         setSubmitError('Please complete all required fields with a valid email.');
         return;
      }

      try {
         setIsSubmitting(true);

         const response = await fetch(contactFormEndpoint, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               name: formData.name.trim(),
               email: formData.email.trim(),
               message: formData.message.trim(),
            }),
         });

         if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(
               errorData?.error || 'Unable to send message right now. Please try again.',
            );
         }

         setSubmitSuccess('Thanks for reaching out. We will get back to you soon.');
         setFormData(defaultFormData);
      } catch (error) {
         const errorMessage =
            error instanceof Error
               ? error.message
               : 'Unable to send message right now. Please try again.';
         setSubmitError(errorMessage);
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <Layout>
         <Box p={5}>
            <Heading color='green.600' as="h1">Contact Us</Heading>
            <Text mt={4}>
               We'd love to hear from you! Please fill out the form below and we'll
               get in touch with you as soon as possible.
            </Text>
            <Box mt={8} as="form" onSubmit={handleSubmit}>
               <FormControl id="name" isRequired isInvalid={Boolean(submitError) && isNameInvalid}>
                  <FormLabel>Name</FormLabel>
                  <Input
                     name="name"
                     value={formData.name}
                     onChange={handleInputChange}
                     placeholder="Your Name"
                  />
                  <FormErrorMessage>Name is required.</FormErrorMessage>
               </FormControl>
               <FormControl id="email" isRequired mt={4} isInvalid={Boolean(submitError) && isEmailInvalid}>
                  <FormLabel>Email</FormLabel>
                  <Input
                     name="email"
                     type="email"
                     value={formData.email}
                     onChange={handleInputChange}
                     placeholder="your.email@example.com"
                  />
                  <FormErrorMessage>A valid email is required.</FormErrorMessage>
               </FormControl>
               <FormControl id="message" isRequired mt={4} isInvalid={Boolean(submitError) && isMessageInvalid}>
                  <FormLabel>Message</FormLabel>
                  <Textarea
                     name="message"
                     value={formData.message}
                     onChange={handleInputChange}
                     placeholder="Your Message"
                     minH="140px"
                  />
                  <FormErrorMessage>Message is required.</FormErrorMessage>
               </FormControl>
               {submitError ? (
                  <Text mt={4} color="red.600">
                     {submitError}
                  </Text>
               ) : null}
               {submitSuccess ? (
                  <Text mt={4} color="green.600">
                     {submitSuccess}
                  </Text>
               ) : null}
               <Button
                  mt={4}
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText="Sending"
                  bg='green.500'
                  color='white'
                  _hover={{ bg: 'green.600' }}
               >
                  Submit
               </Button>
            </Box>
         </Box>
      </Layout>
   );
};

export default ContactUsPage;