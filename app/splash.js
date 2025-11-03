import { useEffect, useRef } from "react";
import { View, Animated, Image, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1800,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();

    const timer = setTimeout(() => {
      router.replace("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/adaptive-icon.png")}
        style={[styles.logo, { opacity: fadeAnim, transform: [{ rotate: spin }] }]}
      />
      <Animated.Text style={[styles.appName, { opacity: fadeAnim }]}>
        SOS Films
      </Animated.Text>
      <Animated.Text style={[styles.slogan, { opacity: fadeAnim }]}>
        Lights • Camera • Action
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  slogan: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
    marginTop: 8,
    fontStyle: "italic",
  },
});
