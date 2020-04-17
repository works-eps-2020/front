<template>
  <q-card v-bind:class="{'my-card col-6': $q.platform.is.desktop}" class="q-pa-sm" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-h5 q-mt-sm q-mb-xs">{{ title }}</div>
          <div class="text-caption text-grey">
            {{ description }}
          </div>
        </q-card-section>

        <q-card-section v-if="$q.platform.is.desktop" class="col-5 flex flex-center">
          <q-img
            class="rounded-borders"
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          />
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat>
          7:30PM
        </q-btn>
        <q-btn flat :color="isReserved ? 'primary' : 'secondary'">
          {{ isReserved ? $t('lessons_unreserve') : $t('lessons_reserve') }}
        </q-btn>
      </q-card-actions>
    </q-card>
</template>

<script>
export default {
  name: 'cardLessons',
  data() {
		return {
			stars: 4
		}
	},
	props: {
		title: String,
		description: String,
		isReserved: {
			type: Boolean,
			default: false
			},
	}
};
</script>

<style lang="sass" scoped>
.my-card
	max-height: 300px
  width: 100%
  max-width: 350px
</style>

