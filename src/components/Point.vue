<template>
  <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" class="h-full">
    <ol-view ref="view" :center="center" :zoom="zoom" projection="EPSG:4326" />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

    <ol-vector-layer>
      <ol-source-vector>
        <ol-feature>
          <ol-geom-point :coordinates="point"></ol-geom-point>
          <ol-style>
            <ol-style-circle :radius="5">
              <ol-style-fill color="white"></ol-style-fill>
              <ol-style-stroke color="red" :width="2"></ol-style-stroke>
            </ol-style-circle>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>
  </ol-map>
</template>

<script setup lang="ts">
const props = defineProps({
  center: { type: Array, default: [120.606588, 22.645327] },
  zoom: { type: Number, default: 12 },
  point: { type: Array<Number>, default: [120.606588, 22.645327] },
})
</script>
