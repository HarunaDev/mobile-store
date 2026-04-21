import { View, Text, Image, Pressable, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

export default function ListHeader() {
  return (
    // header
    <View>
      <View>
        {/* header top */}
        <View>
            <View>
                <Image source={{uri: 'https://via.placeholder.com/40'}}/>
                <Text>Hello Shopper</Text>
            </View>
        </View>
      </View>

      <View>
      <Pressable>
        {({ pressed }) => (
            <View>
                <FontAwesome name='shopping-cart' size={25} color='gray' />

                <View>
                    <Text>{1}</Text>
                </View>
            </View>
        )}
      </Pressable>

        <TouchableOpacity>
            <FontAwesome name='sign-out' size={25} color='red'/>
        </TouchableOpacity>

      </View>

      <View>
        {/* hero container */}
      </View>
      <View>
        {/* categories container */}
      </View>
    </View>
  )
}