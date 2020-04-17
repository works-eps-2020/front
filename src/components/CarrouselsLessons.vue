<template>
	<div id="q-app">
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

					infinite
					height="300px"
					class="bg-grey-1 shadow-2 rounded-borders"
				>
					<q-carousel-slide :name="i" v-for="i in 4" :key="i" class="column no-wrap">
						<div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
							<card-lessons v-for="i in 2" :key="i"/>
						</div>
					</q-carousel-slide>
				</q-carousel>
			</div>
	</div>
</template>

<script>
import CardLessons from '@/components/cardLessons'
export default {
	name: 'CarrouselsLessons',
	components: {
		CardLessons
	},
  data () {
    return {
			slide: 1,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  }
}
</script>