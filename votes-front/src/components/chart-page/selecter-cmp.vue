<script>
import {filterDescritionList} from '../../services/data-service'
import vSelect from "vue-select";


export default {
  components: { vSelect },
  beforeMount(){
this.options = filterDescritionList.map(key=>({label:this.$t(key), key}))
this.value = this.options[0]
  },
  data() {
    return {
      value: null,
      options:  [],
    };
  },
  watch:{
    value(){
      this.$emit('select', this.value.key)
    }
  }
};
</script>

<template>
 <v-select
     v-model="value" :options="options"
    />
</template>
