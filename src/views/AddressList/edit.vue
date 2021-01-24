<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>
<script lang="ts">
import { ref } from 'vue';
import { Toast } from 'vant';

export default {
  setup() {
    const searchResult = ref([]);
    const areaList = ref([])
    const onSave = () => {
      Toast('save');
    };
    const onDelete = () => {
      Toast('delete');
    };
    const onChangeDetail = (val: any) => {
      if (val) {
        searchResult.value = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        searchResult.value = []
      }
    }
    return {
      onSave,
      onDelete,
      areaList,
      searchResult,
      onChangeDetail,
    };
  }
}
</script>
