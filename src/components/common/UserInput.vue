<template>
	<md-layout>
		<md-card style="width: 100%; height: fit-content;">
			<md-toolbar :md-elevation="1" class="card-header">
				<span class="md-title">User Input</span>
			</md-toolbar>
			<md-layout md-gutter class="main-box">
				<md-layout md-flex="50">
					<md-input-container>
						<label>MaxMargin</label>
						<md-input v-model="MaxMargin"></md-input>
					</md-input-container>
				</md-layout>
				<md-layout md-flex="50">
					<md-input-container>
						<label>MinMargin</label>
						<md-input v-model="MinMargin"></md-input>
					</md-input-container>
				</md-layout>
				<md-layout md-flex="50">
					<md-input-container>
						<label>MaxRatio</label>
						<md-input v-model="MaxRatio"></md-input>
					</md-input-container>
				</md-layout>
				<md-layout md-flex="50">
					<md-input-container>
						<label>MinRatio</label>
						<md-input v-model="MinRatio"></md-input>
					</md-input-container>
				</md-layout>
				<md-layout md-flex="50">
					<md-input-container>
						<label>EnterRatio</label>
						<md-input v-model="EnterRatio"></md-input>
					</md-input-container>
				</md-layout>
				<md-layout md-flex="50">
					<md-input-container>
						<label>DeltaLimitPercent</label>
						<md-input v-model="DeltaLimitPercent"></md-input>
					</md-input-container>
				</md-layout>
				<md-layout md-flex="50">
					<md-input-container>
						<label>LongRatio</label>
						<md-input v-model="LongRatio"></md-input>
					</md-input-container>
				</md-layout>
				<md-layout md-flex="50">
					<md-input-container>
						<label>LongMargin</label>
						<md-input v-model="LongMargin"></md-input>
					</md-input-container>
				</md-layout>
				<md-layout md-flex="50">
					<md-input-container>
						<label>LongExitRatio</label>
						<md-input v-model="LongExitRatio"></md-input>
					</md-input-container>
				</md-layout>
				<md-layout md-flex="50">
					<md-input-container>
						<label>LongTrailingStopRatio</label>
						<md-input v-model="LongTrailingStopRatio"></md-input>
					</md-input-container>
				</md-layout>
				<md-layout md-flex="50">
					<md-input-container>
						<label>InitialAccountValue</label>
						<md-input v-model="InitialAccountValue"></md-input>
					</md-input-container>
				</md-layout>
				<md-layout md-flex="50">
					<md-input-container>
						<label>Slippage(%)</label>
						<md-input v-model="Slippage"></md-input>
					</md-input-container>
				</md-layout>
				<md-layout md-flex="50">
					<md-input-container>
						<label>TimeInterval</label>
						<md-input v-model="TimeInterval" @change="TimeIntervalChange"></md-input>
					</md-input-container>
				</md-layout>
				<md-layout md-flex="50">
					<md-input-container>
						<label>LongTrailingLookBack</label>
						<md-input v-model="LongTrailingLookBack" @change="LongTrailingLookBackChange"></md-input>
					</md-input-container>
				</md-layout>
				<md-layout md-flex="50">
					<md-input-container>
						<label>LongEnterRatio</label>
						<md-input v-model="LongEnterRatio"></md-input>
					</md-input-container>
				</md-layout>
				<md-layout md-flex="50">
					<md-input-container>
						<label>LongExitRatioDown</label>
						<md-input v-model="LongExitRatioDown"></md-input>
					</md-input-container>
				</md-layout>
				<md-layout md-flex="100">
					<md-button v-bind:class="getClass()" v-bind:disabled="getDiable()" @click="startBackTesting" :md-ripple="true">BackTesting</md-button>
					<md-button v-bind:disabled="getDiableOptimization()" class="md-raised" @click="sendDataToOptimization" :md-ripple="true">Send Data To Optimization<br>After Made WorkingRsult.csv</md-button>
				</md-layout>
				<md-layout md-flex="100">
					<div v-bind:class="getStatusClass()">Back testing started...Please see server console.</div>
				</md-layout>
			</md-layout>
		</md-card>
	</md-layout>
</template>

<script>
import ApiService from '@/services/ApiService'
import EventBus from '@/components/common/event-bus'
export default {
  	data() {
		return {
			optimization: false,
			started: false,
			MaxMargin: 1,
			MinMargin: 1,
			MaxRatio: 0.963,
			MinRatio: 0.889,
			EnterRatio: 0.941,
			DeltaLimitPercent: 0.08,
			LongRatio: 1.02,
			LongMargin: 1,
			LongExitRatio: 1.2,
			LongTrailingStopRatio: 0.15,
			InitialAccountValue: 2500000,
			Slippage: 0.002,
			TimeInterval: 120,
			LongTrailingLookBack: 12000,
			LongEnterRatio: 0.963,
			LongExitRatioDown: 0.97
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		getDiableOptimization() {
			return this.optimization
		},
		sendDataToOptimization() {
			this.optimization = true
			let data = [
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
				this.InitialAccountValue,
				this.Slippage,
				this.TimeInterval,
				this.LongTrailingLookBack,
				this.LongEnterRatio,
				this.LongExitRatioDown
			];
			console.log(data)
			EventBus.$emit('Sending_Optimization_Data', data);
		},
		init() {
			this.$store.commit('updateNativeBalance', this.TimeInterval);
			this.$store.commit('setIndexnumber', this.LongTrailingLookBack)
		},
		LongTrailingLookBackChange() {
			setTimeout(() => {
				this.$store.commit('setIndexnumber', this.LongTrailingLookBack);
			},50)
		},
		TimeIntervalChange() {
			setTimeout(() => {
				this.$store.commit('updateNativeBalance', this.TimeInterval);
			},50)
		},
		getStatusClass() {
			return this.started === true ? 'success' : 'hidden'
		},
		getClass() {
			return this.started === true ?  'md-raised success':'md-raised'
		},
		getDiable() {
			return this.started
		},
		startBackTesting() {
			this.started = true
			let data = {
				MaxMargin: this.MaxMargin,
				MinMargin: this.MinMargin,
				MaxRatio: this.MaxRatio,
				MinRatio: this.MinRatio,
				EnterRatio: this.EnterRatio,
				DeltaLimitPercent: this.DeltaLimitPercent,
				LongRatio: this.LongRatio,
				LongMargin: this.LongMargin,
				LongExitRatio: this.LongExitRatio,
				LongTrailingStopRatio: this.LongTrailingStopRatio,
				InitialAccountValue: this.InitialAccountValue,
				Slippage: this.Slippage,
				TimeInterval: this.TimeInterval,
				LongTrailingLookBack: this.LongTrailingLookBack,
				LongEnterRatio: this.LongEnterRatio,
				LongExitRatioDown: this.LongExitRatioDown
			}
			ApiService.BackTesting(data).then((resp) => {
				if(resp.data.success === 0) {
					this.$store.commit('updateSnackmsg', resp.data.error);
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
.success {
  color: #2196f3 !important;
}
.hidden {
	display: none;
}
</style>
