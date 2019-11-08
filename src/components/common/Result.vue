<template>
	<md-layout>
		<md-card style="width: 100%; height: fit-content;">
			<md-toolbar :md-elevation="1" class="card-header">
				<span class="md-title">Result</span>
                <PulseLoader v-if="flagSpinner" style="display: inline-block;"></PulseLoader>
			</md-toolbar>
            <md-layout md-gutter class="main-box">
                <md-layout md-flex="100">
                    <md-button @click="getResult()" class="md-raised" :md-ripple="true">Get Result</md-button>
                </md-layout>
                <md-layout md-flex="50">
					<md-input-container>
						<label>FinalAccountValue</label>
						<md-input :disabled="true" v-model="FinalAccountValue"></md-input>
					</md-input-container>
				</md-layout>
                <md-layout md-flex="50">
					<md-input-container>
						<label>TotalPercentReturn</label>
						<md-input :disabled="true" v-model="TotalPercentReturn"></md-input>
					</md-input-container>
				</md-layout>
                <md-layout md-flex="50">
					<md-input-container>
						<label>AnnualizedPercentReturn</label>
						<md-input :disabled="true" v-model="AnnualizedPercentReturn"></md-input>
					</md-input-container>
				</md-layout>
                <md-layout md-flex="50">
					<md-input-container>
						<label>MaxStrategyDrawdown</label>
						<md-input :disabled="true" v-model="MaxStrategyDrawdown"></md-input>
					</md-input-container>
				</md-layout>
                <md-layout md-flex="50">
					<md-input-container>
						<label>CalmarRatio</label>
						<md-input :disabled="true" v-model="CalmarRatio"></md-input>
					</md-input-container>
				</md-layout>
                <md-layout md-flex="50">
					<md-input-container>
						<label>CountTrades</label>
						<md-input :disabled="true" v-model="CountTrades "></md-input>
					</md-input-container>
				</md-layout>
                <md-layout md-flex="100">
                    <div class="Monthly">
                        <label>MonthlyPercentReturn</label>
                    </div>
                    <md-table>
                        <md-table-row>
                            <md-table-head md-numeric>ID</md-table-head>
                            <md-table-head>Date/Time</md-table-head>
                            <md-table-head>MonthlyPercentReturn</md-table-head>
                            <md-table-head>CurrentAccountValue</md-table-head>
                        </md-table-row>
                    </md-table>
                    <md-table>
                        <!-- <md-table-row>
                            <md-table-head md-numeric>ID</md-table-head>
                            <md-table-head>Date/Time</md-table-head>
                            <md-table-head>MonthlyPercentReturn</md-table-head>
                            <md-table-head>CurrentAccountValue</md-table-head>
                        </md-table-row> -->
                        <md-table-row v-for="(balance, index) in MonthlyPercentReturn" :key="index">
                            <md-table-head md-numeric>{{index}}</md-table-head>
                            <md-table-cell>{{balance['Date/Time']}}</md-table-cell>
                            <md-table-cell>{{Number(balance['MonthlyPercentReturn']).toFixed(6)}}</md-table-cell>
                            <md-table-cell>{{Number(balance['CurrentAccountValue']).toFixed(6)}}</md-table-cell>
                        </md-table-row> 
                    </md-table>
				</md-layout>
                <md-layout md-flex="100">
                    <div class="Monthly">
                        <label>AccountValue Graph-{{selectedinterval}}</label>
                    </div>
                    <md-layout md-flex="50">
                        <md-select v-model="month" name="movie" id="movie" @change="monthChange">
                            <md-option v-for="role in getMonth" v-bind:key="role" v-bind:value="role">
                                {{role}}
                            </md-option>
                        </md-select>
                    </md-layout>
                    <md-layout md-flex="50">
                        <md-select v-model="year" name="movie" id="movie" @change="yearChange">
                            <md-option v-for="role in getYear" v-bind:key="role" v-bind:value="role">
                                {{role}}
                            </md-option>
                        </md-select>
                    </md-layout>
                    <div v-if="showChart" class="Graph">
                        <CommitChart/>
                    </div>
                </md-layout>
            </md-layout>
        </md-card>
    </md-layout>
</template>

<script>
import ApiService from '@/services/ApiService'
import { PulseLoader } from 'vue-spinner/dist/vue-spinner.min.js'
import CommitChart from '@/components/common/CommitChart'
export default {
    name: 'robot-switch',
    components: {
        'PulseLoader': PulseLoader,
        'CommitChart': CommitChart
    },
    data() {
      return {
        selected: '',
        month: '',
        year: 2006,
        flagSpinner: false,
        FinalAccountValue: 0,
        TotalPercentReturn: 0,
        AnnualizedPercentReturn:0,
        MaxStrategyDrawdown: 0,
        CalmarRatio: 0,
        CountTrades: 0,
        MonthlyPercentReturn: [],
        AccountValue: []
      };
    },
    computed: {
        selectedinterval() {
            return this.selected
        },
        showChart() {
            return true
        },
        getMonth() {
            let Month = []
            for ( let i = 0 ; i < this.MonthlyPercentReturn.length ; i += 1) {
                let n = this.MonthlyPercentReturn[i]['Date/Time'].split(' ')[0].split('/')
                Month.push(n[2] + '-' + n[0])
            }
            return Month
        },
        getYear() {
            let Year = []
            for ( let i = 2006 ; i <= 2020 ; i ++) {
                Year.push(i)
            }
            return Year
        }
    },
    methods: {
        monthChange() {
            this.selected = this.month
            setTimeout(() => {
                ApiService.getAccountValue(this.month).then((resp) => {
                    this.AccountValue = resp.data.data
                    this.$store.commit('updateNativeMax', this.AccountValue);
                })
            },10)
        },
        yearChange() {
            this.selected = this.year
           setTimeout(() => {
                ApiService.getAccountValue(this.year).then((resp) => {
                    this.AccountValue = resp.data.data
                    this.$store.commit('updateNativeMax', this.AccountValue);
                })
            },10) 
        },
        getSpinner() {
            return this.$store.getters.getSpinner;
        },
        getResult() {
            this.flagSpinner = true
            ApiService.getResult().then((resp) => {
                this.flagSpinner = false;
                let data = resp.data.data
                if (data['FinalAccountValue'] !== undefined) 
                    this.FinalAccountValue = data['FinalAccountValue']
                if (data['TotalPerecentReturn'] !== undefined) 
                    this.TotalPercentReturn = data['TotalPerecentReturn']
                if (data['AnnualizedPercentReturn'] !== undefined) 
                    this.AnnualizedPercentReturn = data['AnnualizedPercentReturn']
                if (data['MaxStrategyDrawdown'] !== undefined) 
                    this.MaxStrategyDrawdown = data['MaxStrategyDrawdown']
                if (data['CalmarRatio'] !== undefined) 
                    this.CalmarRatio = data['CalmarRatio']
                if (data['CountTrades'] !== undefined) 
                    this.CountTrades = data['CountTrades']
                if (data['MonthlyPercentReturn'] !== undefined) {
                    this.MonthlyPercentReturn = data['MonthlyPercentReturn']
                    let n = this.MonthlyPercentReturn[0]['Date/Time'].split(' ')[0].split('/')
                    this.month = n[2] + '-' + n[0]
                    this.selected = this.month
                }
            })
        }
    }
}
</script>

<style scoped>
.md-raised {
    width: 100%;
}
.md-input {
    color: black !important;
}
.Monthly {
    display: block;
    width: 100%;
    text-align: center;
    margin: 10px 0px;
}
.md-input-disabled>label{
    color: black !important;
}
.md-table{
    width: 100%;
    max-height: 200px !important;
}
.md-table-row {
    display: flex;
    width: 100%;
    justify-content: space-around;
}
tr {
    border-bottom: solid 1px #dedede;
}
td {
    display: flex;
    align-items: center;
}
canvas {
    width: 100%;
}
.Graph {
    width: 100%
}
.md-select-value{
   text-align: center !important; 
}
.md-menu{
    text-align: center !important; 
}
.md-select {
    text-align: center !important; 
}
</style>