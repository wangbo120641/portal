import API from '../../../rest-api/restApi';

export default {
  name: 'data-directory-card',
  data() {
    return {
      sourceDirctory: [],
      // childTab: '',

      paging: {
        currentPage: 1,
        pageSize: 10,
        currentPages: [10],
        total: 0,
        tableParams: {
          'page': 1,
          'pageSize': 10,
          'dir': 'asc',
          'field': 'id',
          'type': '1'
        }
      }
    };
  },
  methods: {
    getSourceDirectory(param) {
      let that = this,
        params = param || this.paging.tableParams;

      that.$http({
        method: 'post',
        'url': API.COLLECT_INFO + '?' + this.$qs.stringify(params),
        data: JSON.stringify({type: '1'})
      }).then(res => {
        that.sourceDirctory = res.data.data.data;
        that.paging.total = res.data.data.total;
      }).catch(res => {
        console.log(res);
      });
    },
    handleSizeChange(val) {
      this.paging.pageSize = val;
      this.paging.tableParams.pageSize = val;
      this.paging.currentPage = 1;
      this.getSourceDirectory({
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    handleCurrentChange(val) {
      this.paging.currentPage = val;
      this.paging.tableParams.page = val;
      this.getSourceDirectory({
        'page': val
      });
    },
    // 取消目录收藏
    cancelCollection(item) {
      let that = this;

      that.$confirm('您确认要取消收藏吗？', '提示', {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        type: 'warning'
      }).then(res => {
        that.$http({
          method: 'post',
          url: '/se/collection',
          data: JSON.stringify({id: item.id, status: '0', collectType: '1'})
        }).then(res => {
          that.$notify({
            type: 'success',
            message: res.data.message,
            offset: 120
          });
          this.getSourceDirectory(this.paging.tableParams);
        });
      });
    },
    skipInterfaceDetail(item) {
      this.$router.push({
        name: 'catalogDetail',
        params: {id: item.id}
      });
    }
  },
  mounted() {
    this.getSourceDirectory(this.paging.tableParams);
  }

};
