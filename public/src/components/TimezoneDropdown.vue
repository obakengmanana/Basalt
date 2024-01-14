<template>
  <div id="tz">
    <select
      id="dropdown"
      class="round"
      v-model="selectedTimezone"
      @change="updateTimezone"
    >
      <option value="" disabled>Select an option</option>
      <option
        v-for="timezone in timezones"
        :key="timezone._id"
        :value="timezone.timezone"
      >
        {{ timezone.timezone }}
      </option>
    </select>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TimezoneDropdown",
  data() {
    return {
      timezones: [],
      selectedTimezone: "Africa/Johannesburg", // Set default selected timezone
    };
  },
  mounted() {
    this.getTimezones();
    console.log("Vue app mounted successfully!");
  },
  methods: {
    async getTimezones() {
      try {
        const response = await axios.get("http://localhost:3000/api/timezones");
        this.timezones = response.data;
        console.log(response.data);
        // Emit an event to inform other components about the selected timezone
        this.$emit("timezone-selected", this.selectedTimezone);
      } catch (error) {
        console.error(error);
      }
    },
    updateTimezone() {
      // Emit an event to inform other components about the selected timezone
      this.$emit("timezone-selected", this.selectedTimezone);
    },
  },
};
</script>

<style>
/* Responsive styles */
@media screen and (max-width: 1024px) {
  #tz {
    margin-top: 0%;
  }
}

@media screen and (min-width: 1440px) {
  #tz {
    margin-top: 0%;
  }
}

@media screen and (min-width: 1600px) {
  #tz {
    margin-top: 4%;
  }
}

body {
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  text-rendering: optimizelegibility;
  -moz-osx-font-smoothing: grayscale;
  -moz-text-size-adjust: none;
}

h1,
.muted {
  color: #2c3e5099;
}

h1 {
  font-size: 26px;
  font-weight: 600;
}

#timezone {
  max-width: 30em;
  margin: 1em auto;
}

/* select dropdown */
select {
  /* styling */
  background-color: white;
  border: thin solid blue;
  border-radius: 4px;
  display: inline-block;
  font: inherit;
  line-height: 1.5em;
  padding: 0.5em 3.5em 0.5em 1em;

  /* reset */

  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
}

select.round {
  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    radial-gradient(#ddd 70%, transparent 72%);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 0.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1.5em 1.5em;
  background-repeat: no-repeat;
}

select.round:focus {
  background-image: linear-gradient(45deg, white 50%, transparent 50%),
    linear-gradient(135deg, transparent 50%, white 50%),
    radial-gradient(gray 70%, transparent 72%);
  background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em,
    calc(100% - 0.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1.5em 1.5em;
  background-repeat: no-repeat;
  border-color: green;
  outline: 0;
}

select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #000;
}

h1 {
  color: white;
  line-height: 120%;
  margin: 0 auto 2rem auto;
  max-width: 30rem;
}
</style>
