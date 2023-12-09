import { Flex } from '@chakra-ui/layout';
import Image from 'next/image';
import DefaultImage from '../assets/images/loading.gif';

const Loader = () => {
  return (
    <Flex
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 999,
      }}
    >
      <Image alt={'Scroll-Image'} src={DefaultImage} width={400} height={260} />
    </Flex>
  );
};

export default Loader;
