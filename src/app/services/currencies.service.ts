import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currencies, Price } from '../interfaces/data.types';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  base_url: string = "https://raw.githubusercontent.com/";
  constructor(private http: HttpClient) {
    
  }

  getAllCurrencies () {
    const url = "https://call2.tgju.org/ajax.json";
    return this.http.get<Currencies>(url).pipe(retry({ count: Infinity }))
  }

  //#region Currencies
  //#region Main currencies
  getDollarRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_dollar_rl/latest.json";
    return this.http.get<Price>(url)
  }

  getDollarRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_dollar_rl/history.json";
    return this.http.get<Price[]>(url)
  }





  getEuroRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_eur/latest.json";
    return this.http.get<Price>(url)
  }

  getEuroRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_eur/history.json";
    return this.http.get<Price[]>(url)
  }





  getAedRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_aed/latest.json";
    return this.http.get<Price>(url)
  }

  getAedRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_aed/history.json";
    return this.http.get<Price[]>(url)
  }




  
  getGbpRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_gbp/latest.json";
    return this.http.get<Price>(url)
  }

  getGbpRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_gbp/history.json";
    return this.http.get<Price[]>(url)
  }

  


  
  getTryRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_try/latest.json";
    return this.http.get<Price>(url)
  }

  getTryRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_try/history.json";
    return this.http.get<Price[]>(url)
  }

  
  


  
  getChfRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_chf/latest.json";
    return this.http.get<Price>(url)
  }

  getChfRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_chf/history.json";
    return this.http.get<Price[]>(url)
  }

  
  
  


  
  getCnyRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_cny/latest.json";
    return this.http.get<Price>(url)
  }

  getCnyRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_cny/history.json";
    return this.http.get<Price[]>(url)
  }

  
  
  


  
  getJpyRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_jpy/latest.json";
    return this.http.get<Price>(url)
  }

  getJpyRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_jpy/history.json";
    return this.http.get<Price[]>(url)
  }
  

  
  
  


  
  getKrwRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_krw/latest.json";
    return this.http.get<Price>(url)
  }

  getKrwRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_krw/history.json";
    return this.http.get<Price[]>(url)
  }
  

  
  
  



  
  getCadRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_cad/latest.json";
    return this.http.get<Price>(url)
  }

  getCadRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_cad/history.json";
    return this.http.get<Price[]>(url)
  }
  
  

  
  
  



  
  getAudRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_aud/latest.json";
    return this.http.get<Price>(url)
  }

  getAudRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_aud/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getNzdRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_nzd/latest.json";
    return this.http.get<Price>(url)
  }

  getNzdRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_nzd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getSgdRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_sgd/latest.json";
    return this.http.get<Price>(url)
  }

  getSgdRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_sgd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getInrRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_inr/latest.json";
    return this.http.get<Price>(url)
  }

  getInrRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_inr/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getPkrRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_pkr/latest.json";
    return this.http.get<Price>(url)
  }

  getPkrRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_pkr/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getIqdRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_iqd/latest.json";
    return this.http.get<Price>(url)
  }

  getIqdRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_iqd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getSypRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_syp/latest.json";
    return this.http.get<Price>(url)
  }

  getSypRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_syp/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getAfnRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_afn/latest.json";
    return this.http.get<Price>(url)
  }

  getAfnRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_afn/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getDkkRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_dkk/latest.json";
    return this.http.get<Price>(url)
  }

  getDkkRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_dkk/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getSekRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_sek/latest.json";
    return this.http.get<Price>(url)
  }

  getSekRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_sek/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getNokRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_nok/latest.json";
    return this.http.get<Price>(url)
  }

  getNokRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_nok/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getSarRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_sar/latest.json";
    return this.http.get<Price>(url)
  }

  getSarRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_sar/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getQarRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_qar/latest.json";
    return this.http.get<Price>(url)
  }

  getQarRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_qar/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getOmrRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_omr/latest.json";
    return this.http.get<Price>(url)
  }

  getOmrRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_omr/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getKwdRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_kwd/latest.json";
    return this.http.get<Price>(url)
  }

  getKwdRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_kwd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getBhdRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_bhd/latest.json";
    return this.http.get<Price>(url)
  }

  getBhdRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_bhd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getMyrRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_myr/latest.json";
    return this.http.get<Price>(url)
  }

  getMyrRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_myr/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getThbRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_thb/latest.json";
    return this.http.get<Price>(url)
  }

  getThbRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_thb/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getHkdRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_hkd/latest.json";
    return this.http.get<Price>(url)
  }

  getHkdRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_hkd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getRubRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_rub/latest.json";
    return this.http.get<Price>(url)
  }

  getRubRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_rub/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getAznRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_azn/latest.json";
    return this.http.get<Price>(url)
  }

  getAznRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_azn/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getAmdRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_amd/latest.json";
    return this.http.get<Price>(url)
  }

  getAmdRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_amd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGelRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_gel/latest.json";
    return this.http.get<Price>(url)
  }

  getGelRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_gel/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getKgsRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_kgs/latest.json";
    return this.http.get<Price>(url)
  }

  getKgsRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_kgs/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getTjsRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_tjs/latest.json";
    return this.http.get<Price>(url)
  }

  getTjsRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_tjs/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getTmtRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_tmt/latest.json";
    return this.http.get<Price>(url)
  }

  getTmtRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_tmt/history.json";
    return this.http.get<Price[]>(url)
  }
  //#endregion

  //#region Other Currencies
  getAllRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_all/latest.json";
    return this.http.get<Price>(url)
  }

  getAllRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_all/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getBbdRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_bbd/latest.json";
    return this.http.get<Price>(url)
  }

  getBbdRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_bbd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getBdtRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_bdt/latest.json";
    return this.http.get<Price>(url)
  }

  getBdtRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_bdt/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getBgnRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_bgn/latest.json";
    return this.http.get<Price>(url)
  }

  getBgnRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_bgn/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getBifRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_bif/latest.json";
    return this.http.get<Price>(url)
  }

  getBifRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_bif/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getBndRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_bnd/latest.json";
    return this.http.get<Price>(url)
  }

  getBndRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_bnd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getBsdRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_bsd/latest.json";
    return this.http.get<Price>(url)
  }

  getBsdRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_bsd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getBwpRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_bwp/latest.json";
    return this.http.get<Price>(url)
  }

  getBwpRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_bwp/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getBynRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_byn/latest.json";
    return this.http.get<Price>(url)
  }

  getBynRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_byn/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getBzdRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_bzd/latest.json";
    return this.http.get<Price>(url)
  }

  getBzdRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_bzd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCupRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_cup/latest.json";
    return this.http.get<Price>(url)
  }

  getCupRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_cup/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCzkRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_czk/latest.json";
    return this.http.get<Price>(url)
  }

  getCzkRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_czk/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getDjfRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_djf/latest.json";
    return this.http.get<Price>(url)
  }

  getDjfRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_djf/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getDopRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_dop/latest.json";
    return this.http.get<Price>(url)
  }

  getDopRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_dop/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getDzdRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_dzd/latest.json";
    return this.http.get<Price>(url)
  }

  getDzdRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_dzd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getEtbRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_etb/latest.json";
    return this.http.get<Price>(url)
  }

  getEtbRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_etb/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGnfRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_gnf/latest.json";
    return this.http.get<Price>(url)
  }

  getGnfRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_gnf/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGtqRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_gtq/latest.json";
    return this.http.get<Price>(url)
  }

  getGtqRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_gtq/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGydRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_gyd/latest.json";
    return this.http.get<Price>(url)
  }

  getGydRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_gyd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getHnlRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_hnl/latest.json";
    return this.http.get<Price>(url)
  }

  getHnlRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_hnl/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getHrkRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_hrk/latest.json";
    return this.http.get<Price>(url)
  }

  getHrkRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_hrk/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getHtgRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_htg/latest.json";
    return this.http.get<Price>(url)
  }

  getHtgRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_htg/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getIskRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_isk/latest.json";
    return this.http.get<Price>(url)
  }

  getIskRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_isk/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getJmdRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_jmd/latest.json";
    return this.http.get<Price>(url)
  }

  getJmdRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_jmd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getKesRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_kes/latest.json";
    return this.http.get<Price>(url)
  }

  getKesRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_kes/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getKhrRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_khr/latest.json";
    return this.http.get<Price>(url)
  }

  getKhrRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_khr/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getKmfRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_kmf/latest.json";
    return this.http.get<Price>(url)
  }

  getKmfRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_kmf/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getKztRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_kzt/latest.json";
    return this.http.get<Price>(url)
  }

  getKztRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_kzt/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getLakRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_lak/latest.json";
    return this.http.get<Price>(url)
  }

  getLakRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_lak/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getLbpRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_lbp/latest.json";
    return this.http.get<Price>(url)
  }

  getLbpRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_lbp/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getLkrRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_lkr/latest.json";
    return this.http.get<Price>(url)
  }

  getLkrRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_lkr/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getLrdRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_lrd/latest.json";
    return this.http.get<Price>(url)
  }

  getLrdRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_lrd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getLslRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_lsl/latest.json";
    return this.http.get<Price>(url)
  }

  getLslRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_lsl/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getLydRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_lyd/latest.json";
    return this.http.get<Price>(url)
  }

  getLydRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_lyd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getMadRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_mad/latest.json";
    return this.http.get<Price>(url)
  }

  getMadRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_mad/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getMdlRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_mdl/latest.json";
    return this.http.get<Price>(url)
  }

  getMdlRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_mdl/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getMgaRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_mga/latest.json";
    return this.http.get<Price>(url)
  }

  getMgaRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_mga/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getMkdRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_mkd/latest.json";
    return this.http.get<Price>(url)
  }

  getMkdRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_mkd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getMmkRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_mmk/latest.json";
    return this.http.get<Price>(url)
  }

  getMmkRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_mmk/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getMopRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_mop/latest.json";
    return this.http.get<Price>(url)
  }

  getMopRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_mop/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getMurRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_mur/latest.json";
    return this.http.get<Price>(url)
  }

  getMurRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_mur/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getMvrRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_mvr/latest.json";
    return this.http.get<Price>(url)
  }

  getMvrRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_mvr/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getMwkRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_mwk/latest.json";
    return this.http.get<Price>(url)
  }

  getMwkRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_mwk/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getMznRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_mzn/latest.json";
    return this.http.get<Price>(url)
  }

  getMznRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_mzn/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getNadRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_nad/latest.json";
    return this.http.get<Price>(url)
  }

  getNadRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_nad/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getNgnRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_ngn/latest.json";
    return this.http.get<Price>(url)
  }

  getNgnRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_ngn/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getNprRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_npr/latest.json";
    return this.http.get<Price>(url)
  }

  getNprRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_npr/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getPabRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_pab/latest.json";
    return this.http.get<Price>(url)
  }

  getPabRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_pab/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getPgkRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_pgk/latest.json";
    return this.http.get<Price>(url)
  }

  getPgkRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_pgk/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getPhpRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_php/latest.json";
    return this.http.get<Price>(url)
  }

  getPhpRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_php/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getRonRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_ron/latest.json";
    return this.http.get<Price>(url)
  }

  getRonRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_ron/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getRsdRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_rsd/latest.json";
    return this.http.get<Price>(url)
  }

  getRsdRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_rsd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getRwfRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_rwf/latest.json";
    return this.http.get<Price>(url)
  }

  getRwfRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_rwf/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getScrRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_scr/latest.json";
    return this.http.get<Price>(url)
  }

  getScrRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_scr/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getSdgRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_sdg/latest.json";
    return this.http.get<Price>(url)
  }

  getSdgRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_sdg/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getShpRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_shp/latest.json";
    return this.http.get<Price>(url)
  }

  getShpRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_shp/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getSosRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_sos/latest.json";
    return this.http.get<Price>(url)
  }

  getSosRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_sos/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getSvcRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_svc/latest.json";
    return this.http.get<Price>(url)
  }

  getSvcRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_svc/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getSzlRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_szl/latest.json";
    return this.http.get<Price>(url)
  }

  getSzlRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_szl/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getTndRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_tnd/latest.json";
    return this.http.get<Price>(url)
  }

  getTndRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_tnd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getTtdRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_ttd/latest.json";
    return this.http.get<Price>(url)
  }

  getTtdRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_ttd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getTzsRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_tzs/latest.json";
    return this.http.get<Price>(url)
  }

  getTzsRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_tzs/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getUgxRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_ugx/latest.json";
    return this.http.get<Price>(url)
  }

  getUgxRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_ugx/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getYerRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_yer/latest.json";
    return this.http.get<Price>(url)
  }

  getYerRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_yer/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getZmwRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_zmw/latest.json";
    return this.http.get<Price>(url)
  }

  getZmwRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_zmw/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGhsRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_ghs/latest.json";
    return this.http.get<Price>(url)
  }

  getGhsRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_ghs/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getPenRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_pen/latest.json";
    return this.http.get<Price>(url)
  }

  getPenRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_pen/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getClpRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_clp/latest.json";
    return this.http.get<Price>(url)
  }

  getClpRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_clp/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getEgpRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_egp/latest.json";
    return this.http.get<Price>(url)
  }

  getEgpRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_egp/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getMxnRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_mxn/latest.json";
    return this.http.get<Price>(url)
  }

  getMxnRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_mxn/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getJodRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_jod/latest.json";
    return this.http.get<Price>(url)
  }

  getJodRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_jod/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getBrlRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_brl/latest.json";
    return this.http.get<Price>(url)
  }

  getBrlRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_brl/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getUyuRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_uyu/latest.json";
    return this.http.get<Price>(url)
  }

  getUyuRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_uyu/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCopRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_cop/latest.json";
    return this.http.get<Price>(url)
  }

  getCopRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_cop/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getPlnRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_pln/latest.json";
    return this.http.get<Price>(url)
  }

  getPlnRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_pln/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getArsRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_ars/latest.json";
    return this.http.get<Price>(url)
  }

  getArsRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_ars/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getKydRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_kyd/latest.json";
    return this.http.get<Price>(url)
  }

  getKydRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_kyd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getHufRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_huf/latest.json";
    return this.http.get<Price>(url)
  }

  getHufRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_huf/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getPygRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_pyg/latest.json";
    return this.http.get<Price>(url)
  }

  getPygRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_pyg/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getUahRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_uah/latest.json";
    return this.http.get<Price>(url)
  }

  getUahRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_uah/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getZarRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_zar/latest.json";
    return this.http.get<Price>(url)
  }

  getZarRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_zar/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getNioRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_nio/latest.json";
    return this.http.get<Price>(url)
  }

  getNioRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_nio/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getFjdRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_fjd/latest.json";
    return this.http.get<Price>(url)
  }

  getFjdRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_fjd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getTwdRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_twd/latest.json";
    return this.http.get<Price>(url)
  }

  getTwdRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_twd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getUzsRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_uzs/latest.json";
    return this.http.get<Price>(url)
  }

  getUzsRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_uzs/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getIdrRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_idr/latest.json";
    return this.http.get<Price>(url)
  }

  getIdrRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_idr/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getXofRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_xof/latest.json";
    return this.http.get<Price>(url)
  }

  getXofRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_xof/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getXpfRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_xpf/latest.json";
    return this.http.get<Price>(url)
  }

  getXpfRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_xpf/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getVndRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_vnd/latest.json";
    return this.http.get<Price>(url)
  }

  getVndRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_vnd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGmdRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_gmd/latest.json";
    return this.http.get<Price>(url)
  }

  getGmdRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_gmd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getXafRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_xaf/latest.json";
    return this.http.get<Price>(url)
  }

  getXafRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_xaf/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getVuvRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_vuv/latest.json";
    return this.http.get<Price>(url)
  }

  getVuvRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_vuv/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getMroRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_mro/latest.json";
    return this.http.get<Price>(url)
  }

  getMroRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_mro/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getAngRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_ang/latest.json";
    return this.http.get<Price>(url)
  }

  getAngRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_ang/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getStdRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_std/latest.json";
    return this.http.get<Price>(url)
  }

  getStdRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_std/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getXcdRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_xcd/latest.json";
    return this.http.get<Price>(url)
  }

  getXcdRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_xcd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getBamRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_bam/latest.json";
    return this.http.get<Price>(url)
  }

  getBamRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_bam/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getBtnRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_btn/latest.json";
    return this.http.get<Price>(url)
  }

  getBtnRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_btn/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCdfRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_cdf/latest.json";
    return this.http.get<Price>(url)
  }

  getCdfRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_cdf/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCrcRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_crc/latest.json";
    return this.http.get<Price>(url)
  }

  getCrcRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_crc/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCveRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_cve/latest.json";
    return this.http.get<Price>(url)
  }

  getCveRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_cve/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getBmdRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_bmd/latest.json";
    return this.http.get<Price>(url)
  }

  getBmdRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_bmd/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getAwgRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_awg/latest.json";
    return this.http.get<Price>(url)
  }

  getAwgRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_awg/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getSllRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_sll/latest.json";
    return this.http.get<Price>(url)
  }

  getSllRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_sll/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getVefRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_vef/latest.json";
    return this.http.get<Price>(url)
  }

  getVefRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_vef/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCypRlPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_cyp/latest.json";
    return this.http.get<Price>(url)
  }

  getCypRlHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/price_cyp/history.json";
    return this.http.get<Price[]>(url)
  }

  //#endregion

  //#endregion


  //#region Crypto
  getCryptoBtcPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-bitcoin/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoBtcHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-bitcoin/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoEthPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-ethereum/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoEthHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-ethereum/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoTetherPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-tether/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoTetherHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-tether/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoRipplePriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-ripple/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoRippleHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-ripple/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoBinanceCoinPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-binance-coin/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoBinanceCoinHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-binance-coin/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoSolanaPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-solana/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoSolanaHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-solana/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoDogecoinPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-dogecoin/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoDogecoinHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-dogecoin/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoUSDCoinPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-usd-coin/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoUSDCoinHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-usd-coin/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoCardanoPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-cardano/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoCardanoHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-cardano/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoTronPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-tron/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoTronHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-tron/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoAvalanchePriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-avalanche/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoAvalancheHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-avalanche/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoShibaInuPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-shiba-inu/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoShibaInuHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-shiba-inu/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoPolkadotPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-polkadot/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoPolkadotHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-polkadot/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoBchPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-bitcoin-cash/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoBchHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-bitcoin-cash/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoUniPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-uniswap/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoUniHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-uniswap/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoLtcPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-litecoin/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoLtcHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-litecoin/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoFilPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-filecoin/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoFilHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-filecoin/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoAtomPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-cosmos/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoAtomHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-cosmos/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoClassicEthPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-ethereum-classic/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoClassicEthHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-ethereum-classic/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoStellarPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-stellar/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoStellarHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-stellar/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoFantomPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-fantom/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoFantomHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-fantom/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoElrondPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-elrond/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoElrondHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-elrond/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoMakerPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-maker/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoMakerHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-maker/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoEOSPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-eos/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoEOSHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-eos/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoBittorrentPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-bittorrent/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoBittorrentHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-bittorrent/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoFlowPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-flow/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoFlowHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-flow/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoGalaPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-gala/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoGalaHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-gala/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoSandboxPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-sandbox/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoSandboxHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-sandbox/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoPancakeSwapPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-pancakeswap/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoPancakeSwapHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-pancakeswap/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoDashPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-dash/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoDashHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-dash/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoMoneroPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-monero/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoMoneroHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-monero/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoChainlinkPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-chainlink/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoChainlinkHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-chainlink/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoCashaaPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-cashaa/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoCashaaHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-cashaa/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoTezosPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-tezos/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoTezosHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-tezos/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoLoopringPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-loopring-irc/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoLoopringHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-loopring-irc/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoDecredPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-decred/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoDecredHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-decred/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoWavesPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-waves/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoWavesHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-waves/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoZcashPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-zcash/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoZcashHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-zcash/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoNEMPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-nem/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoNEMHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-nem/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCryptoNeoPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-neo/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoNeoHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/crypto-neo/history.json";
    return this.http.get<Price[]>(url)
  }

  //#endregion


  //#region Gold
  getGeram18PriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/geram18/latest.json";
    return this.http.get<Price>(url)
  }

  getGeram18HistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/geram18/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGold740kPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gold_740k/latest.json";
    return this.http.get<Price>(url)
  }

  getGold740kHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gold_740k/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGeram24PriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/geram24/latest.json";
    return this.http.get<Price>(url)
  }

  getGeram24HistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/geram24/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGoldMiniSizePriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gold_mini_size/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldMiniSizeHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gold_mini_size/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getSilver925PriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/silver_925/latest.json";
    return this.http.get<Price>(url)
  }

  getSilver925HistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/silver_925/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getSilver999PriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/silver_999/latest.json";
    return this.http.get<Price>(url)
  }

  getSilver999HistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/silver_999/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getMesghalPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/mesghal/latest.json";
    return this.http.get<Price>(url)
  }

  getMesghalHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/mesghal/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGold17PriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gold_17/latest.json";
    return this.http.get<Price>(url)
  }

  getGold17HistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gold_17/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGold17TransferPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gold_17_transfer/latest.json";
    return this.http.get<Price>(url)
  }

  getGold17TransferHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gold_17_transfer/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGold17CoinPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gold_17_coin/latest.json";
    return this.http.get<Price>(url)
  }

  getGold17CoinHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gold_17_coin/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGoldFuturesPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gold_futures/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldFuturesHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gold_futures/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGoldMeltedWholesalePriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gold_melted_wholesale/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldMeltedWholesaleHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gold_melted_wholesale/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGoldMeltedUnderKiloPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gold_world_futures/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldMeltedUnderKiloHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gold_world_futures/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGoldGc3PriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc3/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc3HistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc3/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGoldGc1PriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc1/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc1HistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc1/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGoldGc11PriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc11/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc11HistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc11/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGoldGc10PriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc10/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc10HistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc10/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  
  
  



  
  getGoldGc22PriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc22/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc22HistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc22/history.json";
    return this.http.get<Price[]>(url)
  }
  

  
  
  



  
  getGoldGc21PriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc21/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc21HistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc21/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGoldGc20PriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc20/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc20HistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc20/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGoldGc12PriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc12/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc12HistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc12/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGoldGc34PriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc34/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc34HistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc34/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGoldGc35PriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc35/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc35HistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc35/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGoldGc36PriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc36/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc36HistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc36/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGoldGc37PriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc37/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc37HistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc37/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGoldGc38PriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc38/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc38HistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc38/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGoldGc39PriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc39/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc39HistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc39/history.json";
    return this.http.get<Price[]>(url)
  }

  



  
  getGoldGc67PriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc67/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc67HistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc67/history.json";
    return this.http.get<Price[]>(url)
  }

  //#endregion


  //#region Coin
  getImamiCoinPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/sekee/latest.json";
    return this.http.get<Price>(url)
  }

  getImamiCoinHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/sekee/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getBaharCoinPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/sekeb/latest.json";
    return this.http.get<Price>(url)
  }

  getBaharCoinHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/sekeb/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getHalfCoinPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/nim/latest.json";
    return this.http.get<Price>(url)
  }

  getHalfCoinHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/nim/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getQuarterCoinPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/rob/latest.json";
    return this.http.get<Price>(url)
  }

  getQuarterCoinHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/rob/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGramCoinPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gerami/latest.json";
    return this.http.get<Price>(url)
  }

  getGramCoinHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gerami/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getRetailImamiCoinPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/retail_sekee/latest.json";
    return this.http.get<Price>(url)
  }

  getRetailImamiCoinHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/retail_sekee/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getRetailBaharCoinPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/retail_sekeb/latest.json";
    return this.http.get<Price>(url)
  }

  getRetailBaharCoinHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/retail_sekeb/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getRetailHalfCoinPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/retail_nim/latest.json";
    return this.http.get<Price>(url)
  }

  getRetailHalfCoinHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/retail_nim/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getRetailQuarterCoinPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/retail_rob/latest.json";
    return this.http.get<Price>(url)
  }

  getRetailQuarterCoinHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/retail_rob/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getRetailGramCoinPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/retail_gerami/latest.json";
    return this.http.get<Price>(url)
  }

  getRetailGramCoinHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/retail_gerami/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGc19CoinPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc19/latest.json";
    return this.http.get<Price>(url)
  }

  getGc19CoinHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc19/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGc14CoinPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc14/latest.json";
    return this.http.get<Price>(url)
  }

  getGc14CoinHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc14/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGc15CoinPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc15/latest.json";
    return this.http.get<Price>(url)
  }

  getGc15CoinHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc15/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGc18CoinPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc18/latest.json";
    return this.http.get<Price>(url)
  }

  getGc18CoinHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc18/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGc17CoinPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc17/latest.json";
    return this.http.get<Price>(url)
  }

  getGc17CoinHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc17/history.json";
    return this.http.get<Price[]>(url)
  }







  
  getGc16CoinPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc16/latest.json";
    return this.http.get<Price>(url)
  }

  getGc16CoinHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gc16/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getSekeeDownCoinPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/sekee_down/latest.json";
    return this.http.get<Price>(url)
  }

  getSekeeDownCoinHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/sekee_down/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getNimDownCoinPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/nim_down/latest.json";
    return this.http.get<Price>(url)
  }

  getNimDownCoinHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/nim_down/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getRobDownCoinPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/rob_down/latest.json";
    return this.http.get<Price>(url)
  }

  getRobDownCoinHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/rob_down/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCoinBlubberPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/coin_blubber/latest.json";
    return this.http.get<Price>(url)
  }

  getCoinBlubberHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/coin_blubber/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getBaharCoinBlubberPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/sekeb_blubber/latest.json";
    return this.http.get<Price>(url)
  }

  getBaharCoinBlubberHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/sekeb_blubber/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getHalfCoinBlubberPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/nim_blubber/latest.json";
    return this.http.get<Price>(url)
  }

  getHalfCoinBlubberHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/nim_blubber/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getQuarterCoinBlubberPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/rob_blubber/latest.json";
    return this.http.get<Price>(url)
  }

  getQuarterCoinBlubberHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/rob_blubber/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getTrueValueOfCoinPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/sekee_real/latest.json";
    return this.http.get<Price>(url)
  }

  getTrueValueOfCoinHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/sekee_real/history.json";
    return this.http.get<Price[]>(url)
  }

  //#endregion

  //#region World Markets
  getEurUsdAskPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/eur-usd-ask/latest.json";
    return this.http.get<Price>(url)
  }

  getEurUsdAskHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/eur-usd-ask/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGbpUsdAskPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gbp-usd-ask/latest.json";
    return this.http.get<Price>(url)
  }

  getGbpUsdAskHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/gbp-usd-ask/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getUsdJpyAskPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/usd-jpy-ask/latest.json";
    return this.http.get<Price>(url)
  }

  getUsdJpyAskHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/usd-jpy-ask/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getUsdChfAskPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/usd-chf-ask/latest.json";
    return this.http.get<Price>(url)
  }

  getUsdChfAskHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/usd-chf-ask/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getAudUsdAskPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/aud-usd-ask/latest.json";
    return this.http.get<Price>(url)
  }

  getAudUsdAskHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/aud-usd-ask/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getUsdCadAskPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/usd-cad-ask/latest.json";
    return this.http.get<Price>(url)
  }

  getUsdCadAskHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/usd-cad-ask/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getUsdNzdAskPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/usd-nzd-ask/latest.json";
    return this.http.get<Price>(url)
  }

  getUsdNzdAskHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/usd-nzd-ask/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getUsdTryAskPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/usd-try-ask/latest.json";
    return this.http.get<Price>(url)
  }

  getUsdTryAskHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/usd-try-ask/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getUsdSekAskPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/usd-sek-ask/latest.json";
    return this.http.get<Price>(url)
  }

  getUsdSekAskHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/usd-sek-ask/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getUsdSarAskPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/usd-sar-ask/latest.json";
    return this.http.get<Price>(url)
  }

  getUsdSarAskHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/usd-sar-ask/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getUsdKrwAskPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/usd-krw-ask/latest.json";
    return this.http.get<Price>(url)
  }

  getUsdKrwAskHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/usd-krw-ask/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getUsdCnyAskPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/usd-cny-ask/latest.json";
    return this.http.get<Price>(url)
  }

  getUsdCnyAskHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/usd-cny-ask/history.json";
    return this.http.get<Price[]>(url)
  }

  //#endregion


  //#region Precious Metals
  getGlobalGoldOnsPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/ons/latest.json";
    return this.http.get<Price>(url)
  }

  getGlobalGoldOnsHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/ons/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGlobalSilverOnsPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/silver/latest.json";
    return this.http.get<Price>(url)
  }

  getGlobalSilverOnsHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/silver/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGlobalPlatinumOnsPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/platinum/latest.json";
    return this.http.get<Price>(url)
  }

  getGlobalPlatinumOnsHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/platinum/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGlobalPalladiumOnsPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/palladium/latest.json";
    return this.http.get<Price>(url)
  }

  getGlobalPalladiumOnsHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/palladium/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGlobalRatioSilverPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/ratio_silver/latest.json";
    return this.http.get<Price>(url)
  }

  getGlobalRatioSilverHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/ratio_silver/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGlobalRatioPlatinumPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/ratio_platinum/latest.json";
    return this.http.get<Price>(url)
  }

  getGlobalRatioPlatinumHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/ratio_platinum/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGlobalRatioPalladiumPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/ratio_palladium/latest.json";
    return this.http.get<Price>(url)
  }

  getGlobalRatioPalladiumHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/ratio_palladium/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGlobalRatioCrudeoilPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/ratio_crudeoil/latest.json";
    return this.http.get<Price>(url)
  }

  getGlobalRatioCrudeoilHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/ratio_crudeoil/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGlobalRatioDowJonesPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/ratio_dija/latest.json";
    return this.http.get<Price>(url)
  }

  getGlobalRatioDowJonesHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/ratio_dija/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGlobalRatioSP500PriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/ratio_sp500/latest.json";
    return this.http.get<Price>(url)
  }

  getGlobalRatioSP500HistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/ratio_sp500/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getGlobalRatioHUIPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/ratio_hui/latest.json";
    return this.http.get<Price>(url)
  }

  getGlobalRatioHUIHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/ratio_hui/history.json";
    return this.http.get<Price[]>(url)
  }

  //#endregion

  //#region Base Metals
  getBaseGlobalUSCopperPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/base_global_copper2/latest.json";
    return this.http.get<Price>(url)
  }

  getBaseGlobalUSCopperHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/base_global_copper2/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getBaseGlobalTinPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/base_global_tin/latest.json";
    return this.http.get<Price>(url)
  }

  getBaseGlobalTinHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/base_global_tin/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getBaseGlobalGBCopperPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/base_global_copper/latest.json";
    return this.http.get<Price>(url)
  }

  getBaseGlobalGBCopperHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/base_global_copper/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getBaseGlobalNickelPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/base_global_nickel/latest.json";
    return this.http.get<Price>(url)
  }

  getBaseGlobalNickelHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/base_global_nickel/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getBaseGlobalLeadPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/base_global_lead/latest.json";
    return this.http.get<Price>(url)
  }

  getBaseGlobalLeadHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/base_global_lead/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getBaseGlobalZincPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/base_global_zinc/latest.json";
    return this.http.get<Price>(url)
  }

  getBaseGlobalZincHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/base_global_zinc/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getBaseAluminumPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/base-us-aluminum/latest.json";
    return this.http.get<Price>(url)
  }

  getBaseAluminumHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/base-us-aluminum/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getBaseUraniumPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/base-us-uranium/latest.json";
    return this.http.get<Price>(url)
  }

  getBaseUraniumHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/base-us-uranium/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getBaseSteelCoilPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/base-us-steel-coil/latest.json";
    return this.http.get<Price>(url)
  }

  getBaseSteelCoilHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/base-us-steel-coil/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getBaseIronOrePriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/base-us-iron-ore/latest.json";
    return this.http.get<Price>(url)
  }

  getBaseIronOreHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/base-us-iron-ore/history.json";
    return this.http.get<Price[]>(url)
  }

  //#endregion


  //#region Commodity Market
  getCommodityLondonWheatPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_london_wheat/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityLondonWheatHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_london_wheat/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCommodityUSWheatPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_us_wheat/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityUSWheatHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_us_wheat/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCommodityRoughRicePriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_rough_rice/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityRoughRiceHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_rough_rice/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCommodityOatsPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_oats/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityOatsHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_oats/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCommodityCornPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_us_corn/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityCornHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_us_corn/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCommoditySoybeansPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_us_soybeans/latest.json";
    return this.http.get<Price>(url)
  }

  getCommoditySoybeansHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_us_soybeans/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCommoditySoybeanOilPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_us_soybean_oil/latest.json";
    return this.http.get<Price>(url)
  }

  getCommoditySoybeanOilHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_us_soybean_oil/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCommoditySoybeanMealPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_us_soybean_meal/latest.json";
    return this.http.get<Price>(url)
  }

  getCommoditySoybeanMealHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_us_soybean_meal/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCommodityUSSugarPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_us_sugar_no11/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityUSSugarHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_us_sugar_no11/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCommodityLondonSugarPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_london_sugar/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityLondonSugarHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_london_sugar/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCommodityCottonPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_us_cotton_no_2/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityCottonHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_us_cotton_no_2/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCommodityUSCoffeePriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_us_coffee_c/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityUSCoffeeHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_us_coffee_c/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCommodityLondonCoffeePriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_london_coffee/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityLondonCoffeeHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_london_coffee/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCommodityUSCocoaPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_us_cocoa/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityUSCocoaHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_us_cocoa/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCommodityLondonCocoaPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_london_cocoa/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityLondonCocoaHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_london_cocoa/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCommodityLumberPriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_lumber/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityLumberHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_lumber/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCommodityOrangeJuicePriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_orange_juice/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityOrangeJuiceHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_orange_juice/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCommodityLiveCattlePriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_live_cattle/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityLiveCattleHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_live_cattle/history.json";
    return this.http.get<Price[]>(url)
  }
  
  
  

  
  
  



  
  getCommodityFeedCattlePriceInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_feed_cattle/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityFeedCattleHistoryInfo() {
    const url = this.base_url + "/margani/pricedb/main/tgju/current/commodity_feed_cattle/history.json";
    return this.http.get<Price[]>(url)
  }

  //#endregion



}
