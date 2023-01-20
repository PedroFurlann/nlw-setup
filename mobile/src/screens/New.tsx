import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { BackButton } from "../components/BackButton";
import colors from "tailwindcss/colors";
import { CheckBox } from "../components/CheckBox";
import { useState } from "react";
import { Feather } from '@expo/vector-icons'
import { api } from "../lib/axios";

const availableWeekDays = ['Domingo', 'Segunda-Feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

export function New() {
  const [weekDays, setWeekDays] = useState<number[]>([])
  const [title, setTitle] = useState('')

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(state=> state.filter(weekDay => weekDay !== weekDayIndex))
    } else {
      setWeekDays(state => [...state, weekDayIndex])
    }
  }

  async function handleCreateNewHabit() {
    try {
      if (!title.trim() || weekDays.length === 0) {
        Alert.alert('Novo Hábito', 'Informe o nome do hábito e escolha a periodicidade.')
      }

      await api.post('/habits', { title, weekDays })

      setTitle('')
      setWeekDays([])

      Alert.alert('Sucesso!', 'Novo hábito criado com sucesso')

    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possível criar o novo hábito')
    } 
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 100 }}
      >         
          <BackButton />
          
          <Text className="mt-6 text-white font-extrabold text-3xl">
            Criar Hábito
          </Text>

          <Text className="mt-6 text-white font-semibold text-base">
            Qual hábito deseja adicionar?
          </Text>

          <TextInput 
            className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
            selectionColor={colors.green[600]}
            placeholder="Ex: Exercícios, Dieta, Estudar, etc..."
            placeholderTextColor={colors.zinc[500]}
            onChangeText={setTitle}
            value={title}
          />

          <Text className="font-semibold mt-4 mb-3 text-white text-base">
            Qual a recorrência
          </Text>

          {availableWeekDays.map((weekday, i) => (
            <CheckBox 
              key={`${weekday}-${i}`}
              title={weekday}
              checked={weekDays.includes(i)}
              onPress={() => handleToggleWeekDay(i)}
            />
          ))}

          <TouchableOpacity 
            className="w-full h-14 flex flex-row justify-center items-center bg-green-600 rounded-lg mt-6"
            activeOpacity={0.7}
            onPress={handleCreateNewHabit}
          >
            <Feather 
              name="check"
              size={20}
              color={colors.white}
            />

            <Text className="font-semibold text-base text-white ml-2">
              Confirmar
            </Text>
          </TouchableOpacity>
      </ScrollView>
    </View>
  )
}