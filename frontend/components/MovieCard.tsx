import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";
interface Movie {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
}

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://placehold.co/600x400/1a1a1a/ffffff.png";

  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[32%]">
        <Image
          source={{
            uri: imageUrl,
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row items-center justify-between gap-x-1">
         <View className="flex-row items-center gap-x-1">
           <Image source={icons.star} />
          <Text className="text-gray-500 text-xs font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
         </View>

          <View className="flex-col-reverse items-center">
            <Text className="text-xs text-light-300 font-medium mt-1">
              {release_date?.split("-")[0]}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
