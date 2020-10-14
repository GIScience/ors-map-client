<template>
  <div>
    <v-alert :value="info" outline type="info" style="color:white" >{{ info }}</v-alert>
    <v-card>
      <v-card-title>
        {{$t('orsTable.responseDataInATable')}}
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" :label="$t('orsTable.search')" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :no-data-text="emptyTableMessage" :items="rows" hide-actions class="table-container">
        <template slot="headers" slot-scope="props">
          <tr>
            <th v-for="(column, index) in columns" :key="index" class="column"
              :class="['column', pagination.descending ? 'desc' : 'asc', column === pagination.sortBy ? 'active' : '', isSwitchSourceColumn(index)? 'source-column' : ['sortable desc asc']]"
              @click="changeSort(column)">
              <template v-if="isSwitchSourceColumn(index)">
                <v-select :items="column" class="source-select" v-model="rowValuesSource">
                </v-select>
              </template>
              <template v-else>
                <v-icon small>arrow_upward</v-icon>
                {{column | capitalize}}
              </template>
            </th>
          </tr>
        </template>

        <template slot="items" slot-scope="props">
          <td v-for="(column, index) in columns" :key="index" style="text-align:center">
            <template v-if="typeof props.item[index] === 'object'">
              <v-btn style="text-transform:none" @click="showJsonData(column, props.item[index])" flat color="secondary">{{$t('orsTable.showData')}}</v-btn>
            </template>
            <template v-else>
              {{ props.item[index]}}
            </template>
          </td>
        </template>

        <template slot="no-data">
          <div style="height:0px"></div>
        </template>
      </v-data-table>
      <v-alert :value="rows && rows.length === 0" outline type="info" style="color:white">
        {{$t('orsTable.noDataWithSuchFilter')}}
      </v-alert>
    </v-card>
  </div>
</template>

<script src="./ors-table.js"></script>
<style scoped src="./ors-table.css"></style>
