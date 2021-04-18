<template>
    <div>hello world{{getrouters}}</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters(["getrouters"])
    }
};
</script>

<style></style>
