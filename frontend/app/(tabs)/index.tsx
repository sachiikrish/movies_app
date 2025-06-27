import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import {
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import MovieCard from "@/components/MovieCard";
import axiosIns from "@/axios";
import { useState, useEffect } from "react";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const getTrendingMovies = async () => {
    try {
      const response = await axiosIns.get("/trending/movies");
      setTrendingMovies(response.data.movies);
    } catch (error) {
      console.error("Error fetching trending", error);
    }
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);

  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies(""));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 10,
          minHeight: "100%",
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text>Error encountered: {moviesError.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search"
            />

            <>
              {trendingMovies && trendingMovies.length > 0 && (
                <View className="mt-10">
                  <Text className="text-white font-bold text-lg mb-3">
                    Trending Movies
                  </Text>

                  <FlatList
                    data={trendingMovies}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="mb-4 mt-3"
                    contentContainerStyle={{
                      gap: 22,
                    }}
                    keyExtractor={(item) => item._id?.toString()}
                    renderItem={({ item, index }) => (
                      <TrendingCard movie={item} index={index} />
                    )}
                    ItemSeparatorComponent={() => <View className="w-4" />}
                  />
                </View>
              )}

              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  gap: 10,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
