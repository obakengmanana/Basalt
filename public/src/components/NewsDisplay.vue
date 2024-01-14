<template>
  <div class="news-container">
    <div v-for="(item, index) in googleApiData" :key="index">
      <figure class="snip1216 hover" @click="openPage(item.url)">
        <div class="image">
          <img :src="item.image" alt="Google API Data" />
        </div>
        <figcaption>
          <div class="date">
            <span class="day">{{ getDay(item.date) }}</span>
            <span class="month">{{ getMonth(item.month) }}</span>
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.body }}</p>
        </figcaption>
        <footer>
          <div class="views"><i class="ion-eye"></i>{{ item.views }}</div>
          <div class="love"><i class="ion-heart"></i>{{ item.loves }}</div>
          <div class="comments">
            <i class="ion-chatboxes"></i>{{ item.comments }}
          </div>
        </footer>
        <a href="#"></a>
      </figure>
    </div>
  </div>
</template>

<script>
/// <reference path="../../../jquery.d.ts" />
import $ from "jquery";
import axios from "axios";
import { useDateFormat } from "@vueuse/core";

export default {
  name: "NewsDisplay",
  props: {
    selectedTimezone: String,
  },
  watch: {
  selectedTimezone: {
    immediate: true,
    handler(newTimezone) {
      console.log('Selected timezone changed:', newTimezone);
      this.fetchGoogleApiData(newTimezone);
    },
  },
},

  data() {
    return {
      googleApiData: [],
    };
  },
  mounted() {
    // Owl Carousel initialization code
    $(".hover").mouseleave(function () {
      $(this).removeClass("hover");
    });

    // Fetch Google API data when the component is mounted
    this.fetchGoogleApiData(this.selectedTimezone);
  },
  methods: {
    async fetchGoogleApiData(timezone){
      try {
        // Make a GET request to your server endpoint that handles the Google API data
        const response = await axios.post(`http://localhost:3000/google-api?timezone=${timezone}`);
        this.googleApiData = response.data.news;
        console.log(response.data.news);
      } catch (error) {
        console.error("Error fetching Google API data:", error);
      }
    },
    getDay(date) {
        const formatted = useDateFormat(date, "DD") || "";
        return formatted;
    },
    getMonth(date) {
        const formatted = useDateFormat(date, "MMM") || "";
        return formatted;
    },
    openPage(url) {
      // Open the specified URL in a new tab
      window.open(url, "_blank");
    },
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Raleway:400,600,700);
@import url(https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css);

.news-container {
  display: inline-grid;
  justify-content: space-between;
  margin-top: 20%;
  top: 70%;
}

/* Responsive styles */
@media screen and (max-width: 768px) {
  .news-container {
    margin-top: 35%; 
  }
  figure.snip1216 {
    width: 90%;; 
  }
}

/* Responsive styles */
@media screen and (max-width: 425px) {
  .news-container {
    margin-top: 45%; 
  }
}


figure.snip1216 {
  cursor: pointer;
  font-family: "Raleway", Arial, sans-serif;
  color: #fff;
  position: relative;
  overflow: hidden;
  /* margin: 10px; */
  margin-left: auto;
  margin-right: auto;
  min-width: 220px;
  max-width: 100%;
  width: 50%;
  background-color: #262626;
  color: #ffffff;
  text-align: left;
  font-size: 16px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

@media screen and (max-width: 768px) {
  figure.snip1216 {
    width: 90%;; 
  }
}

@media screen and (max-width: 425px) {
  figure.snip1216 {
    width: 90%;; 
  }
}


figure.snip1216 * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
figure.snip1216 .image {
  overflow: hidden;
}
figure.snip1216 img {
  max-width: 100%;
  width: 100%;
  vertical-align: top;
  position: relative;
}
figure.snip1216 figcaption {
  padding: 25px;
  position: relative;
}
figure.snip1216 .date {
  background-color: #c0392b;
  top: 25px;
  color: #fff;
  left: 25px;
  min-height: 48px;
  min-width: 48px;
  position: absolute;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
}
figure.snip1216 .date span {
  display: block;
  line-height: 24px;
}
figure.snip1216 .date .month {
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.1);
}
figure.snip1216 h3,
figure.snip1216 p {
  margin: 0;
  padding: 0;
}
figure.snip1216 h3 {
  min-height: 50px;
  margin-bottom: 10px;
  margin-left: 60px;
  display: inline-block;
  font-weight: 600;
  text-transform: uppercase;
}
figure.snip1216 p {
  font-size: 0.8em;
  margin-bottom: 20px;
  line-height: 1.6em;
}
figure.snip1216 footer {
  padding: 0 25px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #e6e6e6;
  font-size: 0.8em;
  line-height: 30px;
  text-align: right;
}
figure.snip1216 footer > div {
  display: inline-block;
  margin-left: 10px;
}
figure.snip1216 footer i {
  color: rgba(255, 255, 255, 0.2);
  margin-right: 5px;
}
figure.snip1216 a {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  z-index: 1;
}
figure.snip1216:hover img,
figure.snip1216.hover img {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
