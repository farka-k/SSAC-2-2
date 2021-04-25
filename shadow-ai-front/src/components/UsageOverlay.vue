<template>
    <v-overlay :value="$store.state.showOverlay">
        <v-btn 
        @click="$store.commit('showOverlay')"
        >닫기
        </v-btn>
    </v-overlay>
</template>
<script>
export default({
  name: 'UsageOverlay',

});
</script>
