<template>
    <div id="weather">
      <div>
        <p class="temperature">{{ temperature }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'WeatherDisplay',
    props: {
      selectedTimezone: String,
    },
    watch: {
      selectedTimezone(newTimezone) {
        console.log('Selected timezone changed:', newTimezone);
        this.fetchWeatherData(newTimezone);
      },
    },
    data() {
      return {
        temperature: 'Temperature: Loading...', // Initial loading state
      };
    },
    mounted() {
      // Fetch current weather data when the component is mounted
      this.fetchWeatherData(this.selectedTimezone);
    },
    methods: {
      async fetchWeatherData(timezone) {
        try {
          const response = await axios.get(`http://localhost:3000/current-weather?timezone=${timezone}`);
          this.temperature = `Temperature: ${response.data.current.temperature} C`;
        } catch (error) {
          console.error(error);
          this.temperature = 'Temperature: Error fetching data';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  #weather {
    font-family: 'Share Tech Mono', monospace;
    color: #ffffff;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 51%;
    transform: translate(-50%, -50%);
    color: #daf6ff;
    text-shadow: 0 0 20px rgba(10, 175, 230, 1), 0 0 20px rgba(10, 175, 230, 0);
  }
  
  .temperature {
    letter-spacing: 0.05em;
    font-size: 24px;
    padding: 5px 0;
  }
  
  .date {
    letter-spacing: 0.1em;
    font-size: 24px;
  }
  </style>
  