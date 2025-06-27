import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import { fetchMovies } from "@/services/api";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import axiosIns from "@/axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  // 🔍 fetch movies when query changes
  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      fetchData();
    }, 500); // debounce by 500ms

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchMovies(query);
      setMovies(data);

      const imageUrl = data[0].poster_path
    ? `https://image.tmdb.org/t/p/w500${data[0].poster_path}`
    : "https://placehold.co/600x400/1a1a1a/ffffff.png";

      if (data?.length > 0) {
        const searchedMovie = {
          movieID: data[0].id,
          movieTitle: data[0].title,
          posterURL: imageUrl,
        };
        await axiosIns.post("/trending/list", searchedMovie);
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="bg-primary flex-1">
      <Image
        source={images.bg}
        className="absolute flex-1 w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          gap: 10,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search movies..."
                searchQuery={setQuery}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#ab8bff"
                className="my-3"
              />
            )}
            {error && (
              <Text className="text-red-500 px-5 my-3">{error.message}</Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {query.trim() ? "No movies found." : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
