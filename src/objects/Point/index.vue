<template>
    <div
            class="point"
            :class="{
      'red': colorForPoint === 'red',
      'yellow': colorForPoint === 'yellow',
      'green': colorForPoint === 'green',
      'active': checkActivePoint,
      'white': blinkingOn
    }"
    ></div>
</template>

<script>
    import {signalsInformation} from "@/values";
    import {eventEmitter} from "@/main";

    export default {
        name: "Point",
        props: {
            colorNumber: {
                type: Number,
                required: true
            },
            colorValue: {
                type: String,
                required: true
            },
        },
        data() {
            return {
                routeColor: this.$router.currentRoute.params["color"],
                blinkingTimerInstance: null,
                blinkingOn: false
            };
        },
        methods: {

            getColor(arr, number) {
                let point =  arr.find(value => +value.number === +number);
                return point.color
            },

            getPointByColor(arr, color) {
                return arr.find(value => value.color === color)
            },

            toggle(arr, color) {
                const currentPoint = arr.find(
                    value => value.color === color
                    );
                let pointNum = currentPoint.number;

                let nextPoint = 2;
                if (pointNum === 1) {
                    this.upOrDown = true
                } else if (pointNum === 3) {
                    this.upOrDown = false
                } else if (pointNum === 2) {
                    nextPoint = this.upOrDown ? 3 : 1;
                }

                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(this.getColor(signalsInformation, nextPoint));
                    }, currentPoint.lifeTime * 1000);
                });
            },
            activateBlinkingPoint() {
                this.blinkingTimerInstance = setTimeout(() => {
                    this.blinkingOn = !this.blinkingOn;
                    this.activateBlinkingPoint();
                }, 100);
            }
        },
        watch: {
            $route(toR, fromR) {
                if (this.getPointByColor(signalsInformation, toR.params["color"])) {
                    let toPoint = this.getPointByColor(signalsInformation, toR.params["color"]);

                    this.routeColor = toR.params["color"];

                    this.routeColor === this.colorValue &&
                    eventEmitter.$emit("startShowSignal", toPoint);

                    let prom = this.toggle(signalsInformation, this.routeColor);
                    prom.then(nextSignalColor => {
                        this.blinkingTimerInstance &&
                        (clearTimeout(this.blinkingTimerInstance),
                            (this.blinkingOn = false),
                            (this.blinkingTimerInstance = null));
                        this.$router.push(`/${nextSignalColor}`);
                    })

                } else {
                    this.$router.push("/red");
                }
            }
        },
        computed: {
            checkActivePoint() {
                return this.routeColor === this.colorValue;
            },
            colorForPoint() {
                return this.colorValue;
            }
        },
        mounted() {
            if (this.getPointByColor(signalsInformation, this.routeColor)) {
                this.routeColor === this.colorValue &&
                eventEmitter.$emit("startShowSignal", this.getPointByColor(signalsInformation, this.routeColor));

                let prom = this.toggle(signalsInformation, this.routeColor);
                prom.then(nextSignalColor => {
                    // переход к следующему состоянию
                    this.blinkingTimerInstance &&
                    (clearTimeout(this.blinkingTimerInstance),
                        (this.blinkingOn = false),
                        (this.blinkingTimerInstance = null));

                    this.$router.push(`/${nextSignalColor}`);
                })
            } else {
                this.$router.push("/red");
            }
        },
        created() {
            var toggle = true;
            eventEmitter.$on("startBlinking", activePointNumber => {
                if ( this.getColor(signalsInformation, activePointNumber) === this.colorValue) {
                    this.activateBlinkingPoint();
                }
            });
        }
    };
</script>

<style>
    .point {
        width: 60%;
        height: 150px;
        margin: auto;
        border-radius: 1%;
        border: 1px dot-dash black;
        margin-top: 20px;
    }

    .red {
        background-color: red;
        opacity: 0.2;
    }

    .yellow {
        background-color: yellow;
        opacity: 0.2;
    }

    .green {
        background-color: green;
        opacity: 0.2;
    }


    .active {
        opacity: 1;
    }

    .white {
        background-color: white;
    }
</style>