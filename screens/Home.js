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

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
          documentaryMoviesData,
        ]) => {
          const moviesImagesArray = [];
          upcomingMoviesData.forEach((movie) => {
            moviesImagesArray.push(
              "https://image.tmdb.org/t/p/w500" + movie.poster_path
            );
          });
          // modificando los estados
          setMoviesImages(moviesImagesArray);
          setPopuarMovies(popularMoviesData);
          setPopularTv(popularTvData);
          setFamilyMovies(familyMoviesData);
          setDocumentaryMovies(documentaryMoviesData);
        }
      )
      .cath(() => {
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return (
    // todo lo que este dentro del fragmen es lo que se va a retornar (vistas y fragmentos)
    <React.Fragment>
      {/* Upcoming Movies */}
      {loaded && !Error && (
        <ScrollView>
          {moviesImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={moviesImages}
                dotStyle={styles.sliderStyle}
                sliderBoxHeight={dimentions.height / 1.5}
                autoplay={true}
                circleloop={true}
              />
            </View>
          )}
          {/* Popular Movies */}
          {popularMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title={"Películas populares entre el público"}
                content={popularMovies}
              />
            </View>
          )}
          {/* Popular TV Shows */}
          {popularTv && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title={"Programas de TV populares"}
                content={popularTv}
              />
            </View>
          )}
          {/* Family Movies */}
          {familyMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title={"Películas familiares"}
                content={familyMovies}
              />
            </View>
          )}
          {/* Documentary Movies */}
          {documentaryMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title={"Documentales"}
                content={documentaryMovies}
              />
            </View>
          )}
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator size="large" />}
      {error && <Error />}
    </React.Fragment>
  );
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
