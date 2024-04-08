import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { CategoryBG } from '../theme'
import { MaterialIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useAuth } from '../context/authContext';


const ExpenseCard = ({ item }) => {

    const {deleteExpense} = useAuth()
    
    const handleDelete = () =>{
        deleteExpense(item.id)
    }

    useEffect(()=>{
      
    },[handleDelete])

    return (
        <View style={{ backgroundColor: CategoryBG[item.category] }} className='flex-row justify-between items-center p-3 mb-2 rounded-2xl border border-gray-300 px-5 '>
            <View>
                <Text className='text-indigo-50 font-bold'>{item.title}</Text>
                <Text className='text-indigo-50 text-xs'>{item.category}</Text>
            </View>
            <View className='flex-row gap-4'>
                <Text className='text-indigo-50 mt-1'>{item.amount} ₹</Text>
                <TouchableOpacity onPress={handleDelete}>
                    <MaterialIcons name='delete' color={'#b30000'} size={hp(3.5)} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ExpenseCard