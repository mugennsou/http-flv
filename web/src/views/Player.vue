<template>
  <el-container id="player">
    <el-main>
      <el-row>
        <el-col :lg="{span:12,offset:6}" :md="{span:16,offset:4}">
          <el-tabs :value="defaultTab" @tab-click="handleClick">
            <el-tab-pane v-for="(tab,index) in tabs" :key="index" :name="index" :label="tab.name" />
          </el-tabs>
          <component v-if="tabs[currentTab] || tabs[defaultTab]" :is="tabs[currentTab] || tabs[defaultTab]" />
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import FlvJs from '@/components/FlvJs'

export default {
  name: 'player',
  components: {
    FlvJs
  },
  computed: {
    defaultTab() {
      return Object.keys(this.tabs).length ? Object.keys(this.tabs)[0] : null;
    },
  },
  methods: {
    handleClick(tab) {
      this.currentTab = tab.name
    }
  },
  data() {
    return {
      tabs: {
        FlvJs
      },
      currentTab: null
    }
  }
}
</script>
