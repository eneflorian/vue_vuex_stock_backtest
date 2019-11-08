<template>
	<md-layout>
		<md-card style="width: 100%; height: fit-content;">
			<md-toolbar :md-elevation="1" class="card-header">
				<span class="md-title">Optimization</span>
			</md-toolbar>
            <md-layout md-gutter class="main-box">
                <md-layout md-flex="100">
                    <md-button v-bind:disabled="getDiable()" @click="getResult()" class="md-raised" :md-ripple="true">Run Optimization Algorithm!</md-button>
                </md-layout>
                <md-layout md-flex="50">
                    <md-input-container class="md-input-focused">
                        <label>OptimizePrecision</label>
                        <md-input v-model="OptimizePrecision"></md-input>
                    </md-input-container>
                </md-layout>
                <md-layout md-flex="50">
                    <md-input-container class="md-input-focused">
                        <label>MaxIterations</label>
                        <md-input v-model="MaxIterations"></md-input>
                    </md-input-container>
                </md-layout>
                 <md-layout md-flex="100">
                    <div>
                        <md-radio @change="RadioOptionChange('Calmar')" :mdValue="optimize" value="Calmar">Calmar</md-radio>
                        <md-radio @change="RadioOptionChange('AccountValue')" :mdValue="optimize" value="AccountValue" class="md-primary">AccountValue</md-radio>
                    </div>
                </md-layout>
                <md-layout md-flex="20">
                    <md-input-container>
                        <label>InitialAccountValue</label>
                        <md-input :disabled="true"  v-model="InitialAccountValue"></md-input>
                    </md-input-container>
                </md-layout>
                <md-layout md-flex="20">
                    <md-input-container>
                        <label>Slippage</label>
                        <md-input  :disabled="true" v-model="Slippage"></md-input>
                    </md-input-container>
                </md-layout>
                <md-layout md-flex="20">
                    <md-input-container>
                        <label>LongTrailingLookBack</label>
                        <md-input  :disabled="true" v-model="LongTrailingLookBack"></md-input>
                    </md-input-container>
                </md-layout>
                <md-layout md-flex="20">
                    <md-input-container>
                        <label>TimeInterval</label>
                        <md-input  :disabled="true" v-model="TimeInterval"></md-input>
                    </md-input-container>
                </md-layout>
                <md-layout md-flex="20">
                    <md-input-container>
                        <label>LongExitRatioDown</label>
                        <md-input  :disabled="true" v-model="LongExitRatioDown"></md-input>
                    </md-input-container>
                </md-layout>
                <md-layout md-flex="100">
                    <div class="Monthly">
                        <label>Optimization Values</label>
                    </div>
                    <md-table>
                        <md-table-row>
                            <md-table-cell class="width">Name</md-table-cell>
                            <md-table-cell class="width">Min</md-table-cell>
                            <md-table-cell class="width">Value</md-table-cell>
                            <md-table-cell class="width">Max</md-table-cell>
                            <md-table-cell class="width">Interval</md-table-cell>
                            <md-table-cell class="width">Allowed</md-table-cell>
                        </md-table-row>
                        <md-table-row>
                            <md-table-cell class="width">MaxMargin</md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="getMaxMargin[0]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width bold">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="getMaxMargin[1]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="getMaxMargin[2]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="getMaxMargin[3]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                                <md-checkbox v-model="getMaxMargin[4]" @change="ChangeCheckBox('MaxMargin')"></md-checkbox>
                            </md-table-cell>
                        </md-table-row>
                        <md-table-row>
                            <md-table-cell class="width">MinMargin</md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="MinMargin[0]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width bold">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="MinMargin[1]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="MinMargin[2]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="MinMargin[3]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                               <md-checkbox v-model="MinMargin[4]" @change="ChangeCheckBox('MinMargin')"></md-checkbox>
                            </md-table-cell>
                        </md-table-row>
                        <md-table-row>
                            <md-table-cell class="width">MaxRatio</md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="MaxRatio[0]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width bold">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="MaxRatio[1]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="MaxRatio[2]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="MaxRatio[3]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                               <md-checkbox v-model="MaxRatio[4]" @change="ChangeCheckBox('MaxRatio')"></md-checkbox>
                            </md-table-cell>
                        </md-table-row>
                        <md-table-row>
                            <md-table-cell class="width">MinRatio</md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="MinRatio[0]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width bold">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="MinRatio[1]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="MinRatio[2]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="MinRatio[3]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                               <md-checkbox v-model="MinRatio[4]" @change="ChangeCheckBox('MinRatio')"></md-checkbox>
                            </md-table-cell>
                        </md-table-row>
                        <md-table-row>
                            <md-table-cell class="width">EnterRatio</md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="EnterRatio[0]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width bold">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="EnterRatio[1]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="EnterRatio[2]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="EnterRatio[3]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                               <md-checkbox v-model="EnterRatio[4]" @change="ChangeCheckBox('EnterRatio')"></md-checkbox>
                            </md-table-cell>
                        </md-table-row>
                        <md-table-row>
                            <md-table-cell class="width">DeltaLimitPercent</md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="DeltaLimitPercent[0]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width bold">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="DeltaLimitPercent[1]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="DeltaLimitPercent[2]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="DeltaLimitPercent[3]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                               <md-checkbox v-model="DeltaLimitPercent[4]" @change="ChangeCheckBox('DeltaLimitPercent')"></md-checkbox>
                            </md-table-cell>
                        </md-table-row>
                        <md-table-row>
                            <md-table-cell class="width">LongRatio</md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="LongRatio[0]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width bold">
                                 <md-input-container class="md-input-focused">
                                    <md-input v-model="LongRatio[1]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                                 <md-input-container class="md-input-focused">
                                    <md-input v-model="LongRatio[2]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                                 <md-input-container class="md-input-focused">
                                    <md-input v-model="LongRatio[3]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                               <md-checkbox v-model="LongRatio[4]" @change="ChangeCheckBox('LongRatio')"></md-checkbox>
                            </md-table-cell>
                        </md-table-row>
                        <md-table-row>
                            <md-table-cell class="width">LongMargin</md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="LongMargin[0]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width bold">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="LongMargin[1]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="LongMargin[2]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="LongMargin[3]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                               <md-checkbox v-model="LongMargin[4]" @change="ChangeCheckBox('LongMargin')"></md-checkbox>
                            </md-table-cell>
                        </md-table-row>
                        <md-table-row>
                            <md-table-cell class="width">LongExitRatio</md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="LongExitRatio[0]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width bold">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="LongExitRatio[1]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="LongExitRatio[2]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="LongExitRatio[3]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                               <md-checkbox v-model="LongExitRatio[4]" @change="ChangeCheckBox('LongExitRatio')"></md-checkbox>
                            </md-table-cell>
                        </md-table-row>
                        <md-table-row>
                            <md-table-cell class="width">LongTrailingStopRatio</md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="LongTrailingStopRatio[0]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width bold">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="LongTrailingStopRatio[1]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="LongTrailingStopRatio[2]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="LongTrailingStopRatio[3]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                               <md-checkbox v-model="LongTrailingStopRatio[4]" @change="ChangeCheckBox('LongTrailingStopRatio')"></md-checkbox>
                            </md-table-cell>
                        </md-table-row>
                        <md-table-row>
                            <md-table-cell class="width">LongEnterRatio</md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="LongEnterRatio[0]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width bold">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="LongEnterRatio[1]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="LongEnterRatio[2]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                                <md-input-container class="md-input-focused">
                                    <md-input v-model="LongEnterRatio[3]"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell class="width">
                               <md-checkbox v-model="LongEnterRatio[4]" @change="ChangeCheckBox('LongEnterRatio')"></md-checkbox>
                            </md-table-cell>
                        </md-table-row>
                    </md-table>
                </md-layout>
            </md-layout>
        </md-card>
    </md-layout>
</template>

<script>
import ApiService from '@/services/ApiService'
import EventBus from '@/components/common/event-bus'
import { PulseLoader } from 'vue-spinner/dist/vue-spinner.min.js'
export default {
    name: 'robot-switch',
    components: {
        'PulseLoader': PulseLoader
    },
    data() {
        return {
            optimize: 'Calmar',
            RunFlag: true,
            OptimizePrecision: 0.05,
            MaxIterations: 1000,
            OptimizeGoalValue: 0,
            MaxMargin:  [0.5, 1, 1.0, 0.05, false],
            MinMargin:  [0.5, 1, 1.0, 0.05, false],
            MaxRatio:   [0.93, 0.961, 0.97, 0.01, false],
            MinRatio:   [0.85, 0.889, 0.93, 0.01, false],
            EnterRatio: [0.92, 0.941, 0.97, 0.01, false],
            DeltaLimitPercent: [0.04, 0.08, 0.20, 0.025, false],
            LongRatio:  [0.95, 1.2, 1.5, 0.01, false],
            LongMargin: [0.5, 1, 1.0, 0.01, false],
            LongExitRatio: [1.0, 1.3, 1.7, 0.025, false],
            LongTrailingStopRatio: [0.01, 0.7, 0.20, 0.025, false],
            LongEnterRatio: [0.95, 1.0, 1, 0.01, false],
            InitialAccountValue: '_',
            Slippage: '_',
            TimeInterval: '_',
            LongTrailingLookBack: '_',
            LongExitRatioDown: '_',
        };
    },
    computed: {
        getMaxMargin() {
            return this.MaxMargin
        }
    },
    methods: {
        RadioOptionChange(value) {
            this.optimize = value
        },
        getResult() {
            let data = [
                this.InitialAccountValue, this.Slippage, this.TimeInterval,
                this.LongTrailingLookBack, this.OptimizePrecision, this.MaxIterations,
				this.MaxMargin,
				this.MinMargin,
				this.MaxRatio,
				this.MinRatio,
				this.EnterRatio,
				this.DeltaLimitPercent,
				this.LongRatio,
				this.LongMargin,
				this.LongExitRatio,
				this.LongTrailingStopRatio,
                this.LongEnterRatio,
                this.optimize,
                this.LongExitRatioDown
            ];
            ApiService.RunOptimizationAlgorithm(data)
            .then((res) => {

            }).catch((error) => {

            })
        },
        getDiable() {
            return this.RunFlag
        },
        ChangeCheckBox(Index) {
        },
        Getting_Optimization_Data(data) {
            this.RunFlag = false
            this.MaxMargin[1] = data[0],
            this.MinMargin[1] = data[1],
            this.MaxRatio[1] = data[2],
            this.MinRatio[1] = data[3],
            this.EnterRatio[1] = data[4],
            this.DeltaLimitPercent[1] = data[5],
            this.LongRatio[1] = data[6],
            this.LongMargin[1] = data[7],
            this.LongExitRatio[1] = data[8],
            this.LongTrailingStopRatio[1] = data[9],
            this.InitialAccountValue = data[10],
            this.Slippage = data[11],
            this.TimeInterval = data[12],
            this.LongTrailingLookBack = data[13],
            this.LongEnterRatio[1] = data[14],
            this.LongExitRatioDown = data[15]
        }
    },
    mounted() {
        var _self = this
        EventBus.$on('Sending_Optimization_Data', function(data) {
            _self.Getting_Optimization_Data(data)
        });
    }
}
</script>

<style scoped>
.md-raised {
    width: 100%;
}
.bold {
    font-weight: 800;
}
.width {
    width:16.66667%;
    text-align: left;
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
.md-input-focused:after {
    background-color:#c3c3c3 !important;
}
.md-input-disabled>label{
    color: black !important;
}
.md-table{
    width: 100%;
    /* max-height: 200px !important; */
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
