<template>
  <div>
    <div class="custom-about" ref="customAbout">
    </div>
    <div v-if="showDefaultAboutContent" class="about-container" ref="aboutContainer">
      <header style="margin-top: 0">
        <img alt="Main about page logo" ref="aboutLogo" height="auto" class="logo" :src="getImgSrc('logoImgSrc')" width="200px" />
      </header>
      <v-divider></v-divider>
      <section>
        <v-alert outline :value="true" color="info">
          <h3 class="header"> {{$t('about.donate')}}</h3>
          <span class="text-justify">{{$t('about.donateText')}}</span>
          <a class="link" :href="constants.links.osm" target="_blank">{{$t('about.openStreetMapOrg')}}</a>
        </v-alert>
        <p class="text-justify">{{$t('about.info_I')}}</p>
        <v-alert outline :value="true" color="info">
          <h3 class="header">{{$t('about.infoSupport') }}</h3>
          <div class="text-justify">
            <a class="link" :href="constants.links.donate" target="_blank">{{$t('about.supportText')}}</a>
          </div>
        </v-alert>
        <br>
        <v-divider></v-divider>
        <br>
        <p class="text-justify">{{$t('about.info_II')}}</p>
      </section>
      <v-divider></v-divider>
      <section>
        <h4 class="sectionHeader">{{$t('about.softwareAndLibraries')}}</h4>
        <p class="text-justify">
          {{$t('about.dataProvided')}} <a class='link' :href='constants.links.ghsl'
            target='_blank'>{{$t('about.ghsFramework')}}</a>
        </p>
        <p>
          {{$t('about.sources')}} <a class='link' :href="constants.links.source" target='_blank'>github</a>.
        </p>
        <p>{{$t('about.feelFreeToReportBugs')}} <a :href="constants.links.newIssue" target='_blank'>github</a>
          {{$t('about.orToFixThem')}}.</p>
      </section>
      <v-divider></v-divider>
      <br>
      <section>
        <a :href="constants.links.heigit" target="_blank">
          <img alt="Brand logo"  height="auto" :src="getImgSrc('brandLogoSrc')" class="brand" width="150px" />
        </a>
        <p>{{$t('about.info_IV')}}</p>
        <span>
          <h3>
            <v-icon>help</v-icon>
            <a :href="constants.links.forum" target="_blank"><span>
              {{$t('about.askOpenrouteservice')}}</span></a>
          </h3>
        </span>
        <br>
        <p class="text-justify">{{$t('about.info_V')}}</p>
        <v-divider></v-divider>
        <h4 class="sectionHeader">
          <a class="link" :title="$t('about.privacyPolicy')" :href="constants.links.privacyPolicy" target="_blank">{{$t('about.privacyPolicy')}}</a>&nbsp; &nbsp;
          <a class="link" :title="$t('about.termsOfService')" :href="constants.links.termsOfService" target="_blank">{{$t('about.termsOfService')}}</a>
        </h4>
        <br>
      </section>
    </div>
  </div>
</template>

<script src="./about.js"></script>
<style scope src="./about.css"></style>
