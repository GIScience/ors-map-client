
import OrsTableBuilder from './services/table-builder'

export default {
  props: {
    responseData: {
      required: true
    },
    endpoint: {
      required: true,
      type: String
    },
    apiVersion: {
      required: true
    }
  },
  data () {
    return {
      pagination: {
        sortBy: null
      },
      dataLoaded: false,
      tableData: null,
      rowValuesSource: null,
      search: ''
    }
  },
  computed: {
    emptyTableMessage () {
      return this.dataLoaded ? this.$t('orsTable.noDataToList') : this.$t('orsTable.theDataIsBeingLoaded')
    },
    rows () {
      if (this.tableData) {
        let rows
        // The data table rows prop can contains an
        // array, if only one source is available
        // or an object containing multiple props,
        // each one containing an array of rows
        if (Array.isArray(this.tableData.rows)) {
          rows = this.getFilteredRows(this.tableData.rows)
        } else { // if is an object with multiple props containing rows
          // In this case we wil return the prop selected as a source for the row values
          rows = this.getFilteredRows(this.tableData.rows[this.rowValuesSource])
        }
        return rows
      }
    },
    columns () {
      if (this.tableData) {
        return this.tableData.columns
      }
    },
    info () {
      if (this.tableData) {
        return this.tableData.info
      }
    }
  },
  methods: {
    showJsonData (columnName, json) {
      this.infoDialog(columnName, null, { code: json, resizable: true, zIndex: 1001 })
    },
    selectedRowValuesSource (source) {
      this.rowValuesSource = source
    },
    /**
     * Get the rows applying the search filter, if not empty
     *
     * @param {*} rows
     * @returns {Array}
     */
    getFilteredRows (rows) {
      if (this.search === '') {
        return rows
      }
      const context = this
      return this.lodash.filter(rows, function (row) {
        return context.getRowIfMeetsSearchCriteria(row)
      })
    },
    /**
     * Return a row if the row meets the search criteria
     *
     * @param {*} row
     * @returns {Array|null}
     */
    getRowIfMeetsSearchCriteria (row) {
      let found = false
      for (const column of row) {
        // we do not search inside objects
        if (typeof column !== 'object') {
          found = column.toString().includes(this.search)
          if (found) {
            break
          }
        }
      }
      return found ? row : null
    },
    isSwitchSourceColumn (index) {
      return index === 0 && Array.isArray(this.columns[index])
    },
    /**
     * Set the table data builder and build the table
     *
     */
    buildTable () {
      const context = this
      this.setTableBuilder()
      this.tableDataBuilder.buildTableData().then(tableData => {
        context.tableData = tableData
        context.rowValuesSource = this.getInitialRowValuesSource(tableData)
        context.dataLoaded = true
      })
    },

    /**
     * get the initial row value source, if the rows are available in multiple sources
     *
     * @param {*} tableData
     * @returns {String}
     */
    getInitialRowValuesSource (tableData) {
      if (tableData.columns && Array.isArray(tableData.columns[0])) {
        const index = tableData.columns[0].indexOf(tableData.initialRowValuesSource)
        return tableData.columns[0][index]
      }
    },

    /**
     * Set the table data builder
     *
     */
    setTableBuilder () {
      if (!this.tableDataBuilder) {
        const data = { endpoint: this.endpoint, responseData: this.responseData, translations: this.$t('orsTable'), apiVersion: this.apiVersion }
        this.tableDataBuilder = new OrsTableBuilder(data)
      }
    },
    /**
     * Change/apply a sort strategy
     *
     * @param {*} column
     */
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
      const columnIndex = this.columns.indexOf(column)
      if (Array.isArray(this.tableData.rows)) {
        this.tableData.rows = this.lodash.orderBy(this.tableData.rows, columnIndex, ['desc'])
      } else {
        this.tableData.rows[this.rowValuesSource] = this.lodash.orderBy(this.tableData.rows[this.rowValuesSource], columnIndex, ['desc'])
      }
    }
  },
  created () {
    this.buildTable()
  },
  watch: {
    responseData: {
      handler: function () {
        this.buildTable()
      },
      deep: true
    }
  }
}
