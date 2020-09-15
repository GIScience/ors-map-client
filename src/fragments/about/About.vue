<template>
  <div>
    <header style="margin-top: 0">
      <img height="auto" class="logo" src="@/assets/img/logo@2x.png" width="200px" />
    </header>
    <v-divider></v-divider>
    <section>
       <v-alert outline :value="true" color="info">
        <h3 class="header"> {{$t('about.donate')}}</h3>
        <span class="textjustify">{{$t('about.donateText')}}</span>
        <a class="link" href="http://www.OpenStreetMap.org" target="_blank">{{$t('about.openStreetMapOrg')}}</a>
       </v-alert>
      <p class="textjustify">{{$t('about.info_I')}}</p>

      <v-alert outline :value="true" color="info">
        <h3 class="header">{{$t('about.infoSupport') }}</h3>
        <div class="textjustify">
          <a class="link" href="https://openrouteservice.org/donations/" target="_blank">{{$t('about.supportText')}}</a>
        </div>
      </v-alert>
      <br>
      <v-divider></v-divider>
      <br>
      <p class="textjustify" >{{$t('about.info_II')}}</p>
    </section>
    <v-divider></v-divider>
    <section>
      <h4 class="sectionHeader">{{$t('about.softwareAndLibraries')}}</h4>
      <p class="textjustify">
        {{$t('about.dataProvided')}} <a class='link' href='https://ghsl.jrc.ec.europa.eu/about.php'
          target='_blank'>{{$t('about.ghsFramework')}}</a>
      </p>
      <p>
        {{$t('about.sources')}} <a class='link' href='https://github.com/GIScience/ors-map-client' target='_blank'>github</a>.
      </p>
      <p>{{$t('about.feefFreeToReportBugs')}} <a href='https://github.com/GIScience/ors-map-client/issues/new' target='_blank'>github</a> {{$t('about.orToFixThem')}}.</p>
    </section>
    <v-divider></v-divider>
    <br>
    <section>
      <a href="http://www.geog.uni-heidelberg.de/gis/heigit_en.html" target="_blank">
        <img height="auto" src="@/assets/img/heigit-and-hd-uni.png" class="brand" width="150px" />
      </a>
      <p>{{$t('about.info_IV')}}</p>
      <span>
        <h3>
          <v-icon>help</v-icon>
          <a href="https://ask.openrouteservice.org" target="_blank"><span> {{$t('about.askOpenrouteservice')}}</span></a></h3>
      </span>
      <br>
      <p class="textjustify">{{$t('about.info_V')}}</p>

      <v-divider></v-divider>
      <h4 class="sectionHeader"><a class="link" href="https://openrouteservice.org/terms-of-service" target="_blank">{{$t('about.privacyPolicy')}}</a></h4>
      <br>
    </section>
  </div>
</template>

<script src="./about.js"></script>
<style scope src="./about.css"></style>
