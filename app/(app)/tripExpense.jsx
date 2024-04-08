import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import RandomImage from '../../assets/images/randomImages'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EmptyList from '../../components/EmptyList';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ExpenseCard from '../../components/ExpenseCard';
import { useIsFocused } from '@react-navigation/native';
import { expensesRef } from '../../firebaseConfig';
import { getDocs, query, where } from 'firebase/firestore';

const TripExpenses = () => {
  const router = useRouter()
  const data = useLocalSearchParams()
  const {id,city,state} = data

  const [expenses, setExpenses] = useState([])
  const isFocused = useIsFocused()

  const fetchExpenses = async () => {
    const q = query(expensesRef, where('tripId', '==', id));

    const querySnapshot = await getDocs(q)
    const data = []
    querySnapshot.forEach(doc => {
      data.push({ ...doc.data(), id: doc.id })
    })
    setExpenses(data)
  }

  useEffect(() => {
    if (isFocused)
      fetchExpenses();
  }, [isFocused])


  return (
    
    <View>
      <View className='flex-row justify-center items-center bg-blue-950 mx-4 rounded-xl mt-3 border border-blue-300'>
        <Image source={require('../../assets/images/expense.png')} className='h-72 w-72' />
      </View>
      <View className='px-4 mt-4'>
        <View className='flex-row justify-between items-center'>
          <Text className='text-indigo-950 font-bold text-xl'>Expenses</Text>
          <View className='bg-indigo-200 p-2 rounded-full border border-neutral-900'>
            <TouchableOpacity onPress={() => router.push({pathname :'/addExpense',params: {id}})}>
              <Text className='text-black font-medium'>Add Expenses</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: hp(58), marginTop: 10 }}>
          <FlatList
            data={expenses}

            ListEmptyComponent={<EmptyList message={"you haven't recorded any Expenses yet"} />}
            showsVerticalScrollIndicator={false}
            className='mx-1'
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <ExpenseCard item={item} />
              )
            }}
          />
        </View>
      </View>
    </View>
  )
}

export default TripExpenses;