import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { TMDB_API_KEY } from "@env";
import { useApp } from "../../context/AppContext";

export default function MovieDetails() {
    const { theme } = useApp();
    const { id } = useLocalSearchParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`
                );
                const data = await response.json();
                setMovie(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }

        fetchMovieDetails();
    }, [id]);

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
                <ActivityIndicator
                    size="large"
                    color={theme === "light" ? "#000" : "#FFD700"}
                />
            </View>
        );
    }

    if (!movie) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: theme === "light" ? "#fff" : "#000",
                }}
            >
                <Text style={{ color: theme === "light" ? "#000" : "#fff" }}>
                    No details found 😢
                </Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: theme === "light" ? "#fff" : "#000",
                padding: 10,
            }}
            showsVerticalScrollIndicator={false}
        >

            <Image
                source={{
                    uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }}
                style={{
                    width: "100%",
                    height: 500,
                    borderRadius: 12,
                    marginBottom: 20,
                }}
            />


            <Text
                style={{
                    color: theme === "light" ? "#000" : "#FFD700",
                    fontSize: 28,
                    fontWeight: "bold",
                    marginBottom: 10,
                }}
            >
                {movie.title}
            </Text>


            <Text
                style={{
                    color: theme === "light" ? "#333" : "#FFD700",
                    marginBottom: 10,
                }}
            >
                ⭐ Rating: {movie.vote_average?.toFixed(1)} / 10
            </Text>


            <View style={{ marginBottom: 15 }}>
                <Text style={{ color: theme === "light" ? "#555" : "#ccc", marginBottom: 5 }}>
                    📅 <Text style={{ fontWeight: "600" }}>Release Date:</Text> {movie.release_date || "N/A"}
                </Text>

                <Text style={{ color: theme === "light" ? "#555" : "#ccc", marginBottom: 5 }}>
                    🎞️ <Text style={{ fontWeight: "600" }}>Duration:</Text> {movie.runtime ? `${movie.runtime} mins` : "N/A"}
                </Text>

                <Text style={{ color: theme === "light" ? "#555" : "#ccc", marginBottom: 5 }}>
                    🎭 <Text style={{ fontWeight: "600" }}>Genres:</Text>{" "}
                    {movie.genres?.map((g) => g.name).join(", ") || "N/A"}
                </Text>

                <Text style={{ color: theme === "light" ? "#555" : "#ccc", marginBottom: 5 }}>
                    🏳️ <Text style={{ fontWeight: "600" }}>Country:</Text>{" "}
                    {movie.production_countries?.map((c) => c.name).join(", ") || "N/A"}
                </Text>

                <Text style={{ color: theme === "light" ? "#555" : "#ccc", marginBottom: 5 }}>
                    💰 <Text style={{ fontWeight: "600" }}>Budget:</Text>{" "}
                    {movie.budget ? `$${movie.budget.toLocaleString()}` : "N/A"}
                </Text>

                <Text style={{ color: theme === "light" ? "#555" : "#ccc", marginBottom: 5 }}>
                    💵 <Text style={{ fontWeight: "600" }}>Revenue:</Text>{" "}
                    {movie.revenue ? `$${movie.revenue.toLocaleString()}` : "N/A"}
                </Text>

                <Text style={{ color: theme === "light" ? "#555" : "#ccc", marginBottom: 5 }}>
                    📽️ <Text style={{ fontWeight: "600" }}>Status:</Text> {movie.status || "N/A"}
                </Text>
            </View>


            <Text
                style={{
                    color: theme === "light" ? "#333" : "#ccc",
                    fontSize: 16,
                    lineHeight: 22,
                    marginBottom: 30,
                }}
            >
                {movie.overview}
            </Text>
        </ScrollView>

    );
}
