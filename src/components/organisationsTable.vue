<template>
    <q-table
      title="Organizations"
      :data="data"
      :columns="columns"
      row-key="name"
    />
</template>

<script>
export default {
name: 'OrganisationDataTable',
  data() {
    return {
			columns: [
        {
          name: this.$t("name"),
          required: true,
          label: this.$t("name"),
          align: 'left',
        },
        {
					name: this.$t("description"), label: this.$t("description"),
				},
      ]
    }
  }
}
</script>