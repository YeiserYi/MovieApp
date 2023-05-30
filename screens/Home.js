import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTv,
  getFamilyMovies,
  getDocumentaryMovies,
} from "../services/service";
import { SliderBox } from "react-native-image-slider-box";

const dimentions = Dimensions.get("screen");

const Home = ({ navigation }) => {
  {
    /*Hooks para los estados de las categorias */
  }
  const [moviesImages, setMoviesImages] = useState();
  const [popularMovies, setPopuarMovies] = useState();
  const [popularTv, setPopularTv] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [documentaryMovies, setDocumentaryMovies] = useState();
  {
    /*Hooks para el manejo de los errores y Carga */
  }
  const [error, setError] = useState();
  const [loaded, setLoaded] = useState();

  const getData = () => {
      return Promise.all([
        getPopularMovies(),
        getUpcomingMovies(),
        getPopularTv(),
        getFamilyMovies(),
        getDocumentaryMovies(),
      ]);
  };
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
