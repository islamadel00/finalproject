import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, TextInput } from "react-native";
import { useApp } from "../context/AppContext";
import { getPopularMovies } from "../services/tmdb";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";



export default function Home() {
  const { theme, favorites, toggleFavorite } = useApp();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();


  useEffect(() => {
    async function fetchMovies() {
      const data = await getPopularMovies();
      setMovies(data);
      setLoading(false);
    }

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme === "light" ? "#fff" : "#000",
        }}
      >
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={{ color: "#FFD700", marginTop: 10 }}>Loading Movies...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme === "light" ? "#fff" : "#000",
        padding: 10,
      }}
    >
      <Text
        style={{
          color: theme === "light" ? "#000" : "#FFD700",
          fontSize: 24,
          fontWeight: "700",
          marginBottom: 10,
        }}
      >
        🎬 Popular Movies
      </Text>
      <TextInput
        placeholder="Search movies..."
        placeholderTextColor={theme === "light" ? "#999" : "#ccc"}
        style={{
          backgroundColor: theme === "light" ? "#f2f2f2" : "#222",
          color: theme === "light" ? "#000" : "#fff",
          borderRadius: 8,
          padding: 10,
          marginBottom: 15,
          fontSize: 16,
        }}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/movie/${item.id}`)}
            style={{ marginBottom: 20 }}
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={{ width: "100%", height: 300, borderRadius: 10 }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  color: theme === "light" ? "#000" : "#FFD700",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                {item.title}
              </Text>

           
              <Pressable onPress={() => toggleFavorite(item)}>
                <Text style={{ fontSize: 22 }}>
                  {favorites.some((fav) => fav.id === item.id) ? "❤️" : "🤍"}
                </Text>
              </Pressable>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
