<template>
  <div class="carousel" v-click-outside="clickOutside">
    <vue-horizontal-list ref="horizontalList" :items="mapViewData.places" :options="horizontalListOptions">
      <template v-slot:default="{item}">
        <div @click="itemClicked(item)" :class="{'active': isActive(item)}" class="item">
          <v-card class="card">
            <v-img class="carousel-item-img" :src="imagePath(item)" aspect-ratio="2.75" ></v-img>
            <v-card-title primary-title class="card-title">
              <div class="place-data">
                <h3 :title="item.placeName" class="title ellipsis mb-0">{{item.placeName}}</h3>
                <div class="ellipsis"> <span>{{ getItemLayer(item)}}</span> <span v-if="item.properties.locality"> - {{ item.properties.locality }}</span> <span>{{ item.properties.country_a }}</span> </div>
                <div v-if="item.properties.distance" class="distance">
                  {{$t('placesCarousel.distance')}}
                  <span :title="$t('placesCarousel.distanceFromLocationMarkedOnTheMap')">{{item.properties.distance.toFixed(1)}} {{$t('global.units.km')}}</span>
                </div>
              </div>
            </v-card-title>
            <v-card-actions style="text-align: right">
              <v-layout>
                <v-flex xs5>
                  <v-btn class="navigate-btn" @click="gotToPlace(item)"><span class="text">{{$t('placesCarousel.selectPlace')}}</span>
                    <v-icon class="icon" right dark>place</v-icon>
                  </v-btn>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs6>
                  <v-btn class="navigate-btn" @click="directionsTo(item)"><span class="text">{{$t('placesCarousel.directionsTo')}}</span>
                    <v-icon class="icon" right dark>directions</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
        </div>
      </template>
    </vue-horizontal-list>
    <v-btn class="previous" icon @click.stop="previous()">
      <v-icon large :title="$t('placesCarousel.prev')">keyboard_arrow_left </v-icon>
    </v-btn>
    <v-btn class="next" icon @click.stop="next()">
      <v-icon large :title="$t('placesCarousel.next')">keyboard_arrow_right </v-icon>
    </v-btn>
  </div>
</template>

<script src="./places-carousel.js" > </script>
<style scoped src="./places-carousel.css"></style>
