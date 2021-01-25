<template>
<div id="result">
  <container display="flex" justify-content="left" flex-direction="column">
    <div class="content">
      <sourceList :sources="filteredSources"></sourceList>
    </div>
  </container>
</div>
</template>
<script>
import router from '@/router'
import { mapGetters } from 'vuex'
import container from '@/components/container'
import { sourcesCollection } from '@/firebase'
import sourceList from '@/components/sources.searchResult'
export default {
  name: 'searchResult.pages.vue',
  router,
  components: { container, sourceList },
  data: function () {
    return {
      sources: [],
      noSource: false,
      filteredSources: [],
      criterias: this.$route.query.criterias
    }
  },
  created() {
    sourcesCollection.where("sharedUsage", "==", true)
      .where("company.city", "==", this.criterias.city).get()
      .then(snapshot => {
        if (snapshot.empty) {
          this.noSource = true
          return
        }
        snapshot.forEach(doc => {
          this.sources.push({id: doc.id, data: doc.data()})
        })
        this.getSources
      })
      .catch(err => {
        console.log(err)
        console.log(err.code)
      })
  },
  computed: {
    ...mapGetters([
      'getUserInfo',
      'loggedIn'
    ]),
    getSources () {
      this.sources.forEach(e => {
        // logged in
        if (this.loggedIn) {
          if (this.getUserInfo.uid != e.data.company.owner.uid) {
            // province not empty
            if (this.criterias.province !== null && this.criterias.province !== undefined && this.criterias.province !== '') {
              if (this.criterias.province == e.data.company.province || this.criterias.province == e.data.company.region) {
                // capacity not empty
                if (this.criterias.capacity !== null && this.criterias.capacity !== undefined && this.criterias.capacity !== '') {
                  if (this.criterias.capacity <= parseInt(e.data.capacity)) {
                    this.filteredSources.push({id: e.id, data: e.data})
                  }
                } else { // capacity empty
                  this.filteredSources.push({id: e.id, data: e.data})
                }
              }
            } else { // province empty
              // capacity not empty
              if (this.criterias.capacity !== null && this.criterias.capacity !== undefined && this.criterias.capacity !== '') {
                if (this.criterias.capacity <= parseInt(e.data.capacity)) {
                  this.filteredSources.push({id: e.id, data: e.data})
                }
              } else { // capacity empty
                this.filteredSources.push({id: e.id, data: e.data})
              }
            }
          }
        } else {
          // province not empty
          if (this.criterias.province !== null && this.criterias.province !== undefined && this.criterias.province !== '') {
            if (this.criterias.province == e.data.company.province || this.criterias.province == e.data.company.region) {
              // capacity not empty
              if (this.criterias.capacity !== null && this.criterias.capacity !== undefined && this.criterias.capacity !== '') {
                if (this.criterias.capacity <= parseInt(e.data.capacity)) {
                  this.filteredSources.push({id: e.id, data: e.data})
                }
              } else { // capacity empty
                this.filteredSources.push({id: e.id, data: e.data})
              }
            }
          } else { // province empty
            // capacity not empty
            if (this.criterias.capacity !== null && this.criterias.capacity !== undefined && this.criterias.capacity !== '') {
              if (this.criterias.capacity <= parseInt(e.data.capacity)) {
                this.filteredSources.push({id: e.id, data: e.data})
              }
            } else { // capacity empty
              this.filteredSources.push({id: e.id, data: e.data})
            }
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#result {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
#result {
  .content {
    width: 100%;
    display: flex;
    margin: 40px 0;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }
}
</style>