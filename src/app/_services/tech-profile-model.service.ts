import { Injectable } from '@angular/core';

import { TechProfileAPIService } from './tech-profile-api.service';
import { SequenceService } from './sequence.service';

@Injectable({
  providedIn: 'root'
})
export class TechProfileModelService {

	techProfile = undefined;
	questionCountsPerCell = undefined;

	constructor(protected _techProfileAPI: TechProfileAPIService,
				protected _sequenceService: SequenceService	) { }


	_init(force?: boolean) {
		let self = this;

		if (force || self.techProfile === undefined) {
			self.techProfile = null;
			self.questionCountsPerCell = null;

			self._techProfileAPI.get(1).then((tp) => {
				self.techProfile = tp;
			})
		}
	}

	waitingPromise() {
		let self = this;
		return new Promise((resolve, reject) => {

			function to() {
				setTimeout(() => {
					if (self.isTechProfileAvailable())
						resolve(1);
					else
						to();
				}, 600);
			}

			to();
		})
	}

	isTechProfileAvailable() {
		return this.techProfile && this.techProfile != null
	}

	setTechProfile(techProfile) {
		this.techProfile = techProfile;
	}

	getTechProfile() {
		return this.techProfile;
	}

	getTechProfileTopics() {
		return this.techProfile["topics"].sort((a, b) => { return a["sequence"] - b["sequence"]; });
	}

	getTechProfileTopicById(topicId) {
		return this.techProfile["topics"].find((t) => { return t['id'] === topicId });
	}

	isTopicAbleToMoveUp(id) {
		let topic = this.techProfile && this.techProfile["topics"].find((t) => { return t['id'] === id });

		if (topic)
			return this._sequenceService.isAbleToMove(this.techProfile["topics"], topic, -1);

		return false;
	}

	isTopicAbleToMoveDown(id) {
		let topic = this.techProfile && this.techProfile["topics"].find((t) => { return t['id'] === id });

		if (topic)
			return this._sequenceService.isAbleToMove(this.techProfile["topics"], topic, 1);

		return false;
	}

	moveSequenceForTechProfileTopic(topicId, direcionPlusOrMinus) {
		let topic = this.techProfile && this.techProfile["topics"].find((t) => { return t['id'] === topicId });

		if (topic)
			return this._sequenceService.moveSequenceByOne(this.techProfile["topics"], topic, direcionPlusOrMinus);
		else
			console.error("Topic with ID " + topicId + " not found. Nothing to move.");
	}

	isLineItemAbleToMoveUp(topicId, id) {
		let topic = this.techProfile && this.techProfile["topics"].find((t) => { return t['id'] === topicId });

		let lineItem = topic && topic["lineItems"] && topic["lineItems"].find((li) => { return li['id'] === id });

		if (lineItem)
			return this._sequenceService.isAbleToMove(topic["lineItems"], lineItem, -1);

		return false;
	}

	isLineItemAbleToMoveDown(topicId, id) {
		let topic = this.techProfile && this.techProfile["topics"].find((t) => { return t['id'] === topicId });

		let lineItem = topic && topic["lineItems"] && topic["lineItems"].find((li) => { return li['id'] === id });

		if (lineItem) 
			return this._sequenceService.isAbleToMove(topic["lineItems"], lineItem, 1)

		return false;
	}

	moveSequenceForTechProfileLineItem(topicId, lineItemId, direcionPlusOrMinus) {
		let topic = this.techProfile && this.techProfile["topics"].find((t) => { return t['id'] === topicId });
		let lineItem = topic && topic["lineItems"].find((li) => { return li['id'] === lineItemId });

		if (lineItem)
			return this._sequenceService.moveSequenceByOne(topic["lineItems"], lineItem, direcionPlusOrMinus);
		else
			console.error("LineItem with ID " + lineItemId + " not found. Nothing to move.");
	}

	saveSequenceInfo() {
		return new Promise((resolve, reject) => {
			let arr1 = [];

			this.techProfile['topics'].forEach((topic) => {
				let arr = [];

				topic['lineItems'].forEach((lineItem) => {
					let row = []
					row.push(1) // techProfileId
					row.push(topic['id'])
					row.push(topic['sequence'])

					row.push(lineItem['id'])
					row.push(lineItem['sequence'])

					arr.push(row);
				})

				arr1.push(arr);
			})

			console.log("saveSequenceInfo")
			console.log(arr1)

			this._techProfileAPI.saveSequenceInfo(arr1).then((data) => {
				resolve(data);
			}, (err) => {
				reject(err);
			})
		})
	}

	getTechProfileLineItemsByTopic(topicId) {
		let rtn = undefined;
		let topic = this.techProfile && this.techProfile["topics"].find((t) => { return t["id"] === topicId; });

		if (topic) {
			rtn = topic["lineItems"].sort((a, b) => { return a["sequence"] - b["sequence"]; });
		}

		return rtn;
	}

	getTechProfileLineItemById(id) {
		let rtn = undefined;

		for (var x=0; this.techProfile && !rtn && x < this.techProfile["topics"].length; x++) {
			rtn = this.techProfile["topics"][x]["lineItems"].find((li) => { return li["id"] === id; });
		}

		return rtn;
	}

	updateTechProfileTopic(topic) {
		let self = this;
		if (topic.id !== -1) {
			return self._techProfileAPI.updateTopic(topic).then(() => self._init(true));
		} else {
			console.error("A topic with no backend id was passed to updateTechProfileTopic.");
		}
	}

	updateTechProfileLineItem(lineItem) {
		let self = this;
		if (lineItem.id !== -1) {
			return self._techProfileAPI.updateLineItemWithDescriptions(lineItem).then(() => self._init(true));
		} else {
			console.error("A lineItem with no backend id was passed to updateTechProfileLineItem.");
		}
	}

	addTopic(name) {
		let self = this;
		self._techProfileAPI.addTopic(name).then(() => {
			self._init(true);
		})
	}

	addLineItem(parentTopicId, lineItemName) {
		let self = this;
		self._techProfileAPI.addLineItem(parentTopicId, lineItemName).then(() => {
			self._init(true);
		})
	}

}
