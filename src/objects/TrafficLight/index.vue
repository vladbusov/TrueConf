<template>
    <div class="traffic-light">
        <h2>Светофор</h2>
        <Timer/>
        <Point v-for="value in signalsInformation" :key="value.number" :colorValue="value.color" :colorNumber="value.number"/>
    </div>
</template>



<script>
    import Point from "@/objects/Point";
    import Timer from "@/objects/Timer";
    import { signalsInformation } from "@/values";

    export default {
        name: "TrafficLight",
        data() {
            return {
                signalsInformation
            };
        },
        components: { Point, Timer }
    };
</script>

<style>
    .traffic-light {
        display: flex;
        flex-direction: column;
        text-align: center;
    }
</style>