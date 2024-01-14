<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    
    <div>
      <!-- Include the Timezone Dropdown component -->
      <TimezoneDropdown @timezone-selected="updateSelectedTimezone" />
    </div>

    <div>
      <!-- Include the updated weather component -->
      <WeatherDisplay
        :selectedTimezone="selectedTimezone"
        @timezone-selected="updateSelectedTimezone"
      />
    </div>

    <div>
      <!-- Include the ClockDisplay component -->
      <ClockDisplay :selectedTimezone="selectedTimezone" />
    </div>

    <div>
      <!-- Include the updated NewsDisplay component -->
      <NewsDisplay
        :selectedTimezone="selectedTimezone"
        @timezone-selected="updateSelectedTimezone"
      />
    </div>
  </div>
  <div id="news"></div>
</template>

<script>
import ClockDisplay from "./components/ClockDisplay.vue";
import TimezoneDropdown from "./components/TimezoneDropdown.vue";
import NewsDisplay from "./components/NewsDisplay.vue";
import WeatherDisplay from "./components/WeatherDisplay.vue";

export default {
  name: "App",
  components: {
    ClockDisplay,
    TimezoneDropdown,
    NewsDisplay,
    WeatherDisplay,
  },
  data() {
    return {
      selectedTimezone: "Africa/Johannesburg", // Set a default timezone
    };
  },
  methods: {
    updateSelectedTimezone(newTimezone) {
      // Update the selectedTimezone when the dropdown value changes
      this.selectedTimezone = newTimezone;
    },
  },
};
</script>

<style>

#news {
  position: absolute;
  display: flex;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100%;
}

html,
body {
  height: 100%;
}

body {
  background: #0f3854;
  background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 70%);
  background-size: 100%;
}

p {
  margin: 0;
  padding: 0;
}
</style>
