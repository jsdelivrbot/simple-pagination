<template>
  <section>
    <h1>Make yourself some Punk Beers </h1>
    <div v-if="beers.length === 0" class="loading">Loading...</div>
    <div v-for="(beer, index) in beers" class="beer-contain" :key="index">
      <div class="beer-img"> <img :src="beer.img" height="350" /> </div>
      <div class="beer-info">
        <h2>{{ beer.name }}</h2>
        <p class="bright">{{ beer.tagline }}</p>
        <p><span class="bright">Description:</span> {{ beer.desc }}</p>
        <p><span class="bright">Tips:</span> {{ beer.tips }}</p>
        <h3 class="bright">Food Pairings</h3>
        <ul>
          <li v-for="(item, index) in beer.food" :key="index"> {{ item }} </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  name: 'infinite-scroll',
  data () {
    return {
      bottom: false,
      beers: []
    }
  },
  methods: {
    bottomVisible () {
      const scrollY = window.scrollY,
            visible = document.documentElement.clientHeight,
            pageHeight = document.documentElement.scrollHeight,
            bottomOfPage = visible + scrollY >= pageHeight;
      
      return bottomOfPage || pageHeight < visible;
    },

    addBear () {
      axios.get('https://api.punkapi.com/v2/beers/random')
      .then(response => {
        let api = response.data[0];
        let apiInfo = {
          name: api.name,
          desc: api.description,
          img: api.image_url,
          tips: api.brewers_url,
          tagline: api.tagline,
          food: api.food_pairing
        };

        this.beers.push(apiInfo);
        if (this.bottomVisible()) this.addBear();
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  watch: {
    bottom (val) {
      console.log(val);
      if (val) this.addBear();
    }
  },
  created () {
    window.onscroll = _.throttle(() => {
      this.bottom = this.bottomVisible();
    }, 100);

    this.addBear();
  }
}
</script>

<style scoped>

</style>
