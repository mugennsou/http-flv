<template>
  <div id="flv-js-player">
    <el-form :model="mediaDataSource" :disabled="!supported" @submit.native.prevent>
      <el-form-item>
        <el-input v-model="mediaDataSource.url" />
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="mediaDataSource.hasAudio" label="hasAudio" />
        <el-checkbox v-model="mediaDataSource.hasVideo" label="hasVideo" />
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="load">LOAD</el-button>
        <el-button size="mini" @click="start">START</el-button>
        <el-button size="mini" @click="pause">PAUSE</el-button>
        <el-button size="mini" type="danger" @click="destroy">DESTROY</el-button>
      </el-form-item>
    </el-form>
    <video controls ref="video">
    </video>
  </div>
</template>

<script>
import Flv from 'flv.js'

export default {
  name: 'flv-js',
  watch: {
    'mediaDataSource.url': (value) => {
      try {
        localStorage.setItem('flv-js.mediaDataSource.url', value)
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    }
  },
  methods: {
    loadLocalMediaDataSource() {
      try {
        let url = localStorage.getItem('flv-js.mediaDataSource.url')
        if (url !== null) this.mediaDataSource.url = url
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
    load() {
      this.player && this.destroy()
      this.player = Flv.createPlayer(this.mediaDataSource)
      this.player.attachMediaElement(this.$refs.video);
      this.player.load()

      this.bindEvents()
      this.start()
    },
    bindEvents() {
      this.player.on('error', this.destroy)
      this.player.on('loading_complete', this.destroy)
      this.player.on('recovered_early_eof', this.destroy)
      this.player.on('media_info', this.destroy)
      this.player.on('metadata_arrived', this.destroy)
      this.player.on('statistics_info', () => { })
    },
    start() {
      this.player && this.player.play();
    },
    pause() {
      this.player && this.player.pause();
    },
    destroy() {
      if (this.player) {
        this.player.pause();
        this.player.unload();
        this.player.detachMediaElement();
        this.player.destroy();
        this.player = null;
      }
    }
  },
  data() {
    return {
      supported: false,
      player: null,
      mediaDataSource: {
        type: 'flv',
        isLive: true,
        url: 'http://localhost/live?app=demo&stream=stream-1',
        hasAudio: true,
        hasVideo: true,
      }
    }
  },
  mounted() {
    this.supported = Flv.isSupported()

    this.loadLocalMediaDataSource()
  },
  beforeDestroy() {
    this.destroy()
  }
}
</script>

<style lang="scss">
#flv-js-player {
  > video {
    width: 100%;
  }
}
</style>
