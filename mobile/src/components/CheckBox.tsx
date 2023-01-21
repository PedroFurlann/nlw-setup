import { Text, TouchableOpacity, TouchableOpacityProps ,View } from "react-native";
import { Feather } from '@expo/vector-icons'
import colors from "tailwindcss/colors";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";

interface CheckBoxProps extends TouchableOpacityProps {
  title: string
  checked?: boolean 
}

export function CheckBox({title, checked = false, ...props }: CheckBoxProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} className="flex flex-row mb-2 items-center" {...props}>
      
      {checked 
        ? 
        <Animated.View 
          className="h-8 w-8 bg-green-500 rounded-lg flex justify-center items-center"
          entering={BounceIn}
          exiting={BounceOut}
        >
        <Feather 
          name="check"
          size={20}
          color={colors.white}
        />
        </Animated.View> 
        :
          <View className="h-8 w-8 bg-zinc-900 rounded-lg" />
      }

      <Text className="text-white text-base ml-3 font-semibold">
        {title}
      </Text>
    </TouchableOpacity>
  )
}