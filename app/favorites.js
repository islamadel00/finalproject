import { View, Text, FlatList, Image, Pressable } from "react-native";
import { useApp } from "../context/AppContext";
import { useRouter } from "expo-router";

export default function Favorites() {
  const { theme, favorites, toggleFavorite } = useApp();
  const router = useRouter();

  if (favorites.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme === "light" ? "#fff" : "#000",
        }}
      >
        <Text
          style={{
            color: theme === "light" ? "#000" : "#FFD700",
            fontSize: 18,
          }}
        >
          No favorites yet 
        </Text>
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
         My Favorites
      </Text>

      <FlatList
        data={favorites}
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
                <Text style={{ fontSize: 22 }}>💔</Text>
              </Pressable>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
