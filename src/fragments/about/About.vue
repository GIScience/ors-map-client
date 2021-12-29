<template>
  <div>
    <div class="custom-about" ref="customAbout">
    </div>
    <div v-if="showDefaultAboutContent" class="about-container" ref="aboutContainer">
      <header style="margin-top: 0">
        <img ref="aboutLogo" height="auto" class="logo" src="@/assets/img/logo@2x.png" width="200px" />
      </header>
      <v-divider></v-divider>
      <section>
        <v-alert outline :value="true" color="info">
          <h3 class="header"> {{$t('about.donate')}}</h3>
          <span class="textjustify">{{$t('about.donateText')}}</span>
          <a class="link" :href="constants.links.osmLink" target="_blank">{{$t('about.openStreetMapOrg')}}</a>
        </v-alert>
        <p class="textjustify">{{$t('about.info_I')}}</p>
        <v-alert outline :value="true" color="info">
          <h3 class="header">{{$t('about.infoSupport') }}</h3>
          <div class="textjustify">
            <a class="link" :href="constants.links.donate" target="_blank">{{$t('about.supportText')}}</a>
          </div>
        </v-alert>
        <br>
        <v-divider></v-divider>
        <br>
        <p class="textjustify">{{$t('about.info_II')}}</p>
      </section>
      <v-divider></v-divider>
      <section>
        <h4 class="sectionHeader">{{$t('about.softwareAndLibraries')}}</h4>
        <p class="textjustify">
          {{$t('about.dataProvided')}} <a class='link' :href='constants.links.aboutGHSL'
            target='_blank'>{{$t('about.ghsFramework')}}</a>
        </p>
        <p>
          {{$t('about.sources')}} <a class='link' :href="constants.links.source" target='_blank'>github</a>.
        </p>
        <p>{{$t('about.feelFreeToReportBugs')}} <a :href="constants.links.reportIssue" target='_blank'>github</a>
          {{$t('about.orToFixThem')}}.</p>
      </section>
      <v-divider></v-divider>
      <br>
      <section>
        <a :href="constants.links.heiGitEn" target="_blank">
          <img height="auto" src="@/assets/img/heigit-and-hd-uni.png" class="brand" width="150px" />
        </a>
        <p>{{$t('about.info_IV')}}</p>
        <span>
          <h3>
            <v-icon>help</v-icon>
            <a :href="constants.links.askOrs" target="_blank"><span>
              {{$t('about.askOpenrouteservice')}}</span></a>
          </h3>
        </span>
        <br>
        <p class="textjustify">{{$t('about.info_V')}}</p>
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
