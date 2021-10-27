import { Injectable } from '@angular/core';
import { ApiService } from './api.service'
import { UserService } from './user.service'

import { environment } from '../../_environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TechProfileAPIService {

  constructor(private _apiService: ApiService,
              private _userService: UserService) {

  }

  get(techProfileId) {
    let url = environment.apiUrl + "/api/techprofile/" + techProfileId;

  	let rtn = new Promise(
  		(resolve, reject) => {
  			this._apiService.get(url).subscribe(
  				(data) => { 
  					console.log("getTechProfile API call returned");
  					console.log(data);

  					resolve(data);
  				}, (err) => {
  					reject(err);
  				});
  		});

  	return rtn;
  }

  getScores(userId) {
    console.log("calling to get TechProfile scores for [" + userId + "] ");
  	let url = environment.apiUrl + "/api/user/" + userId + "/techprofile/scores";

  	let rtn = new Promise(
  		(resolve, reject) => {
  			this._apiService.get(url).subscribe(
  				(data) => { 
  					console.log("get TechProfile scores for [" + userId + "] API call returned");
  					console.log(data);

  					resolve(data);
  				}, (err) => {
  					reject(err);
  				});
  		});

  	return rtn;  
  }

  saveScores(userId, scores) {
  	let url = environment.apiUrl + "/api/user/" + userId + "/techprofile/scores";

  	let data = this.JSON_to_URLEncoded(scores);

  	let rtn = new Promise(
  		(resolve, reject) => {
  			this._apiService.post(url, data).subscribe(
  				(data) => { 
  					console.log("POST TechProfile scores for [" + userId + "] API call returned");
  					console.log(data);

  					resolve(data);
  				}, (err) => {
  					reject(err);
  				});
  		});

  	return rtn;  
  }

  addTopic(name) {
  	let url = environment.apiUrl + "/api/techprofile/topics/new"

  	let data = "topicName="+name

  	let rtn = new Promise(
  		(resolve, reject) => {
  			this._apiService.post(url, data).subscribe(
  				(data) => {
  					console.log("POST addTopic [" + name + "] API call returned")
  					console.log(data)

  					resolve(data)
  				}, (err) => {
  					reject(err)
  				});
  		});

  	return rtn;
  }

  addLineItem(topicId, name) {
  	return this.addLineItemWithDescriptions(topicId, name, "level 0 desc", "level 1 desc", "level 2 desc", "level 3 desc");
  }

  addLineItemWithDescriptions(topicId, name, l0description, l1description, l2description, l3description) {
  	let url = environment.apiUrl + "/api/techprofile/topics/" + topicId + "/lineitem/new"

  	let data = "lineItemName="+name
  		+"&l0description="+l0description
  		+"&l1description="+l1description
  		+"&l2description="+l2description
  		+"&l3description="+l3description;

  	let rtn = new Promise(
  		(resolve, reject) => {
  			this._apiService.post(url, data).subscribe(
  				(data) => {
  					console.log("POST addLineItem [" + name + "] API call returned")
  					console.log(data)

  					resolve(data)
  				}, (err) => {
  					reject(err)
  				});
  		});

  	return rtn;
  }

  updateLineItemWithDescriptions(lineItem) {
  	let url = environment.apiUrl + "/api/techprofile/lineitem/" + lineItem["id"];
    let rtn = new Promise((resolve, reject) => { reject("invalid data") });

  	if (lineItem["name"] !== undefined 
        && lineItem["l0Description"] !== undefined
        && lineItem["l1Description"] !== undefined
        && lineItem["l2Description"] !== undefined
        && lineItem["l3Description"] !== undefined) {

        	rtn = new Promise(
        		(resolve, reject) => {
        			this._apiService.postUnsecuredAPI2(url, {lineItem: lineItem}).subscribe(
        				(data) => {
        					console.log("POST updateLineItem [" + lineItem['id'] + "] API call returned")
        					console.log(data)

        					resolve(data)
        				}, (err) => {
        					reject(err)
        				});
        		});
        }

  	return rtn;
  }

  updateTopic(topic) {
    let url = environment.apiUrl + "/api/techprofile/topic/" + topic["id"]
    let rtn = new Promise((resolve, reject) => { reject("invalid data") })

    if (topic['name'] !== undefined) {
      rtn = new Promise(
        (resolve, reject) => {
              this._apiService.postUnsecuredAPI2(url, {topic: topic}).subscribe(
                (data) => {
                  console.log("POST updateTopic [" + topic['id'] + "] API call returned")
                  console.log(data)

                  resolve(data)
                }, (err) => {
                  reject(err)
                });
            });
        }

    return rtn;
  }

  saveSequenceInfo(arr) {
    let url = environment.apiUrl + "/api/techprofile/sequences"
    let rtn = new Promise(
      (resolve, reject) => {
        this._apiService.postUnsecuredAPI2(url, {arr: arr}).subscribe(
          (data) => {
            console.log("POST sequence info API call returned")
            console.log(data)
            resolve(data)
          }, (err) => {
            reject(err);
          }
        )
      }
    )

    return rtn
  }

	JSON_to_URLEncoded(scores){
		var list = '';
	
		var ctr = 0;
		scores.map((score) => {
			list += "userId"+ctr+"="+score.userId;
			list += "&techProfileLineItemId"+ctr+"="+score.techProfileLineItemId;
			list += "&techProfileLineItemScore"+ctr+"="+score.techProfileLineItemScore;

			if (ctr+1 < scores.length)
				list += "&";

			ctr++;
		})

		list += "&count="+ (ctr);

		return list;
	}


}
