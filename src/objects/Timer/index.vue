<template>
    <div class="timer">Время до смены сигнала: {{ timerData }} сек</div>
</template>

<script>
    import { eventEmitter } from "@/main";
    import { blinkingTime } from "@/values";

    export default {
        name: "Timer",
        data() {
            return {
                timerData: "",
                timerInstance: null,
                activePointNumber: null
            };
        },
        methods: {
            decrementTimer(secondsToChange, timerData) {
                this.timerInstance = setTimeout(() => {
                    if (+timerData > 0) {
                        this.timerData--;
                        this.decrementTimer(secondsToChange, this.timerData);
                    }
                    if (timerData === blinkingTime) {
                        eventEmitter.$emit("startBlinking", this.activePointNumber);
                    }
                }, 1000);
            }
        },
        created() {
            eventEmitter.$on(
                "startShowSignal",
                ({ lifeTime: secondsToChange, number }) => {
                    this.timerInstance && clearTimeout(this.timerInstance);
                    this.timerData = secondsToChange;
                    this.activePointNumber = number;
                    this.decrementTimer(secondsToChange, this.timerData);
                }
            );
        }
    };
</script>

<style>
    .timer {
        color: darkslateblue;
        font-size: 24px;
        font-weight: bold;
    }
</style>