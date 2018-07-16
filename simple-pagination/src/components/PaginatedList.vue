<template>
  <div>
    <table>
      <tr>
        <th>NO</th>
        <th>TEL</th>
        <th>ADDRESS</th>
        <th>NAME</th>
      </tr>
      <tr v-for="p in paginatedData" :key="p.no">
        <td>{{ p.no }}</td>
        <td>{{ p.tel }}</td>
        <td>{{ p.address }}</td>
        <td>{{ p.name }}</td>
      </tr>
      <!-- 처음 10개 출력 -->
    </table>
    <div class="btn-cover">
      <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
        이전
      </button>
      <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
      <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">
        다음
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'paginated-list',
  data () {
    return {
      pageNum: 0
    }
  },
  props: {
    listArray: {
      type: Array,
      required: true // 총 게시물 수
    },
    pageSize: {
      type: Number,
      required: false,
      default: 10 // 한 페이지에 띄워질 게시물 수
    }
  },
  methods: {
    nextPage () {
      this.pageNum += 1;
    },
    prevPage () {
      this.pageNum -= 1;
    }
  },
  computed: {
    pageCount () { // 총 몇 페이지인지
      let listLeng = this.listArray.length, // 100
          listSize = this.pageSize, // 10
          page = Math.floor(listLeng / listSize); // 10페이지

      if (listLeng % listSize > 0) page += 1;

      return page;
    },
    paginatedData () {
      const start = this.pageNum * this.pageSize,
            end = start + this.pageSize;
      // 1 * 10 = 10
      // 10 10 = 20
      return this.listArray.slice(start, end);
      // 20, 29
    }
  }
}
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

table th {
  font-size: 1.2rem;
}

table tr {
  height: 2rem;
  text-align: center;
  border-bottom: 1px solid #505050;
}

table tr:first-of-type {
  border-top: 2px solid #404040;
}

table tr td {
  padding: 1rem 0;
  font-size: 1.1rem;
}

.btn-cover {
  margin-top: 1.5rem;
  text-align: center;
}

.btn-cover .page-btn {
  width: 5rem;
  height: 2rem;
  letter-spacing: 0.5px;
}

.btn-cover .page-count {
  padding: 0 1rem;
}
</style>
