import { useState } from "react";
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { Button } from "@chakra-ui/react";
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import { useSession } from "next-auth/react";
import { collection, addDoc, getDocs, query, where} from "firebase/firestore";

import { baseUrl, fetchApi } from '../../utils/fetchApi';
import ImageScrollbar from '../../components/ImageScrollbar';
import { db } from "../../utils/fireStore";
import Loader from "../../components/loader";

const PropertyDetails = ({ propertyDetails: { id, price, rentFrequency, rooms, title, baths, area, agency, isVerified, description, type, purpose, furnishingStatus, amenities, photos } }) => {
  const [hasSignifiedPurchase, setHasSignifiedPurchase] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data } = useSession();

  const purchaseProperty = async () => {
    setLoading(true);
    const propertySnapShot = await getDocs(query(collection(db, "userPurchases"), where('propertyId', "==", id), where('userId', "==", data?.user?.id)));

    if(propertySnapShot.docs.length > 0){
      alert("You have already signified interest in this property.");
      setHasSignifiedPurchase(true);
      setLoading(false);
      return;
    }

    await addDoc(collection(db, "userPurchases"), {propertyId: id, userId: data?.user?.id });

    setHasSignifiedPurchase(true);

    alert('You have signified interest in this property and will be contacted once the agent approves your request.');
    setLoading(false);
  }

  return ( 
  <Box maxWidth='1000px' margin='auto' p='4'>
    {loading && <Loader />}
  {photos && <ImageScrollbar data={photos} />}
  <Box w='full' p='6'>
    <Flex paddingTop='2' alignItems='center'>
      <Box paddingRight='3' color='green.400'>{isVerified && <GoVerified />}</Box>
      <Text fontWeight='bold' fontSize='lg'>
        AED {price} {rentFrequency && `/${rentFrequency}`}
      </Text>
      <Spacer />
      <Avatar size='sm' src={agency?.logo?.url}></Avatar>
    </Flex>
    <Flex alignItems='center' p='1' justifyContent='space-between' w='250px' color='blue.400'>
      {rooms}<FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
    </Flex>
  </Box>
  <Box marginTop='2'>
    <Text fontSize='lg' marginBottom='2' fontWeight='bold'>{title}</Text>
    <Text lineHeight='2' color='gray.600'>{description}</Text>
  </Box>
  <Flex flexWrap='wrap' textTransform='uppercase' justifyContent='space-between'>
    <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
      <Text>Type</Text>
      <Text fontWeight='bold'>{type}</Text>
    </Flex>
    <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
      <Text>Purpose</Text>
      <Text fontWeight='bold'>{purpose}</Text>
    </Flex>
    {furnishingStatus && (
      <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3' >
        <Text>Furnishing Status</Text>
        <Text fontWeight='bold'>{furnishingStatus}</Text>
      </Flex>
    )}
  </Flex>
  <Box>
    {amenities.length && <Text fontSize='2xl' fontWeight='black' marginTop='5'>Facilites:</Text>}
      <Flex flexWrap='wrap'>
        {amenities?.map((item) => (
            item?.amenities?.map((amenity) => (
              <Text key={amenity.text} fontWeight='bold' color='blue.400' fontSize='l' p='2' bg='gray.200' m='1' borderRadius='5'>
                {amenity.text}
              </Text>
            ))
        ))}
      </Flex>
  </Box>
  <Flex>
    <Button onClick={() => purchaseProperty()} disabled={hasSignifiedPurchase}>Signify Interest</Button>
  </Flex>
</Box>
);
};

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);
  
  return {
    props: {
      propertyDetails: {...data, id},
    },
  };
}