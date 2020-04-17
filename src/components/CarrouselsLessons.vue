<template>
    <div class="q-pa-md">
      <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        control-color="primary"
        navigation
        padding
        arrows
				autoplay
        infinite
        :height="$q.platform.is.mobile ? 'auto' : '300px'"
        class="bg-grey-1 shadow-2 rounded-borders"
      >
        <q-carousel-slide :name="index" v-for="(items,index) in defLengthCarrousel()" :key="index" class="column no-wrap">
          <div
            class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
          >
            <card-lessons v-for="(topic,i) in items" :key="i" title="Title" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum" />
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
</template>

<script>
import CardLessons from "@/components/cardLessons";
import { Topic } from '@/types/topic'
export default {
  name: "CarrouselsLessons",
  components: {
    CardLessons
  },
  data() {
    return {
			slide: 1,
    };
	},
	props: {
		topics: Array,
	},
	methods: {
		defLengthCarrousel: function () {
			if(this.$q.platform.is.mobile) {
				return this.topics.map(topic => [topic])
			} else {
				const R = [];
				for (let i=0,len=this.topics.length; i<len; i+=2)
					R.push(this.topics.slice(i,i+2));
				console.log(R)
				return R;
			}
		}
	},
};
</script>