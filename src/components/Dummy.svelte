<script lang="ts">
  export let name: string;
  export let close;
</script>

<view>
  <text>Dummy!! {name}</text>
  <button on:clicked={close}>Close</button>
</view>
