<template>
  <div id="clock">
    <div>
      <p class="time">{{ time }}</p>
      <p class="date">{{ date }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedTimezone: String, // Receive the selected timezone as a prop
  },
  data() {
    return {
      time: "",
      date: "",
    };
  },
  mounted() {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
  },
  watch: {
    // Watch for changes in the selectedTimezone prop
    selectedTimezone: "updateTime",
  },
  methods: {
    updateTime() {
      var cd = new Date();
      var options = {
        timeZone: this.selectedTimezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "short",
      };

      var localTime = cd.toLocaleString("en-US", options);
      this.time = localTime.slice(-11, -6) + " " + localTime.slice(-5);
      this.date = localTime.slice(0, -13);
    },
  },
};
</script>

<style scoped>
#clock {
  font-family: "Share Tech Mono", monospace;
  color: #ffffff;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 60%;
  transform: translate(-50%, -50%);
  color: #daf6ff;
  text-shadow: 0 0 20px rgba(10, 175, 230, 1), 0 0 20px rgba(10, 175, 230, 0);


}

/* Responsive styles */
@media screen and (max-width: 1024px) {
  #clock {
   width: 100%; 
   top: 65%;
  }
}

.time {
  letter-spacing: 0.05em;
  font-size: 80px;
  padding: 5px 0;
}

/* Responsive styles */
@media screen and (max-width: 425px) {
  .time {
    font-size: 40px;
  }
}

.date {
  letter-spacing: 0.1em;
  font-size: 24px;
}
</style>
