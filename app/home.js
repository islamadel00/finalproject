import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TextInput,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { useApp } from "../context/AppContext";
import { getMoviesByType } from "../services/tmdb";

export default function Home() {
  const { theme, favorites, toggleFavorite } = useApp();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("popular"); 

  const router = useRouter();

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      const data = await getMoviesByType(category);
      setMovies(data);
      setLoading(false);
    }

    fetchMovies();
  }, [category]);

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
        <Text style={{ color: "#FFD700", marginTop: 10 }}>
          Loading Movies...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme === "light" ? "#fff" : "#000",
        padding: 15,
      }}
    >
      <Text
        style={{
          color: theme === "light" ? "#000" : "#FFD700",
          fontSize: 24,
          fontWeight: "700",
          marginBottom: 5,
        }}
      >
        {category === "popular"
          ? "🔥 Popular Movies"
          : category === "upcoming"
          ? "⏳ Upcoming Movies"
          : "🏆 Top Rated Movies"}
      </Text>

      {/* 🎯 Show count */}
      <Text
        style={{
          color: theme === "light" ? "#333" : "#FFD700",
          fontSize: 14,
          marginBottom: 10,
        }}
      >
        Showing {filteredMovies.length} results
      </Text>

      {/* 🧭 Category Tabs */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 15,
        }}
      >
        {[
          { label: "🔥 Popular", type: "popular" },
          { label: "⏳ Upcoming", type: "upcoming" },
          { label: "🏆 Top Rated", type: "top_rated" },
        ].map((tab) => (
          <Pressable key={tab.type} onPress={() => setCategory(tab.type)}>
            <Text
              style={{
                color:
                  category === tab.type
                    ? theme === "light"
                      ? "#000"
                      : "#FFD700"
                    : theme === "light"
                    ? "#888"
                    : "#666",
                fontWeight: category === tab.type ? "700" : "400",
                fontSize: 16,
              }}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <TextInput
        placeholder="🔍 Search for a movie..."
        placeholderTextColor={theme === "light" ? "#888" : "#aaa"}
        style={{
          backgroundColor: theme === "light" ? "#eee" : "#222",
          borderRadius: 20,
          paddingHorizontal: 15,
          paddingVertical: 10,
          color: theme === "light" ? "#000" : "#fff",
          fontSize: 16,
          marginBottom: 15,
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
              style={{
                width: "100%",
                height: 300,
                borderRadius: 10,
              }}
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
