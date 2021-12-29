<template>
  <div class="share-container" ref="shareContainer">
    <v-btn class="open-share-btn" style="float:right; margin-top:0" small icon :title="$t('share.share')" @click="openShare()"><v-icon>share</v-icon></v-btn>
    <v-dialog v-model="isShareModalOpen" max-width="600" :persistent="true" attach="body">
      <box customClass="share-modal" v-model="isShareModalOpen" background="white" closable @closed="closeShare()">
        <h3 slot="header">{{$t('share.shareLink')}}</h3>
        <v-layout row wrap>
          <v-flex xs12 sm10 d-flex>
            <v-text-field append-icon="file_copy"
              @click:append="copyUrl()"
              @click="copyUrl()" readonly
              v-model="shareUrl"
              :label="$t('share.share')" >
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm2 d-flex>
            <v-btn style="margin-top:11px" class="toggle-short-url" color="primary" :title="shortBtnTitle" @click="toggleShortUrl()">{{shortBtnTitle}}</v-btn>
          </v-flex>
        </v-layout>
        <v-alert :value="true" type="info" > {{$t('share.copyUrlInfo')}}</v-alert>
        <br><br>
        <v-layout row wrap>
          <v-flex xs12 sm12 d-flex>
            <v-textarea auto-grow
              @click="copyEmbed()" readonly
              v-model="embedCode"
              :label="$t('share.embed')" >
            </v-textarea>
          </v-flex>
        </v-layout>
        <v-alert :value="true" type="info" > {{$t('share.embedInstructions')}}</v-alert>
      </box>
    </v-dialog>
  </div>
</template>

<script src="./share.js"></script>
