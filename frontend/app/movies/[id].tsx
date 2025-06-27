import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const movieDetails = () => {
  return (
    <View>
      <Text>movieDetails</Text>
      <Link href="/"
      className='mt-10'
      ><Text>
        Back to Home</Text></Link>
    </View>
  )
}

export default movieDetails