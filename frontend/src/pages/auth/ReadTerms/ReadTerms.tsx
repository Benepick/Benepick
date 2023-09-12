import React, { useRef, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ReadTermsNavigationProps } from 'interfaces/navigation';
import SubmitButton from '@common/components/SubmitButton';
import WhitePage from '@common/components/WhitePage';
import colors from '@common/design/colors';

function ReadTerms({ navigation }: ReadTermsNavigationProps) {
  const scrollRef = useRef<ScrollView>(null);
  const [height, setHeight] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(0);
  const [isEndOfPage, setIsEndOfPage] = useState(false);

  const onPress = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: 0, y: currentHeight + height, animated: true });
    }
    if (isEndOfPage) {
      navigation.push('Terms', { isRead: true });
    }
  };

  return (
    <WhitePage
      style={{ flex: 1 }}
      onLayout={(event) => {
        setHeight(event.nativeEvent.layout.height);
      }}
    >
      <ScrollView
        ref={scrollRef}
        onScroll={(event) => {
          setCurrentHeight(event.nativeEvent.contentOffset.y);
          if (event.nativeEvent.contentOffset.y + height >= event.nativeEvent.contentSize.height) {
            setIsEndOfPage(true);
          } else {
            setIsEndOfPage(false);
          }
        }}
      >
        <Text>
          텍스트입니다. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id leo eget
          nulla tempus imperdiet. Donec massa enim, eleifend rhoncus iaculis ac, scelerisque nec
          sem. Proin placerat nisl at placerat placerat. Fusce vitae elit nec tellus tincidunt
          viverra. Phasellus tempus, leo et accumsan tempus, orci arcu aliquet ipsum, in maximus
          tellus leo a ante. Sed aliquam eleifend erat, vulputate viverra urna pretium et. Maecenas
          felis lorem, molestie vel nulla vel, volutpat tempus erat. Sed a consectetur mauris,
          viverra pharetra lacus. Sed vel nunc auctor, sollicitudin neque eget, luctus risus. In
          maximus in leo at suscipit. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos. Ut maximus volutpat quam quis pharetra. Cras egestas
          ligula non lectus feugiat, vitae sagittis mi malesuada. In facilisis sollicitudin
          condimentum. In tempor posuere elementum. Nullam venenatis dictum bibendum. Curabitur et
          mi a magna lobortis porttitor in non augue. Vivamus eu nibh mollis, maximus mi a,
          tincidunt neque. Proin sit amet sem sem. Nunc leo arcu, hendrerit id ultricies ac, maximus
          id erat. Fusce bibendum urna sed quam tempor lobortis. Sed facilisis tristique elementum.
          In nec porttitor diam, a euismod leo. Mauris sollicitudin feugiat dolor ac rutrum.
          Maecenas mauris dolor, finibus et euismod aliquam, sagittis at enim. Mauris pharetra ut
          nulla ac viverra. Cras vulputate diam id mauris aliquet sollicitudin. Nulla id est nibh.
          Aliquam sed fringilla risus. Fusce sed libero dui. Donec nulla augue, consequat at dolor
          eget, ultrices dictum diam. In suscipit, eros rutrum commodo rutrum, sem mi posuere ipsum,
          quis auctor metus massa quis orci. Quisque vitae sodales leo. Ut facilisis, ante sit amet
          condimentum dapibus, massa lorem mollis nisi, nec ultrices ipsum urna eget neque. Etiam
          lacinia faucibus mauris, in tristique dolor molestie vel. Sed malesuada suscipit elit, a
          convallis leo molestie eget. Vivamus vulputate nisl sapien, vel pulvinar odio porttitor a.
          Donec lorem eros, ultrices non suscipit eu, maximus id nisl. Aenean euismod nisi feugiat
          neque consectetur, id dictum massa sodales. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed id leo eget nulla tempus imperdiet. Donec massa enim, eleifend
          rhoncus iaculis ac, scelerisque nec sem. Proin placerat nisl at placerat placerat. Fusce
          vitae elit nec tellus tincidunt viverra. Phasellus tempus, leo et accumsan tempus, orci
          arcu aliquet ipsum, in maximus tellus leo a ante. Sed aliquam eleifend erat, vulputate
          viverra urna pretium et. Maecenas felis lorem, molestie vel nulla vel, volutpat tempus
          erat. Sed a consectetur mauris, viverra pharetra lacus. Sed vel nunc auctor, sollicitudin
          neque eget, luctus risus. In maximus in leo at suscipit. Class aptent taciti sociosqu ad
          litora torquent per conubia nostra, per inceptos himenaeos. Ut maximus volutpat quam quis
          pharetra. Cras egestas ligula non lectus feugiat, vitae sagittis mi malesuada. In
          facilisis sollicitudin condimentum. In tempor posuere elementum. Nullam venenatis dictum
          bibendum. Curabitur et mi a magna lobortis porttitor in non augue. Vivamus eu nibh mollis,
          maximus mi a, tincidunt neque. Proin sit amet sem sem. Nunc leo arcu, hendrerit id
          ultricies ac, maximus id erat. Fusce bibendum urna sed quam tempor lobortis. Sed facilisis
          tristique elementum. In nec porttitor diam, a euismod leo. Mauris sollicitudin feugiat
          dolor ac rutrum. Maecenas mauris dolor, finibus et euismod aliquam, sagittis at enim.
          Mauris pharetra ut nulla ac viverra. Cras vulputate diam id mauris aliquet sollicitudin.
          Nulla id est nibh. Aliquam sed fringilla risus. Fusce sed libero dui. Donec nulla augue,
          consequat at dolor eget, ultrices dictum diam. In suscipit, eros rutrum commodo rutrum,
          sem mi posuere ipsum, quis auctor metus massa quis orci. Quisque vitae sodales leo. Ut
          facilisis, ante sit amet condimentum dapibus, massa lorem mollis nisi, nec ultrices ipsum
          urna eget neque. Etiam lacinia faucibus mauris, in tristique dolor molestie vel. Sed
          malesuada suscipit elit, a convallis leo molestie eget. Vivamus vulputate nisl sapien, vel
          pulvinar odio porttitor a. Donec lorem eros, ultrices non suscipit eu, maximus id nisl.
          Aenean euismod nisi feugiat neque consectetur, id dictum massa sodales. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Sed id leo eget nulla tempus imperdiet. Donec massa
          enim, eleifend rhoncus iaculis ac, scelerisque nec sem. Proin placerat nisl at placerat
          placerat. Fusce vitae elit nec tellus tincidunt viverra. Phasellus tempus, leo et accumsan
          tempus, orci arcu aliquet ipsum, in maximus tellus leo a ante. Sed aliquam eleifend erat,
          vulputate viverra urna pretium et. Maecenas felis lorem, molestie vel nulla vel, volutpat
          tempus erat. Sed a consectetur mauris, viverra pharetra lacus. Sed vel nunc auctor,
          sollicitudin neque eget, luctus risus. In maximus in leo at suscipit. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut maximus
          volutpat quam quis pharetra. Cras egestas ligula non lectus feugiat, vitae sagittis mi
          malesuada. In facilisis sollicitudin condimentum. In tempor posuere elementum. Nullam
          venenatis dictum bibendum. Curabitur et mi a magna lobortis porttitor in non augue.
          Vivamus eu nibh mollis, maximus mi a, tincidunt neque. Proin sit amet sem sem. Nunc leo
          arcu, hendrerit id ultricies ac, maximus id erat. Fusce bibendum urna sed quam tempor
          lobortis. Sed facilisis tristique elementum. In nec porttitor diam, a euismod leo. Mauris
          sollicitudin feugiat dolor ac rutrum. Maecenas mauris dolor, finibus et euismod aliquam,
          sagittis at enim. Mauris pharetra ut nulla ac viverra. Cras vulputate diam id mauris
          aliquet sollicitudin. Nulla id est nibh. Aliquam sed fringilla risus. Fusce sed libero
          dui. Donec nulla augue, consequat at dolor eget, ultrices dictum diam. In suscipit, eros
          rutrum commodo rutrum, sem mi posuere ipsum, quis auctor metus massa quis orci. Quisque
          vitae sodales leo. Ut facilisis, ante sit amet condimentum dapibus, massa lorem mollis
          nisi, nec ultrices ipsum urna eget neque. Etiam lacinia faucibus mauris, in tristique
          dolor molestie vel. Sed malesuada suscipit elit, a convallis leo molestie eget. Vivamus
          vulputate nisl sapien, vel pulvinar odio porttitor a. Donec lorem eros, ultrices non
          suscipit eu, maximus id nisl. Aenean euismod nisi feugiat neque consectetur, id dictum
          massa sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id leo eget
          nulla tempus imperdiet. Donec massa enim, eleifend rhoncus iaculis ac, scelerisque nec
          sem. Proin placerat nisl at placerat placerat. Fusce vitae elit nec tellus tincidunt
          viverra. Phasellus tempus, leo et accumsan tempus, orci arcu aliquet ipsum, in maximus
          tellus leo a ante. Sed aliquam eleifend erat, vulputate viverra urna pretium et. Maecenas
          felis lorem, molestie vel nulla vel, volutpat tempus erat. Sed a consectetur mauris,
          viverra pharetra lacus. Sed vel nunc auctor, sollicitudin neque eget, luctus risus. In
          maximus in leo at suscipit. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos. Ut maximus volutpat quam quis pharetra. Cras egestas
          ligula non lectus feugiat, vitae sagittis mi malesuada. In facilisis sollicitudin
          condimentum. In tempor posuere elementum. Nullam venenatis dictum bibendum. Curabitur et
          mi a magna lobortis porttitor in non augue. Vivamus eu nibh mollis, maximus mi a,
          tincidunt neque. Proin sit amet sem sem. Nunc leo arcu, hendrerit id ultricies ac, maximus
          id erat. Fusce bibendum urna sed quam tempor lobortis. Sed facilisis tristique elementum.
          In nec porttitor diam, a euismod leo. Mauris sollicitudin feugiat dolor ac rutrum.
          Maecenas mauris dolor, finibus et euismod aliquam, sagittis at enim. Mauris pharetra ut
          nulla ac viverra. Cras vulputate diam id mauris aliquet sollicitudin. Nulla id est nibh.
          Aliquam sed fringilla risus. Fusce sed libero dui. Donec nulla augue, consequat at dolor
          eget, ultrices dictum diam. In suscipit, eros rutrum commodo rutrum, sem mi posuere ipsum,
          quis auctor metus massa quis orci. Quisque vitae sodales leo. Ut facilisis, ante sit amet
          condimentum dapibus, massa lorem mollis nisi, nec ultrices ipsum urna eget neque. Etiam
          lacinia faucibus mauris, in tristique dolor molestie vel. Sed malesuada suscipit elit, a
          convallis leo molestie eget. Vivamus vulputate nisl sapien, vel pulvinar odio porttitor a.
          Donec lorem eros, ultrices non suscipit eu, maximus id nisl. Aenean euismod nisi feugiat
          neque consectetur, id dictum massa sodales. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed id leo eget nulla tempus imperdiet. Donec massa enim, eleifend
          rhoncus iaculis ac, scelerisque nec sem. Proin placerat nisl at placerat placerat. Fusce
          vitae elit nec tellus tincidunt viverra. Phasellus tempus, leo et accumsan tempus, orci
          arcu aliquet ipsum, in maximus tellus leo a ante. Sed aliquam eleifend erat, vulputate
          viverra urna pretium et. Maecenas felis lorem, molestie vel nulla vel, volutpat tempus
          erat. Sed a consectetur mauris, viverra pharetra lacus. Sed vel nunc auctor, sollicitudin
          neque eget, luctus risus. In maximus in leo at suscipit. Class aptent taciti sociosqu ad
          litora torquent per conubia nostra, per inceptos himenaeos. Ut maximus volutpat quam quis
          pharetra. Cras egestas ligula non lectus feugiat, vitae sagittis mi malesuada. In
          facilisis sollicitudin condimentum. In tempor posuere elementum. Nullam venenatis dictum
          bibendum. Curabitur et mi a magna lobortis porttitor in non augue. Vivamus eu nibh mollis,
          maximus mi a, tincidunt neque. Proin sit amet sem sem. Nunc leo arcu, hendrerit id
          ultricies ac, maximus id erat. Fusce bibendum urna sed quam tempor lobortis. Sed facilisis
          tristique elementum. In nec porttitor diam, a euismod leo. Mauris sollicitudin feugiat
          dolor ac rutrum. Maecenas mauris dolor, finibus et euismod aliquam, sagittis at enim.
          Mauris pharetra ut nulla ac viverra. Cras vulputate diam id mauris aliquet sollicitudin.
          Nulla id est nibh. Aliquam sed fringilla risus. Fusce sed libero dui. Donec nulla augue,
          consequat at dolor eget, ultrices dictum diam. In suscipit, eros rutrum commodo rutrum,
          sem mi posuere ipsum, quis auctor metus massa quis orci. Quisque vitae sodales leo. Ut
          facilisis, ante sit amet condimentum dapibus, massa lorem mollis nisi, nec ultrices ipsum
          urna eget neque. Etiam lacinia faucibus mauris, in tristique dolor molestie vel. Sed
          malesuada suscipit elit, a convallis leo molestie eget. Vivamus vulputate nisl sapien, vel
          pulvinar odio porttitor a. Donec lorem eros, ultrices non suscipit eu, maximus id nisl.
          Aenean euismod nisi feugiat neque consectetur, id dictum massa sodales. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Sed id leo eget nulla tempus imperdiet. Donec massa
          enim, eleifend rhoncus iaculis ac, scelerisque nec sem. Proin placerat nisl at placerat
          placerat. Fusce vitae elit nec tellus tincidunt viverra. Phasellus tempus, leo et accumsan
          tempus, orci arcu aliquet ipsum, in maximus tellus leo a ante. Sed aliquam eleifend erat,
          vulputate viverra urna pretium et. Maecenas felis lorem, molestie vel nulla vel, volutpat
          tempus erat. Sed a consectetur mauris, viverra pharetra lacus. Sed vel nunc auctor,
          sollicitudin neque eget, luctus risus. In maximus in leo at suscipit. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut maximus
          volutpat quam quis pharetra. Cras egestas ligula non lectus feugiat, vitae sagittis mi
          malesuada. In facilisis sollicitudin condimentum. In tempor posuere elementum. Nullam
          venenatis dictum bibendum. Curabitur et mi a magna lobortis porttitor in non augue.
          Vivamus eu nibh mollis, maximus mi a, tincidunt neque. Proin sit amet sem sem. Nunc leo
          arcu, hendrerit id ultricies ac, maximus id erat. Fusce bibendum urna sed quam tempor
          lobortis. Sed facilisis tristique elementum. In nec porttitor diam, a euismod leo. Mauris
          sollicitudin feugiat dolor ac rutrum. Maecenas mauris dolor, finibus et euismod aliquam,
          sagittis at enim. Mauris pharetra ut nulla ac viverra. Cras vulputate diam id mauris
          aliquet sollicitudin. Nulla id est nibh. Aliquam sed fringilla risus. Fusce sed libero
          dui. Donec nulla augue, consequat at dolor eget, ultrices dictum diam. In suscipit, eros
          rutrum commodo rutrum, sem mi posuere ipsum, quis auctor metus massa quis orci. Quisque
          vitae sodales leo. Ut facilisis, ante sit amet condimentum dapibus, massa lorem mollis
          nisi, nec ultrices ipsum urna eget neque. Etiam lacinia faucibus mauris, in tristique
          dolor molestie vel. Sed malesuada suscipit elit, a convallis leo molestie eget. Vivamus
          vulputate nisl sapien, vel pulvinar odio porttitor a. Donec lorem eros, ultrices non
          suscipit eu, maximus id nisl. Aenean euismod nisi feugiat neque consectetur, id dictum
          massa sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id leo eget
          nulla tempus imperdiet. Donec massa enim, eleifend rhoncus iaculis ac, scelerisque nec
          sem. Proin placerat nisl at placerat placerat. Fusce vitae elit nec tellus tincidunt
          viverra. Phasellus tempus, leo et accumsan tempus, orci arcu aliquet ipsum, in maximus
          tellus leo a ante. Sed aliquam eleifend erat, vulputate viverra urna pretium et. Maecenas
          felis lorem, molestie vel nulla vel, volutpat tempus erat. Sed a consectetur mauris,
          viverra pharetra lacus. Sed vel nunc auctor, sollicitudin neque eget, luctus risus. In
          maximus in leo at suscipit. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos. Ut maximus volutpat quam quis pharetra. Cras egestas
          ligula non lectus feugiat, vitae sagittis mi malesuada. In facilisis sollicitudin
          condimentum. In tempor posuere elementum. Nullam venenatis dictum bibendum. Curabitur et
          mi a magna lobortis porttitor in non augue. Vivamus eu nibh mollis, maximus mi a,
          tincidunt neque. Proin sit amet sem sem. Nunc leo arcu, hendrerit id ultricies ac, maximus
          id erat. Fusce bibendum urna sed quam tempor lobortis. Sed facilisis tristique elementum.
          In nec porttitor diam, a euismod leo. Mauris sollicitudin feugiat dolor ac rutrum.
          Maecenas mauris dolor, finibus et euismod aliquam, sagittis at enim. Mauris pharetra ut
          nulla ac viverra. Cras vulputate diam id mauris aliquet sollicitudin. Nulla id est nibh.
          Aliquam sed fringilla risus. Fusce sed libero dui. Donec nulla augue, consequat at dolor
          eget, ultrices dictum diam. In suscipit, eros rutrum commodo rutrum, sem mi posuere ipsum,
          quis auctor metus massa quis orci. Quisque vitae sodales leo. Ut facilisis, ante sit amet
          condimentum dapibus, massa lorem mollis nisi, nec ultrices ipsum urna eget neque. Etiam
          lacinia faucibus mauris, in tristique dolor molestie vel. Sed malesuada suscipit elit, a
          convallis leo molestie eget. Vivamus vulputate nisl sapien, vel pulvinar odio porttitor a.
          Donec lorem eros, ultrices non suscipit eu, maximus id nisl. Aenean euismod nisi feugiat
          neque consectetur, id dictum massa sodales. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed id leo eget nulla tempus imperdiet. Donec massa enim, eleifend
          rhoncus iaculis ac, scelerisque nec sem. Proin placerat nisl at placerat placerat. Fusce
          vitae elit nec tellus tincidunt viverra. Phasellus tempus, leo et accumsan tempus, orci
          arcu aliquet ipsum, in maximus tellus leo a ante. Sed aliquam eleifend erat, vulputate
          viverra urna pretium et. Maecenas felis lorem, molestie vel nulla vel, volutpat tempus
          erat. Sed a consectetur mauris, viverra pharetra lacus. Sed vel nunc auctor, sollicitudin
          neque eget, luctus risus. In maximus in leo at suscipit. Class aptent taciti sociosqu ad
          litora torquent per conubia nostra, per inceptos himenaeos. Ut maximus volutpat quam quis
          pharetra. Cras egestas ligula non lectus feugiat, vitae sagittis mi malesuada. In
          facilisis sollicitudin condimentum. In tempor posuere elementum. Nullam venenatis dictum
          bibendum. Curabitur et mi a magna lobortis porttitor in non augue. Vivamus eu nibh mollis,
          maximus mi a, tincidunt neque. Proin sit amet sem sem. Nunc leo arcu, hendrerit id
          ultricies ac, maximus id erat. Fusce bibendum urna sed quam tempor lobortis. Sed facilisis
          tristique elementum. In nec porttitor diam, a euismod leo. Mauris sollicitudin feugiat
          dolor ac rutrum. Maecenas mauris dolor, finibus et euismod aliquam, sagittis at enim.
          Mauris pharetra ut nulla ac viverra. Cras vulputate diam id mauris aliquet sollicitudin.
          Nulla id est nibh. Aliquam sed fringilla risus. Fusce sed libero dui. Donec nulla augue,
          consequat at dolor eget, ultrices dictum diam. In suscipit, eros rutrum commodo rutrum,
          sem mi posuere ipsum, quis auctor metus massa quis orci. Quisque vitae sodales leo. Ut
          facilisis, ante sit amet condimentum dapibus, massa lorem mollis nisi, nec ultrices ipsum
          urna eget neque. Etiam lacinia faucibus mauris, in tristique dolor molestie vel. Sed
          malesuada suscipit elit, a convallis leo molestie eget. Vivamus vulputate nisl sapien, vel
          pulvinar odio porttitor a. Donec lorem eros, ultrices non suscipit eu, maximus id nisl.
          Aenean euismod nisi feugiat neque consectetur, id dictum massa sodales.
        </Text>
      </ScrollView>
      <SubmitButton title="확인" onPress={onPress} />
    </WhitePage>
  );
}

export default ReadTerms;
