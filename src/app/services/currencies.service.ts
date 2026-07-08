import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currencies, Price } from '../interfaces/data.types';
import { catchError, retry, throwError, timeout } from 'rxjs';
import { ChartData } from '../interfaces/chart.types';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  base_url: string = "https://raw.githubusercontent.com";
  history_base_url: string = "https://dashboard-api.tgju.org/v1/tv2/history?symbol=";
  call_subdomains: string[] = [
    // 'call1',
    'call2',
    'call3',
    'call4'
  ];

  make_random_str(rand_limit: number) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < rand_limit; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  constructor(private http: HttpClient) {
    
  }

  getAllCurrencies () {
    const call_subdomain  = this.call_subdomains[Math.floor(Math.random()*this.call_subdomains.length)];
    const url = 'https://' + call_subdomain + '.tgju.org/ajax.json?rev=' + this.make_random_str(60)
    return this.http.get<Currencies>(url).pipe(retry({ count: Infinity }));
  }

  //#region Currencies
  //#region Main currencies
  getDollarRlPriceInfo() {
    const url = this.base_url + "price_dollar_rl/latest.json";
    return this.http.get<Price>(url)
  }

  getDollarRlHistoryInfo() {
    const url = this.history_base_url + "price_dollar_rl";
    return this.http.get<ChartData>(url)
  }





  getEuroRlPriceInfo() {
    const url = this.base_url + "price_eur/latest.json";
    return this.http.get<Price>(url)
  }

  getEuroRlHistoryInfo() {
    const url = this.history_base_url + "price_eur";
    return this.http.get<ChartData>(url)
  }





  getAedRlPriceInfo() {
    const url = this.base_url + "price_aed/latest.json";
    return this.http.get<Price>(url)
  }

  getAedRlHistoryInfo() {
    const url = this.history_base_url + "price_aed";
    return this.http.get<ChartData>(url)
  }




  
  getGbpRlPriceInfo() {
    const url = this.base_url + "price_gbp/latest.json";
    return this.http.get<Price>(url)
  }

  getGbpRlHistoryInfo() {
    const url = this.history_base_url + "price_gbp";
    return this.http.get<ChartData>(url)
  }

  


  
  getTryRlPriceInfo() {
    const url = this.base_url + "price_try/latest.json";
    return this.http.get<Price>(url)
  }

  getTryRlHistoryInfo() {
    const url = this.history_base_url + "price_try";
    return this.http.get<ChartData>(url)
  }

  
  


  
  getChfRlPriceInfo() {
    const url = this.base_url + "price_chf/latest.json";
    return this.http.get<Price>(url)
  }

  getChfRlHistoryInfo() {
    const url = this.history_base_url + "price_chf";
    return this.http.get<ChartData>(url)
  }

  
  
  


  
  getCnyRlPriceInfo() {
    const url = this.base_url + "price_cny/latest.json";
    return this.http.get<Price>(url)
  }

  getCnyRlHistoryInfo() {
    const url = this.history_base_url + "price_cny";
    return this.http.get<ChartData>(url)
  }

  
  
  


  
  getJpyRlPriceInfo() {
    const url = this.base_url + "price_jpy/latest.json";
    return this.http.get<Price>(url)
  }

  getJpyRlHistoryInfo() {
    const url = this.history_base_url + "price_jpy";
    return this.http.get<ChartData>(url)
  }
  

  
  
  


  
  getKrwRlPriceInfo() {
    const url = this.base_url + "price_krw/latest.json";
    return this.http.get<Price>(url)
  }

  getKrwRlHistoryInfo() {
    const url = this.history_base_url + "price_krw";
    return this.http.get<ChartData>(url)
  }
  

  
  
  



  
  getCadRlPriceInfo() {
    const url = this.base_url + "price_cad/latest.json";
    return this.http.get<Price>(url)
  }

  getCadRlHistoryInfo() {
    const url = this.history_base_url + "price_cad";
    return this.http.get<ChartData>(url)
  }
  
  

  
  
  



  
  getAudRlPriceInfo() {
    const url = this.base_url + "price_aud/latest.json";
    return this.http.get<Price>(url)
  }

  getAudRlHistoryInfo() {
    const url = this.history_base_url + "price_aud";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getNzdRlPriceInfo() {
    const url = this.base_url + "price_nzd/latest.json";
    return this.http.get<Price>(url)
  }

  getNzdRlHistoryInfo() {
    const url = this.history_base_url + "price_nzd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getSgdRlPriceInfo() {
    const url = this.base_url + "price_sgd/latest.json";
    return this.http.get<Price>(url)
  }

  getSgdRlHistoryInfo() {
    const url = this.history_base_url + "price_sgd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getInrRlPriceInfo() {
    const url = this.base_url + "price_inr/latest.json";
    return this.http.get<Price>(url)
  }

  getInrRlHistoryInfo() {
    const url = this.history_base_url + "price_inr";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getPkrRlPriceInfo() {
    const url = this.base_url + "price_pkr/latest.json";
    return this.http.get<Price>(url)
  }

  getPkrRlHistoryInfo() {
    const url = this.history_base_url + "price_pkr";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getIqdRlPriceInfo() {
    const url = this.base_url + "price_iqd/latest.json";
    return this.http.get<Price>(url)
  }

  getIqdRlHistoryInfo() {
    const url = this.history_base_url + "price_iqd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getSypRlPriceInfo() {
    const url = this.base_url + "price_syp/latest.json";
    return this.http.get<Price>(url)
  }

  getSypRlHistoryInfo() {
    const url = this.history_base_url + "price_syp";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getAfnRlPriceInfo() {
    const url = this.base_url + "price_afn/latest.json";
    return this.http.get<Price>(url)
  }

  getAfnRlHistoryInfo() {
    const url = this.history_base_url + "price_afn";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getDkkRlPriceInfo() {
    const url = this.base_url + "price_dkk/latest.json";
    return this.http.get<Price>(url)
  }

  getDkkRlHistoryInfo() {
    const url = this.history_base_url + "price_dkk";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getSekRlPriceInfo() {
    const url = this.base_url + "price_sek/latest.json";
    return this.http.get<Price>(url)
  }

  getSekRlHistoryInfo() {
    const url = this.history_base_url + "price_sek";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getNokRlPriceInfo() {
    const url = this.base_url + "price_nok/latest.json";
    return this.http.get<Price>(url)
  }

  getNokRlHistoryInfo() {
    const url = this.history_base_url + "price_nok";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getSarRlPriceInfo() {
    const url = this.base_url + "price_sar/latest.json";
    return this.http.get<Price>(url)
  }

  getSarRlHistoryInfo() {
    const url = this.history_base_url + "price_sar";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getQarRlPriceInfo() {
    const url = this.base_url + "price_qar/latest.json";
    return this.http.get<Price>(url)
  }

  getQarRlHistoryInfo() {
    const url = this.history_base_url + "price_qar";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getOmrRlPriceInfo() {
    const url = this.base_url + "price_omr/latest.json";
    return this.http.get<Price>(url)
  }

  getOmrRlHistoryInfo() {
    const url = this.history_base_url + "price_omr";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getKwdRlPriceInfo() {
    const url = this.base_url + "price_kwd/latest.json";
    return this.http.get<Price>(url)
  }

  getKwdRlHistoryInfo() {
    const url = this.history_base_url + "price_kwd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getBhdRlPriceInfo() {
    const url = this.base_url + "price_bhd/latest.json";
    return this.http.get<Price>(url)
  }

  getBhdRlHistoryInfo() {
    const url = this.history_base_url + "price_bhd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getMyrRlPriceInfo() {
    const url = this.base_url + "price_myr/latest.json";
    return this.http.get<Price>(url)
  }

  getMyrRlHistoryInfo() {
    const url = this.history_base_url + "price_myr";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getThbRlPriceInfo() {
    const url = this.base_url + "price_thb/latest.json";
    return this.http.get<Price>(url)
  }

  getThbRlHistoryInfo() {
    const url = this.history_base_url + "price_thb";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getHkdRlPriceInfo() {
    const url = this.base_url + "price_hkd/latest.json";
    return this.http.get<Price>(url)
  }

  getHkdRlHistoryInfo() {
    const url = this.history_base_url + "price_hkd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getRubRlPriceInfo() {
    const url = this.base_url + "price_rub/latest.json";
    return this.http.get<Price>(url)
  }

  getRubRlHistoryInfo() {
    const url = this.history_base_url + "price_rub";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getAznRlPriceInfo() {
    const url = this.base_url + "price_azn/latest.json";
    return this.http.get<Price>(url)
  }

  getAznRlHistoryInfo() {
    const url = this.history_base_url + "price_azn";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getAmdRlPriceInfo() {
    const url = this.base_url + "price_amd/latest.json";
    return this.http.get<Price>(url)
  }

  getAmdRlHistoryInfo() {
    const url = this.history_base_url + "price_amd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGelRlPriceInfo() {
    const url = this.base_url + "price_gel/latest.json";
    return this.http.get<Price>(url)
  }

  getGelRlHistoryInfo() {
    const url = this.history_base_url + "price_gel";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getKgsRlPriceInfo() {
    const url = this.base_url + "price_kgs/latest.json";
    return this.http.get<Price>(url)
  }

  getKgsRlHistoryInfo() {
    const url = this.history_base_url + "price_kgs";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getTjsRlPriceInfo() {
    const url = this.base_url + "price_tjs/latest.json";
    return this.http.get<Price>(url)
  }

  getTjsRlHistoryInfo() {
    const url = this.history_base_url + "price_tjs";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getTmtRlPriceInfo() {
    const url = this.base_url + "price_tmt/latest.json";
    return this.http.get<Price>(url)
  }

  getTmtRlHistoryInfo() {
    const url = this.history_base_url + "price_tmt";
    return this.http.get<ChartData>(url)
  }
  //#endregion

  //#region Other Currencies
  getAllRlPriceInfo() {
    const url = this.base_url + "price_all/latest.json";
    return this.http.get<Price>(url)
  }

  getAllRlHistoryInfo() {
    const url = this.history_base_url + "price_all";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getBbdRlPriceInfo() {
    const url = this.base_url + "price_bbd/latest.json";
    return this.http.get<Price>(url)
  }

  getBbdRlHistoryInfo() {
    const url = this.history_base_url + "price_bbd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getBdtRlPriceInfo() {
    const url = this.base_url + "price_bdt/latest.json";
    return this.http.get<Price>(url)
  }

  getBdtRlHistoryInfo() {
    const url = this.history_base_url + "price_bdt";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getBgnRlPriceInfo() {
    const url = this.base_url + "price_bgn/latest.json";
    return this.http.get<Price>(url)
  }

  getBgnRlHistoryInfo() {
    const url = this.history_base_url + "price_bgn";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getBifRlPriceInfo() {
    const url = this.base_url + "price_bif/latest.json";
    return this.http.get<Price>(url)
  }

  getBifRlHistoryInfo() {
    const url = this.history_base_url + "price_bif";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getBndRlPriceInfo() {
    const url = this.base_url + "price_bnd/latest.json";
    return this.http.get<Price>(url)
  }

  getBndRlHistoryInfo() {
    const url = this.history_base_url + "price_bnd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getBsdRlPriceInfo() {
    const url = this.base_url + "price_bsd/latest.json";
    return this.http.get<Price>(url)
  }

  getBsdRlHistoryInfo() {
    const url = this.history_base_url + "price_bsd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getBwpRlPriceInfo() {
    const url = this.base_url + "price_bwp/latest.json";
    return this.http.get<Price>(url)
  }

  getBwpRlHistoryInfo() {
    const url = this.history_base_url + "price_bwp";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getBynRlPriceInfo() {
    const url = this.base_url + "price_byn/latest.json";
    return this.http.get<Price>(url)
  }

  getBynRlHistoryInfo() {
    const url = this.history_base_url + "price_byn";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getBzdRlPriceInfo() {
    const url = this.base_url + "price_bzd/latest.json";
    return this.http.get<Price>(url)
  }

  getBzdRlHistoryInfo() {
    const url = this.history_base_url + "price_bzd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCupRlPriceInfo() {
    const url = this.base_url + "price_cup/latest.json";
    return this.http.get<Price>(url)
  }

  getCupRlHistoryInfo() {
    const url = this.history_base_url + "price_cup";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCzkRlPriceInfo() {
    const url = this.base_url + "price_czk/latest.json";
    return this.http.get<Price>(url)
  }

  getCzkRlHistoryInfo() {
    const url = this.history_base_url + "price_czk";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getDjfRlPriceInfo() {
    const url = this.base_url + "price_djf/latest.json";
    return this.http.get<Price>(url)
  }

  getDjfRlHistoryInfo() {
    const url = this.history_base_url + "price_djf";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getDopRlPriceInfo() {
    const url = this.base_url + "price_dop/latest.json";
    return this.http.get<Price>(url)
  }

  getDopRlHistoryInfo() {
    const url = this.history_base_url + "price_dop";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getDzdRlPriceInfo() {
    const url = this.base_url + "price_dzd/latest.json";
    return this.http.get<Price>(url)
  }

  getDzdRlHistoryInfo() {
    const url = this.history_base_url + "price_dzd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getEtbRlPriceInfo() {
    const url = this.base_url + "price_etb/latest.json";
    return this.http.get<Price>(url)
  }

  getEtbRlHistoryInfo() {
    const url = this.history_base_url + "price_etb";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGnfRlPriceInfo() {
    const url = this.base_url + "price_gnf/latest.json";
    return this.http.get<Price>(url)
  }

  getGnfRlHistoryInfo() {
    const url = this.history_base_url + "price_gnf";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGtqRlPriceInfo() {
    const url = this.base_url + "price_gtq/latest.json";
    return this.http.get<Price>(url)
  }

  getGtqRlHistoryInfo() {
    const url = this.history_base_url + "price_gtq";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGydRlPriceInfo() {
    const url = this.base_url + "price_gyd/latest.json";
    return this.http.get<Price>(url)
  }

  getGydRlHistoryInfo() {
    const url = this.history_base_url + "price_gyd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getHnlRlPriceInfo() {
    const url = this.base_url + "price_hnl/latest.json";
    return this.http.get<Price>(url)
  }

  getHnlRlHistoryInfo() {
    const url = this.history_base_url + "price_hnl";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getHrkRlPriceInfo() {
    const url = this.base_url + "price_hrk/latest.json";
    return this.http.get<Price>(url)
  }

  getHrkRlHistoryInfo() {
    const url = this.history_base_url + "price_hrk";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getHtgRlPriceInfo() {
    const url = this.base_url + "price_htg/latest.json";
    return this.http.get<Price>(url)
  }

  getHtgRlHistoryInfo() {
    const url = this.history_base_url + "price_htg";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getIskRlPriceInfo() {
    const url = this.base_url + "price_isk/latest.json";
    return this.http.get<Price>(url)
  }

  getIskRlHistoryInfo() {
    const url = this.history_base_url + "price_isk";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getJmdRlPriceInfo() {
    const url = this.base_url + "price_jmd/latest.json";
    return this.http.get<Price>(url)
  }

  getJmdRlHistoryInfo() {
    const url = this.history_base_url + "price_jmd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getKesRlPriceInfo() {
    const url = this.base_url + "price_kes/latest.json";
    return this.http.get<Price>(url)
  }

  getKesRlHistoryInfo() {
    const url = this.history_base_url + "price_kes";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getKhrRlPriceInfo() {
    const url = this.base_url + "price_khr/latest.json";
    return this.http.get<Price>(url)
  }

  getKhrRlHistoryInfo() {
    const url = this.history_base_url + "price_khr";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getKmfRlPriceInfo() {
    const url = this.base_url + "price_kmf/latest.json";
    return this.http.get<Price>(url)
  }

  getKmfRlHistoryInfo() {
    const url = this.history_base_url + "price_kmf";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getKztRlPriceInfo() {
    const url = this.base_url + "price_kzt/latest.json";
    return this.http.get<Price>(url)
  }

  getKztRlHistoryInfo() {
    const url = this.history_base_url + "price_kzt";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getLakRlPriceInfo() {
    const url = this.base_url + "price_lak/latest.json";
    return this.http.get<Price>(url)
  }

  getLakRlHistoryInfo() {
    const url = this.history_base_url + "price_lak";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getLbpRlPriceInfo() {
    const url = this.base_url + "price_lbp/latest.json";
    return this.http.get<Price>(url)
  }

  getLbpRlHistoryInfo() {
    const url = this.history_base_url + "price_lbp";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getLkrRlPriceInfo() {
    const url = this.base_url + "price_lkr/latest.json";
    return this.http.get<Price>(url)
  }

  getLkrRlHistoryInfo() {
    const url = this.history_base_url + "price_lkr";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getLrdRlPriceInfo() {
    const url = this.base_url + "price_lrd/latest.json";
    return this.http.get<Price>(url)
  }

  getLrdRlHistoryInfo() {
    const url = this.history_base_url + "price_lrd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getLslRlPriceInfo() {
    const url = this.base_url + "price_lsl/latest.json";
    return this.http.get<Price>(url)
  }

  getLslRlHistoryInfo() {
    const url = this.history_base_url + "price_lsl";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getLydRlPriceInfo() {
    const url = this.base_url + "price_lyd/latest.json";
    return this.http.get<Price>(url)
  }

  getLydRlHistoryInfo() {
    const url = this.history_base_url + "price_lyd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getMadRlPriceInfo() {
    const url = this.base_url + "price_mad/latest.json";
    return this.http.get<Price>(url)
  }

  getMadRlHistoryInfo() {
    const url = this.history_base_url + "price_mad";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getMdlRlPriceInfo() {
    const url = this.base_url + "price_mdl/latest.json";
    return this.http.get<Price>(url)
  }

  getMdlRlHistoryInfo() {
    const url = this.history_base_url + "price_mdl";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getMgaRlPriceInfo() {
    const url = this.base_url + "price_mga/latest.json";
    return this.http.get<Price>(url)
  }

  getMgaRlHistoryInfo() {
    const url = this.history_base_url + "price_mga";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getMkdRlPriceInfo() {
    const url = this.base_url + "price_mkd/latest.json";
    return this.http.get<Price>(url)
  }

  getMkdRlHistoryInfo() {
    const url = this.history_base_url + "price_mkd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getMmkRlPriceInfo() {
    const url = this.base_url + "price_mmk/latest.json";
    return this.http.get<Price>(url)
  }

  getMmkRlHistoryInfo() {
    const url = this.history_base_url + "price_mmk";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getMopRlPriceInfo() {
    const url = this.base_url + "price_mop/latest.json";
    return this.http.get<Price>(url)
  }

  getMopRlHistoryInfo() {
    const url = this.history_base_url + "price_mop";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getMurRlPriceInfo() {
    const url = this.base_url + "price_mur/latest.json";
    return this.http.get<Price>(url)
  }

  getMurRlHistoryInfo() {
    const url = this.history_base_url + "price_mur";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getMvrRlPriceInfo() {
    const url = this.base_url + "price_mvr/latest.json";
    return this.http.get<Price>(url)
  }

  getMvrRlHistoryInfo() {
    const url = this.history_base_url + "price_mvr";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getMwkRlPriceInfo() {
    const url = this.base_url + "price_mwk/latest.json";
    return this.http.get<Price>(url)
  }

  getMwkRlHistoryInfo() {
    const url = this.history_base_url + "price_mwk";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getMznRlPriceInfo() {
    const url = this.base_url + "price_mzn/latest.json";
    return this.http.get<Price>(url)
  }

  getMznRlHistoryInfo() {
    const url = this.history_base_url + "price_mzn";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getNadRlPriceInfo() {
    const url = this.base_url + "price_nad/latest.json";
    return this.http.get<Price>(url)
  }

  getNadRlHistoryInfo() {
    const url = this.history_base_url + "price_nad";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getNgnRlPriceInfo() {
    const url = this.base_url + "price_ngn/latest.json";
    return this.http.get<Price>(url)
  }

  getNgnRlHistoryInfo() {
    const url = this.history_base_url + "price_ngn";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getNprRlPriceInfo() {
    const url = this.base_url + "price_npr/latest.json";
    return this.http.get<Price>(url)
  }

  getNprRlHistoryInfo() {
    const url = this.history_base_url + "price_npr";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getPabRlPriceInfo() {
    const url = this.base_url + "price_pab/latest.json";
    return this.http.get<Price>(url)
  }

  getPabRlHistoryInfo() {
    const url = this.history_base_url + "price_pab";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getPgkRlPriceInfo() {
    const url = this.base_url + "price_pgk/latest.json";
    return this.http.get<Price>(url)
  }

  getPgkRlHistoryInfo() {
    const url = this.history_base_url + "price_pgk";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getPhpRlPriceInfo() {
    const url = this.base_url + "price_php/latest.json";
    return this.http.get<Price>(url)
  }

  getPhpRlHistoryInfo() {
    const url = this.history_base_url + "price_php";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getRonRlPriceInfo() {
    const url = this.base_url + "price_ron/latest.json";
    return this.http.get<Price>(url)
  }

  getRonRlHistoryInfo() {
    const url = this.history_base_url + "price_ron";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getRsdRlPriceInfo() {
    const url = this.base_url + "price_rsd/latest.json";
    return this.http.get<Price>(url)
  }

  getRsdRlHistoryInfo() {
    const url = this.history_base_url + "price_rsd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getRwfRlPriceInfo() {
    const url = this.base_url + "price_rwf/latest.json";
    return this.http.get<Price>(url)
  }

  getRwfRlHistoryInfo() {
    const url = this.history_base_url + "price_rwf";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getScrRlPriceInfo() {
    const url = this.base_url + "price_scr/latest.json";
    return this.http.get<Price>(url)
  }

  getScrRlHistoryInfo() {
    const url = this.history_base_url + "price_scr";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getSdgRlPriceInfo() {
    const url = this.base_url + "price_sdg/latest.json";
    return this.http.get<Price>(url)
  }

  getSdgRlHistoryInfo() {
    const url = this.history_base_url + "price_sdg";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getShpRlPriceInfo() {
    const url = this.base_url + "price_shp/latest.json";
    return this.http.get<Price>(url)
  }

  getShpRlHistoryInfo() {
    const url = this.history_base_url + "price_shp";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getSosRlPriceInfo() {
    const url = this.base_url + "price_sos/latest.json";
    return this.http.get<Price>(url)
  }

  getSosRlHistoryInfo() {
    const url = this.history_base_url + "price_sos";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getSvcRlPriceInfo() {
    const url = this.base_url + "price_svc/latest.json";
    return this.http.get<Price>(url)
  }

  getSvcRlHistoryInfo() {
    const url = this.history_base_url + "price_svc";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getSzlRlPriceInfo() {
    const url = this.base_url + "price_szl/latest.json";
    return this.http.get<Price>(url)
  }

  getSzlRlHistoryInfo() {
    const url = this.history_base_url + "price_szl";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getTndRlPriceInfo() {
    const url = this.base_url + "price_tnd/latest.json";
    return this.http.get<Price>(url)
  }

  getTndRlHistoryInfo() {
    const url = this.history_base_url + "price_tnd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getTtdRlPriceInfo() {
    const url = this.base_url + "price_ttd/latest.json";
    return this.http.get<Price>(url)
  }

  getTtdRlHistoryInfo() {
    const url = this.history_base_url + "price_ttd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getTzsRlPriceInfo() {
    const url = this.base_url + "price_tzs/latest.json";
    return this.http.get<Price>(url)
  }

  getTzsRlHistoryInfo() {
    const url = this.history_base_url + "price_tzs";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getUgxRlPriceInfo() {
    const url = this.base_url + "price_ugx/latest.json";
    return this.http.get<Price>(url)
  }

  getUgxRlHistoryInfo() {
    const url = this.history_base_url + "price_ugx";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getYerRlPriceInfo() {
    const url = this.base_url + "price_yer/latest.json";
    return this.http.get<Price>(url)
  }

  getYerRlHistoryInfo() {
    const url = this.history_base_url + "price_yer";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getZmwRlPriceInfo() {
    const url = this.base_url + "price_zmw/latest.json";
    return this.http.get<Price>(url)
  }

  getZmwRlHistoryInfo() {
    const url = this.history_base_url + "price_zmw";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGhsRlPriceInfo() {
    const url = this.base_url + "price_ghs/latest.json";
    return this.http.get<Price>(url)
  }

  getGhsRlHistoryInfo() {
    const url = this.history_base_url + "price_ghs";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getPenRlPriceInfo() {
    const url = this.base_url + "price_pen/latest.json";
    return this.http.get<Price>(url)
  }

  getPenRlHistoryInfo() {
    const url = this.history_base_url + "price_pen";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getClpRlPriceInfo() {
    const url = this.base_url + "price_clp/latest.json";
    return this.http.get<Price>(url)
  }

  getClpRlHistoryInfo() {
    const url = this.history_base_url + "price_clp";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getEgpRlPriceInfo() {
    const url = this.base_url + "price_egp/latest.json";
    return this.http.get<Price>(url)
  }

  getEgpRlHistoryInfo() {
    const url = this.history_base_url + "price_egp";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getMxnRlPriceInfo() {
    const url = this.base_url + "price_mxn/latest.json";
    return this.http.get<Price>(url)
  }

  getMxnRlHistoryInfo() {
    const url = this.history_base_url + "price_mxn";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getJodRlPriceInfo() {
    const url = this.base_url + "price_jod/latest.json";
    return this.http.get<Price>(url)
  }

  getJodRlHistoryInfo() {
    const url = this.history_base_url + "price_jod";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getBrlRlPriceInfo() {
    const url = this.base_url + "price_brl/latest.json";
    return this.http.get<Price>(url)
  }

  getBrlRlHistoryInfo() {
    const url = this.history_base_url + "price_brl";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getUyuRlPriceInfo() {
    const url = this.base_url + "price_uyu/latest.json";
    return this.http.get<Price>(url)
  }

  getUyuRlHistoryInfo() {
    const url = this.history_base_url + "price_uyu";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCopRlPriceInfo() {
    const url = this.base_url + "price_cop/latest.json";
    return this.http.get<Price>(url)
  }

  getCopRlHistoryInfo() {
    const url = this.history_base_url + "price_cop";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getPlnRlPriceInfo() {
    const url = this.base_url + "price_pln/latest.json";
    return this.http.get<Price>(url)
  }

  getPlnRlHistoryInfo() {
    const url = this.history_base_url + "price_pln";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getArsRlPriceInfo() {
    const url = this.base_url + "price_ars/latest.json";
    return this.http.get<Price>(url)
  }

  getArsRlHistoryInfo() {
    const url = this.history_base_url + "price_ars";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getKydRlPriceInfo() {
    const url = this.base_url + "price_kyd/latest.json";
    return this.http.get<Price>(url)
  }

  getKydRlHistoryInfo() {
    const url = this.history_base_url + "price_kyd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getHufRlPriceInfo() {
    const url = this.base_url + "price_huf/latest.json";
    return this.http.get<Price>(url)
  }

  getHufRlHistoryInfo() {
    const url = this.history_base_url + "price_huf";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getPygRlPriceInfo() {
    const url = this.base_url + "price_pyg/latest.json";
    return this.http.get<Price>(url)
  }

  getPygRlHistoryInfo() {
    const url = this.history_base_url + "price_pyg";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getUahRlPriceInfo() {
    const url = this.base_url + "price_uah/latest.json";
    return this.http.get<Price>(url)
  }

  getUahRlHistoryInfo() {
    const url = this.history_base_url + "price_uah";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getZarRlPriceInfo() {
    const url = this.base_url + "price_zar/latest.json";
    return this.http.get<Price>(url)
  }

  getZarRlHistoryInfo() {
    const url = this.history_base_url + "price_zar";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getNioRlPriceInfo() {
    const url = this.base_url + "price_nio/latest.json";
    return this.http.get<Price>(url)
  }

  getNioRlHistoryInfo() {
    const url = this.history_base_url + "price_nio";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getFjdRlPriceInfo() {
    const url = this.base_url + "price_fjd/latest.json";
    return this.http.get<Price>(url)
  }

  getFjdRlHistoryInfo() {
    const url = this.history_base_url + "price_fjd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getTwdRlPriceInfo() {
    const url = this.base_url + "price_twd/latest.json";
    return this.http.get<Price>(url)
  }

  getTwdRlHistoryInfo() {
    const url = this.history_base_url + "price_twd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getUzsRlPriceInfo() {
    const url = this.base_url + "price_uzs/latest.json";
    return this.http.get<Price>(url)
  }

  getUzsRlHistoryInfo() {
    const url = this.history_base_url + "price_uzs";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getIdrRlPriceInfo() {
    const url = this.base_url + "price_idr/latest.json";
    return this.http.get<Price>(url)
  }

  getIdrRlHistoryInfo() {
    const url = this.history_base_url + "price_idr";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getXofRlPriceInfo() {
    const url = this.base_url + "price_xof/latest.json";
    return this.http.get<Price>(url)
  }

  getXofRlHistoryInfo() {
    const url = this.history_base_url + "price_xof";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getXpfRlPriceInfo() {
    const url = this.base_url + "price_xpf/latest.json";
    return this.http.get<Price>(url)
  }

  getXpfRlHistoryInfo() {
    const url = this.history_base_url + "price_xpf";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getVndRlPriceInfo() {
    const url = this.base_url + "price_vnd/latest.json";
    return this.http.get<Price>(url)
  }

  getVndRlHistoryInfo() {
    const url = this.history_base_url + "price_vnd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGmdRlPriceInfo() {
    const url = this.base_url + "price_gmd/latest.json";
    return this.http.get<Price>(url)
  }

  getGmdRlHistoryInfo() {
    const url = this.history_base_url + "price_gmd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getXafRlPriceInfo() {
    const url = this.base_url + "price_xaf/latest.json";
    return this.http.get<Price>(url)
  }

  getXafRlHistoryInfo() {
    const url = this.history_base_url + "price_xaf";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getVuvRlPriceInfo() {
    const url = this.base_url + "price_vuv/latest.json";
    return this.http.get<Price>(url)
  }

  getVuvRlHistoryInfo() {
    const url = this.history_base_url + "price_vuv";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getMroRlPriceInfo() {
    const url = this.base_url + "price_mro/latest.json";
    return this.http.get<Price>(url)
  }

  getMroRlHistoryInfo() {
    const url = this.history_base_url + "price_mro";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getAngRlPriceInfo() {
    const url = this.base_url + "price_ang/latest.json";
    return this.http.get<Price>(url)
  }

  getAngRlHistoryInfo() {
    const url = this.history_base_url + "price_ang";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getStdRlPriceInfo() {
    const url = this.base_url + "price_std/latest.json";
    return this.http.get<Price>(url)
  }

  getStdRlHistoryInfo() {
    const url = this.history_base_url + "price_std";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getXcdRlPriceInfo() {
    const url = this.base_url + "price_xcd/latest.json";
    return this.http.get<Price>(url)
  }

  getXcdRlHistoryInfo() {
    const url = this.history_base_url + "price_xcd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getBamRlPriceInfo() {
    const url = this.base_url + "price_bam/latest.json";
    return this.http.get<Price>(url)
  }

  getBamRlHistoryInfo() {
    const url = this.history_base_url + "price_bam";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getBtnRlPriceInfo() {
    const url = this.base_url + "price_btn/latest.json";
    return this.http.get<Price>(url)
  }

  getBtnRlHistoryInfo() {
    const url = this.history_base_url + "price_btn";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCdfRlPriceInfo() {
    const url = this.base_url + "price_cdf/latest.json";
    return this.http.get<Price>(url)
  }

  getCdfRlHistoryInfo() {
    const url = this.history_base_url + "price_cdf";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCrcRlPriceInfo() {
    const url = this.base_url + "price_crc/latest.json";
    return this.http.get<Price>(url)
  }

  getCrcRlHistoryInfo() {
    const url = this.history_base_url + "price_crc";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCveRlPriceInfo() {
    const url = this.base_url + "price_cve/latest.json";
    return this.http.get<Price>(url)
  }

  getCveRlHistoryInfo() {
    const url = this.history_base_url + "price_cve";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getBmdRlPriceInfo() {
    const url = this.base_url + "price_bmd/latest.json";
    return this.http.get<Price>(url)
  }

  getBmdRlHistoryInfo() {
    const url = this.history_base_url + "price_bmd";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getAwgRlPriceInfo() {
    const url = this.base_url + "price_awg/latest.json";
    return this.http.get<Price>(url)
  }

  getAwgRlHistoryInfo() {
    const url = this.history_base_url + "price_awg";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getSllRlPriceInfo() {
    const url = this.base_url + "price_sll/latest.json";
    return this.http.get<Price>(url)
  }

  getSllRlHistoryInfo() {
    const url = this.history_base_url + "price_sll";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getVefRlPriceInfo() {
    const url = this.base_url + "price_vef/latest.json";
    return this.http.get<Price>(url)
  }

  getVefRlHistoryInfo() {
    const url = this.history_base_url + "price_vef";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCypRlPriceInfo() {
    const url = this.base_url + "price_cyp/latest.json";
    return this.http.get<Price>(url)
  }

  getCypRlHistoryInfo() {
    const url = this.history_base_url + "price_cyp";
    return this.http.get<ChartData>(url)
  }



  // Dollar Market
  getNimaUSDBuyPriceInfo() {
    const url = this.base_url + "ice_transfer_usd_buy/latest.json";
    return this.http.get<Price>(url)
  }

  getNimaUSDBuyHistoryInfo() {
    const url = this.history_base_url + "nima_buy_usd";
    return this.http.get<ChartData>(url)
  }




  
  getEXUsdSellPriceInfo() {
    const url = this.base_url + "exusd_sell/latest.json";
    return this.http.get<Price>(url)
  }

  getEXUsdSellHistoryInfo() {
    const url = this.history_base_url + "exusd_sell";
    return this.http.get<ChartData>(url)
  }
  


  


  
  getAfghanUsdPriceInfo() {
    const url = this.base_url + "afghan_usd/latest.json";
    return this.http.get<Price>(url)
  }

  getAfghanUsdHistoryInfo() {
    const url = this.history_base_url + "afghan_usd";
    return this.http.get<ChartData>(url)
  }





  
  getNimaUSDSellPriceInfo() {
    const url = this.base_url + "ice_transfer_usd_sell/latest.json";
    return this.http.get<Price>(url)
  }

  getNimaUSDSellHistoryInfo() {
    const url = this.history_base_url + "nima_sell_usd";
    return this.http.get<ChartData>(url)
  }




  



  
  getIceUSDPriceInfo() {
    const url = this.base_url + "ice_usd/latest.json";
    return this.http.get<Price>(url)
  }

  getIceUSDHistoryInfo() {
    const url = this.history_base_url + "ice_usd";
    return this.http.get<ChartData>(url)
  }

  




  



  
  getSoleymaniUSDPriceInfo() {
    const url = this.base_url + "ice_usd/latest.json";
    return this.http.get<Price>(url)
  }

  getSoleymaniUSDHistoryInfo() {
    const url = this.history_base_url + "price_dollar_soleymani";
    return this.http.get<ChartData>(url)
  }



  //#endregion

  //#endregion


  //#region Crypto
  getCryptoBtcPriceInfo() {
    const url = this.base_url + "crypto-bitcoin/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoBtcHistoryInfo() {
    const url = this.history_base_url + "crypto-bitcoin";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoEthPriceInfo() {
    const url = this.base_url + "crypto-ethereum/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoEthHistoryInfo() {
    const url = this.history_base_url + "crypto-ethereum";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoTetherPriceInfo() {
    const url = this.base_url + "crypto-tether/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoTetherHistoryInfo() {
    const url = this.history_base_url + "crypto-tether";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoRipplePriceInfo() {
    const url = this.base_url + "crypto-ripple/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoRippleHistoryInfo() {
    const url = this.history_base_url + "crypto-ripple";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoBinanceCoinPriceInfo() {
    const url = this.base_url + "crypto-binance-coin/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoBinanceCoinHistoryInfo() {
    const url = this.history_base_url + "crypto-binance-coin";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoSolanaPriceInfo() {
    const url = this.base_url + "crypto-solana/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoSolanaHistoryInfo() {
    const url = this.history_base_url + "crypto-solana";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoDogecoinPriceInfo() {
    const url = this.base_url + "crypto-dogecoin/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoDogecoinHistoryInfo() {
    const url = this.history_base_url + "crypto-dogecoin";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoUSDCoinPriceInfo() {
    const url = this.base_url + "crypto-usd-coin/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoUSDCoinHistoryInfo() {
    const url = this.history_base_url + "crypto-usd-coin";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoCardanoPriceInfo() {
    const url = this.base_url + "crypto-cardano/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoCardanoHistoryInfo() {
    const url = this.history_base_url + "crypto-cardano";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoTronPriceInfo() {
    const url = this.base_url + "crypto-tron/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoTronHistoryInfo() {
    const url = this.history_base_url + "crypto-tron";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoAvalanchePriceInfo() {
    const url = this.base_url + "crypto-avalanche/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoAvalancheHistoryInfo() {
    const url = this.history_base_url + "crypto-avalanche";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoShibaInuPriceInfo() {
    const url = this.base_url + "crypto-shiba-inu/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoShibaInuHistoryInfo() {
    const url = this.history_base_url + "crypto-shiba-inu";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoPolkadotPriceInfo() {
    const url = this.base_url + "crypto-polkadot/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoPolkadotHistoryInfo() {
    const url = this.history_base_url + "crypto-polkadot";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoBchPriceInfo() {
    const url = this.base_url + "crypto-bitcoin-cash/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoBchHistoryInfo() {
    const url = this.history_base_url + "crypto-bitcoin-cash";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoUniPriceInfo() {
    const url = this.base_url + "crypto-uniswap/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoUniHistoryInfo() {
    const url = this.history_base_url + "crypto-uniswap";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoLtcPriceInfo() {
    const url = this.base_url + "crypto-litecoin/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoLtcHistoryInfo() {
    const url = this.history_base_url + "crypto-litecoin";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoFilPriceInfo() {
    const url = this.base_url + "crypto-filecoin/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoFilHistoryInfo() {
    const url = this.history_base_url + "crypto-filecoin";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoAtomPriceInfo() {
    const url = this.base_url + "crypto-cosmos/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoAtomHistoryInfo() {
    const url = this.history_base_url + "crypto-cosmos";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoClassicEthPriceInfo() {
    const url = this.base_url + "crypto-ethereum-classic/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoClassicEthHistoryInfo() {
    const url = this.history_base_url + "crypto-ethereum-classic";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoStellarPriceInfo() {
    const url = this.base_url + "crypto-stellar/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoStellarHistoryInfo() {
    const url = this.history_base_url + "crypto-stellar";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoFantomPriceInfo() {
    const url = this.base_url + "crypto-fantom/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoFantomHistoryInfo() {
    const url = this.history_base_url + "crypto-fantom";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoElrondPriceInfo() {
    const url = this.base_url + "crypto-elrond/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoElrondHistoryInfo() {
    const url = this.history_base_url + "crypto-elrond";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoMakerPriceInfo() {
    const url = this.base_url + "crypto-maker/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoMakerHistoryInfo() {
    const url = this.history_base_url + "crypto-maker";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoEOSPriceInfo() {
    const url = this.base_url + "crypto-eos/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoEOSHistoryInfo() {
    const url = this.history_base_url + "crypto-eos";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoBittorrentPriceInfo() {
    const url = this.base_url + "crypto-bittorrent/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoBittorrentHistoryInfo() {
    const url = this.history_base_url + "crypto-bittorrent";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoFlowPriceInfo() {
    const url = this.base_url + "crypto-flow/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoFlowHistoryInfo() {
    const url = this.history_base_url + "crypto-flow";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoGalaPriceInfo() {
    const url = this.base_url + "crypto-gala/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoGalaHistoryInfo() {
    const url = this.history_base_url + "crypto-gala";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoSandboxPriceInfo() {
    const url = this.base_url + "crypto-sandbox/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoSandboxHistoryInfo() {
    const url = this.history_base_url + "crypto-sandbox";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoPancakeSwapPriceInfo() {
    const url = this.base_url + "crypto-pancakeswap/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoPancakeSwapHistoryInfo() {
    const url = this.history_base_url + "crypto-pancakeswap";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoDashPriceInfo() {
    const url = this.base_url + "crypto-dash/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoDashHistoryInfo() {
    const url = this.history_base_url + "crypto-dash";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoMoneroPriceInfo() {
    const url = this.base_url + "crypto-monero/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoMoneroHistoryInfo() {
    const url = this.history_base_url + "crypto-monero";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoChainlinkPriceInfo() {
    const url = this.base_url + "crypto-chainlink/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoChainlinkHistoryInfo() {
    const url = this.history_base_url + "crypto-chainlink";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoCashaaPriceInfo() {
    const url = this.base_url + "crypto-cashaa/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoCashaaHistoryInfo() {
    const url = this.history_base_url + "crypto-cashaa";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoTezosPriceInfo() {
    const url = this.base_url + "crypto-tezos/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoTezosHistoryInfo() {
    const url = this.history_base_url + "crypto-tezos";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoLoopringPriceInfo() {
    const url = this.base_url + "crypto-loopring-irc/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoLoopringHistoryInfo() {
    const url = this.history_base_url + "crypto-loopring-irc";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoDecredPriceInfo() {
    const url = this.base_url + "crypto-decred/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoDecredHistoryInfo() {
    const url = this.history_base_url + "crypto-decred";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoWavesPriceInfo() {
    const url = this.base_url + "crypto-waves/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoWavesHistoryInfo() {
    const url = this.history_base_url + "crypto-waves";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoZcashPriceInfo() {
    const url = this.base_url + "crypto-zcash/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoZcashHistoryInfo() {
    const url = this.history_base_url + "crypto-zcash";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoNEMPriceInfo() {
    const url = this.base_url + "crypto-nem/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoNEMHistoryInfo() {
    const url = this.history_base_url + "crypto-nem";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCryptoNeoPriceInfo() {
    const url = this.base_url + "crypto-neo/latest.json";
    return this.http.get<Price>(url)
  }

  getCryptoNeoHistoryInfo() {
    const url = this.history_base_url + "crypto-neo";
    return this.http.get<ChartData>(url)
  }

  //#endregion


  //#region Gold
  getGeram18PriceInfo() {
    const url = this.base_url + "geram18/latest.json";
    return this.http.get<Price>(url)
  }

  getGeram18HistoryInfo() {
    const url = this.history_base_url + "geram18";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGold740kPriceInfo() {
    const url = this.base_url + "gold_740k/latest.json";
    return this.http.get<Price>(url)
  }

  getGold740kHistoryInfo() {
    const url = this.history_base_url + "gold_740k";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGeram24PriceInfo() {
    const url = this.base_url + "geram24/latest.json";
    return this.http.get<Price>(url)
  }

  getGeram24HistoryInfo() {
    const url = this.history_base_url + "geram24";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGoldMiniSizePriceInfo() {
    const url = this.base_url + "gold_mini_size/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldMiniSizeHistoryInfo() {
    const url = this.history_base_url + "gold_mini_size";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getSilver925PriceInfo() {
    const url = this.base_url + "silver_925/latest.json";
    return this.http.get<Price>(url)
  }

  getSilver925HistoryInfo() {
    const url = this.history_base_url + "silver_925";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getSilver999PriceInfo() {
    const url = this.base_url + "silver_999/latest.json";
    return this.http.get<Price>(url)
  }

  getSilver999HistoryInfo() {
    const url = this.history_base_url + "silver_999";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getMesghalPriceInfo() {
    const url = this.base_url + "mesghal/latest.json";
    return this.http.get<Price>(url)
  }

  getMesghalHistoryInfo() {
    const url = this.history_base_url + "mesghal";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGold17PriceInfo() {
    const url = this.base_url + "gold_17/latest.json";
    return this.http.get<Price>(url)
  }

  getGold17HistoryInfo() {
    const url = this.history_base_url + "gold_17";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGold17TransferPriceInfo() {
    const url = this.base_url + "gold_17_transfer/latest.json";
    return this.http.get<Price>(url)
  }

  getGold17TransferHistoryInfo() {
    const url = this.history_base_url + "gold_17_transfer";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGold17CoinPriceInfo() {
    const url = this.base_url + "gold_17_coin/latest.json";
    return this.http.get<Price>(url)
  }

  getGold17CoinHistoryInfo() {
    const url = this.history_base_url + "gold_17_coin";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGoldFuturesPriceInfo() {
    const url = this.base_url + "gold_futures/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldFuturesHistoryInfo() {
    const url = this.history_base_url + "gold_futures";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGoldMeltedWholesalePriceInfo() {
    const url = this.base_url + "gold_melted_wholesale/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldMeltedWholesaleHistoryInfo() {
    const url = this.history_base_url + "gold_melted_wholesale";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGoldMeltedUnderKiloPriceInfo() {
    const url = this.base_url + "gold_world_futures/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldMeltedUnderKiloHistoryInfo() {
    const url = this.history_base_url + "gold_world_futures";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGoldGc3PriceInfo() {
    const url = this.base_url + "gc3/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc3HistoryInfo() {
    const url = this.history_base_url + "gc3";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGoldGc1PriceInfo() {
    const url = this.base_url + "gc1/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc1HistoryInfo() {
    const url = this.history_base_url + "gc1";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGoldGc11PriceInfo() {
    const url = this.base_url + "gc11/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc11HistoryInfo() {
    const url = this.history_base_url + "gc11";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGoldGc10PriceInfo() {
    const url = this.base_url + "gc10/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc10HistoryInfo() {
    const url = this.history_base_url + "gc10";
    return this.http.get<ChartData>(url)
  }
  
  
  
  
  



  
  getGoldGc22PriceInfo() {
    const url = this.base_url + "gc22/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc22HistoryInfo() {
    const url = this.history_base_url + "gc22";
    return this.http.get<ChartData>(url)
  }
  

  
  
  



  
  getGoldGc21PriceInfo() {
    const url = this.base_url + "gc21/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc21HistoryInfo() {
    const url = this.history_base_url + "gc21";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGoldGc20PriceInfo() {
    const url = this.base_url + "gc20/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc20HistoryInfo() {
    const url = this.history_base_url + "gc20";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGoldGc12PriceInfo() {
    const url = this.base_url + "gc12/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc12HistoryInfo() {
    const url = this.history_base_url + "gc12";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGoldGc34PriceInfo() {
    const url = this.base_url + "gc34/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc34HistoryInfo() {
    const url = this.history_base_url + "gc34";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGoldGc35PriceInfo() {
    const url = this.base_url + "gc35/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc35HistoryInfo() {
    const url = this.history_base_url + "gc35";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGoldGc36PriceInfo() {
    const url = this.base_url + "gc36/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc36HistoryInfo() {
    const url = this.history_base_url + "gc36";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGoldGc37PriceInfo() {
    const url = this.base_url + "gc37/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc37HistoryInfo() {
    const url = this.history_base_url + "gc37";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGoldGc38PriceInfo() {
    const url = this.base_url + "gc38/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc38HistoryInfo() {
    const url = this.history_base_url + "gc38";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGoldGc39PriceInfo() {
    const url = this.base_url + "gc39/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc39HistoryInfo() {
    const url = this.history_base_url + "gc39";
    return this.http.get<ChartData>(url)
  }

  



  
  getGoldGc67PriceInfo() {
    const url = this.base_url + "gc67/latest.json";
    return this.http.get<Price>(url)
  }

  getGoldGc67HistoryInfo() {
    const url = this.history_base_url + "gc67";
    return this.http.get<ChartData>(url)
  }

  //#endregion


  //#region Coin
  getImamiCoinPriceInfo() {
    const url = this.base_url + "sekee/latest.json";
    return this.http.get<Price>(url)
  }

  getImamiCoinHistoryInfo() {
    const url = this.history_base_url + "sekee";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getBaharCoinPriceInfo() {
    const url = this.base_url + "sekeb/latest.json";
    return this.http.get<Price>(url)
  }

  getBaharCoinHistoryInfo() {
    const url = this.history_base_url + "sekeb";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getHalfCoinPriceInfo() {
    const url = this.base_url + "nim/latest.json";
    return this.http.get<Price>(url)
  }

  getHalfCoinHistoryInfo() {
    const url = this.history_base_url + "nim";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getQuarterCoinPriceInfo() {
    const url = this.base_url + "rob/latest.json";
    return this.http.get<Price>(url)
  }

  getQuarterCoinHistoryInfo() {
    const url = this.history_base_url + "rob";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGramCoinPriceInfo() {
    const url = this.base_url + "gerami/latest.json";
    return this.http.get<Price>(url)
  }

  getGramCoinHistoryInfo() {
    const url = this.history_base_url + "gerami";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getRetailImamiCoinPriceInfo() {
    const url = this.base_url + "retail_sekee/latest.json";
    return this.http.get<Price>(url)
  }

  getRetailImamiCoinHistoryInfo() {
    const url = this.history_base_url + "retail_sekee";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getRetailBaharCoinPriceInfo() {
    const url = this.base_url + "retail_sekeb/latest.json";
    return this.http.get<Price>(url)
  }

  getRetailBaharCoinHistoryInfo() {
    const url = this.history_base_url + "retail_sekeb";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getRetailHalfCoinPriceInfo() {
    const url = this.base_url + "retail_nim/latest.json";
    return this.http.get<Price>(url)
  }

  getRetailHalfCoinHistoryInfo() {
    const url = this.history_base_url + "retail_nim";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getRetailQuarterCoinPriceInfo() {
    const url = this.base_url + "retail_rob/latest.json";
    return this.http.get<Price>(url)
  }

  getRetailQuarterCoinHistoryInfo() {
    const url = this.history_base_url + "retail_rob";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getRetailGramCoinPriceInfo() {
    const url = this.base_url + "retail_gerami/latest.json";
    return this.http.get<Price>(url)
  }

  getRetailGramCoinHistoryInfo() {
    const url = this.history_base_url + "retail_gerami";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGc19CoinPriceInfo() {
    const url = this.base_url + "gc19/latest.json";
    return this.http.get<Price>(url)
  }

  getGc19CoinHistoryInfo() {
    const url = this.history_base_url + "gc19";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGc14CoinPriceInfo() {
    const url = this.base_url + "gc14/latest.json";
    return this.http.get<Price>(url)
  }

  getGc14CoinHistoryInfo() {
    const url = this.history_base_url + "gc14";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGc15CoinPriceInfo() {
    const url = this.base_url + "gc15/latest.json";
    return this.http.get<Price>(url)
  }

  getGc15CoinHistoryInfo() {
    const url = this.history_base_url + "gc15";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGc18CoinPriceInfo() {
    const url = this.base_url + "gc18/latest.json";
    return this.http.get<Price>(url)
  }

  getGc18CoinHistoryInfo() {
    const url = this.history_base_url + "gc18";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGc17CoinPriceInfo() {
    const url = this.base_url + "gc17/latest.json";
    return this.http.get<Price>(url)
  }

  getGc17CoinHistoryInfo() {
    const url = this.history_base_url + "gc17";
    return this.http.get<ChartData>(url)
  }







  
  getGc16CoinPriceInfo() {
    const url = this.base_url + "gc16/latest.json";
    return this.http.get<Price>(url)
  }

  getGc16CoinHistoryInfo() {
    const url = this.history_base_url + "gc16";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getSekeeDownCoinPriceInfo() {
    const url = this.base_url + "sekee_down/latest.json";
    return this.http.get<Price>(url)
  }

  getSekeeDownCoinHistoryInfo() {
    const url = this.history_base_url + "sekee_down";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getNimDownCoinPriceInfo() {
    const url = this.base_url + "nim_down/latest.json";
    return this.http.get<Price>(url)
  }

  getNimDownCoinHistoryInfo() {
    const url = this.history_base_url + "nim_down";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getRobDownCoinPriceInfo() {
    const url = this.base_url + "rob_down/latest.json";
    return this.http.get<Price>(url)
  }

  getRobDownCoinHistoryInfo() {
    const url = this.history_base_url + "rob_down";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCoinBlubberPriceInfo() {
    const url = this.base_url + "coin_blubber/latest.json";
    return this.http.get<Price>(url)
  }

  getCoinBlubberHistoryInfo() {
    const url = this.history_base_url + "coin_blubber";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getBaharCoinBlubberPriceInfo() {
    const url = this.base_url + "sekeb_blubber/latest.json";
    return this.http.get<Price>(url)
  }

  getBaharCoinBlubberHistoryInfo() {
    const url = this.history_base_url + "sekeb_blubber";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getHalfCoinBlubberPriceInfo() {
    const url = this.base_url + "nim_blubber/latest.json";
    return this.http.get<Price>(url)
  }

  getHalfCoinBlubberHistoryInfo() {
    const url = this.history_base_url + "nim_blubber";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getQuarterCoinBlubberPriceInfo() {
    const url = this.base_url + "rob_blubber/latest.json";
    return this.http.get<Price>(url)
  }

  getQuarterCoinBlubberHistoryInfo() {
    const url = this.history_base_url + "rob_blubber";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getTrueValueOfCoinPriceInfo() {
    const url = this.base_url + "sekee_real/latest.json";
    return this.http.get<Price>(url)
  }

  getTrueValueOfCoinHistoryInfo() {
    const url = this.history_base_url + "sekee_real";
    return this.http.get<ChartData>(url)
  }

  //#endregion

  //#region World Markets
  getEurUsdAskPriceInfo() {
    const url = this.base_url + "eur-usd-ask/latest.json";
    return this.http.get<Price>(url)
  }

  getEurUsdAskHistoryInfo() {
    const url = this.history_base_url + "eur-usd-ask";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGbpUsdAskPriceInfo() {
    const url = this.base_url + "gbp-usd-ask/latest.json";
    return this.http.get<Price>(url)
  }

  getGbpUsdAskHistoryInfo() {
    const url = this.history_base_url + "gbp-usd-ask";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getUsdJpyAskPriceInfo() {
    const url = this.base_url + "usd-jpy-ask/latest.json";
    return this.http.get<Price>(url)
  }

  getUsdJpyAskHistoryInfo() {
    const url = this.history_base_url + "usd-jpy-ask";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getUsdChfAskPriceInfo() {
    const url = this.base_url + "usd-chf-ask/latest.json";
    return this.http.get<Price>(url)
  }

  getUsdChfAskHistoryInfo() {
    const url = this.history_base_url + "usd-chf-ask";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getAudUsdAskPriceInfo() {
    const url = this.base_url + "aud-usd-ask/latest.json";
    return this.http.get<Price>(url)
  }

  getAudUsdAskHistoryInfo() {
    const url = this.history_base_url + "aud-usd-ask";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getUsdCadAskPriceInfo() {
    const url = this.base_url + "usd-cad-ask/latest.json";
    return this.http.get<Price>(url)
  }

  getUsdCadAskHistoryInfo() {
    const url = this.history_base_url + "usd-cad-ask";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getUsdNzdAskPriceInfo() {
    const url = this.base_url + "usd-nzd-ask/latest.json";
    return this.http.get<Price>(url)
  }

  getUsdNzdAskHistoryInfo() {
    const url = this.history_base_url + "usd-nzd-ask";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getUsdTryAskPriceInfo() {
    const url = this.base_url + "usd-try-ask/latest.json";
    return this.http.get<Price>(url)
  }

  getUsdTryAskHistoryInfo() {
    const url = this.history_base_url + "usd-try-ask";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getUsdSekAskPriceInfo() {
    const url = this.base_url + "usd-sek-ask/latest.json";
    return this.http.get<Price>(url)
  }

  getUsdSekAskHistoryInfo() {
    const url = this.history_base_url + "usd-sek-ask";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getUsdSarAskPriceInfo() {
    const url = this.base_url + "usd-sar-ask/latest.json";
    return this.http.get<Price>(url)
  }

  getUsdSarAskHistoryInfo() {
    const url = this.history_base_url + "usd-sar-ask";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getUsdKrwAskPriceInfo() {
    const url = this.base_url + "usd-krw-ask/latest.json";
    return this.http.get<Price>(url)
  }

  getUsdKrwAskHistoryInfo() {
    const url = this.history_base_url + "usd-krw-ask";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getUsdCnyAskPriceInfo() {
    const url = this.base_url + "usd-cny-ask/latest.json";
    return this.http.get<Price>(url)
  }

  getUsdCnyAskHistoryInfo() {
    const url = this.history_base_url + "usd-cny-ask";
    return this.http.get<ChartData>(url)
  }

  //#endregion


  //#region Precious Metals
  getGlobalGoldOnsPriceInfo() {
    const url = this.base_url + "ons/latest.json";
    return this.http.get<Price>(url)
  }

  getGlobalGoldOnsHistoryInfo() {
    const url = this.history_base_url + "ons";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGlobalSilverOnsPriceInfo() {
    const url = this.base_url + "silver/latest.json";
    return this.http.get<Price>(url)
  }

  getGlobalSilverOnsHistoryInfo() {
    const url = this.history_base_url + "silver";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGlobalPlatinumOnsPriceInfo() {
    const url = this.base_url + "platinum/latest.json";
    return this.http.get<Price>(url)
  }

  getGlobalPlatinumOnsHistoryInfo() {
    const url = this.history_base_url + "platinum";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGlobalPalladiumOnsPriceInfo() {
    const url = this.base_url + "palladium/latest.json";
    return this.http.get<Price>(url)
  }

  getGlobalPalladiumOnsHistoryInfo() {
    const url = this.history_base_url + "palladium";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGlobalRatioSilverPriceInfo() {
    const url = this.base_url + "ratio_silver/latest.json";
    return this.http.get<Price>(url)
  }

  getGlobalRatioSilverHistoryInfo() {
    const url = this.history_base_url + "ratio_silver";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGlobalRatioPlatinumPriceInfo() {
    const url = this.base_url + "ratio_platinum/latest.json";
    return this.http.get<Price>(url)
  }

  getGlobalRatioPlatinumHistoryInfo() {
    const url = this.history_base_url + "ratio_platinum";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGlobalRatioPalladiumPriceInfo() {
    const url = this.base_url + "ratio_palladium/latest.json";
    return this.http.get<Price>(url)
  }

  getGlobalRatioPalladiumHistoryInfo() {
    const url = this.history_base_url + "ratio_palladium";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGlobalRatioCrudeoilPriceInfo() {
    const url = this.base_url + "ratio_crudeoil/latest.json";
    return this.http.get<Price>(url)
  }

  getGlobalRatioCrudeoilHistoryInfo() {
    const url = this.history_base_url + "ratio_crudeoil";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGlobalRatioDowJonesPriceInfo() {
    const url = this.base_url + "ratio_dija/latest.json";
    return this.http.get<Price>(url)
  }

  getGlobalRatioDowJonesHistoryInfo() {
    const url = this.history_base_url + "ratio_dija";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGlobalRatioSP500PriceInfo() {
    const url = this.base_url + "ratio_sp500/latest.json";
    return this.http.get<Price>(url)
  }

  getGlobalRatioSP500HistoryInfo() {
    const url = this.history_base_url + "ratio_sp500";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getGlobalRatioHUIPriceInfo() {
    const url = this.base_url + "ratio_hui/latest.json";
    return this.http.get<Price>(url)
  }

  getGlobalRatioHUIHistoryInfo() {
    const url = this.history_base_url + "ratio_hui";
    return this.http.get<ChartData>(url)
  }

  //#endregion

  //#region Base Metals
  getBaseGlobalUSCopperPriceInfo() {
    const url = this.base_url + "base_global_copper2/latest.json";
    return this.http.get<Price>(url)
  }

  getBaseGlobalUSCopperHistoryInfo() {
    const url = this.history_base_url + "base_global_copper2";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getBaseGlobalTinPriceInfo() {
    const url = this.base_url + "base_global_tin/latest.json";
    return this.http.get<Price>(url)
  }

  getBaseGlobalTinHistoryInfo() {
    const url = this.history_base_url + "base_global_tin";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getBaseGlobalGBCopperPriceInfo() {
    const url = this.base_url + "base_global_copper/latest.json";
    return this.http.get<Price>(url)
  }

  getBaseGlobalGBCopperHistoryInfo() {
    const url = this.history_base_url + "base_global_copper";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getBaseGlobalNickelPriceInfo() {
    const url = this.base_url + "base_global_nickel/latest.json";
    return this.http.get<Price>(url)
  }

  getBaseGlobalNickelHistoryInfo() {
    const url = this.history_base_url + "base_global_nickel";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getBaseGlobalLeadPriceInfo() {
    const url = this.base_url + "base_global_lead/latest.json";
    return this.http.get<Price>(url)
  }

  getBaseGlobalLeadHistoryInfo() {
    const url = this.history_base_url + "base_global_lead";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getBaseGlobalZincPriceInfo() {
    const url = this.base_url + "base_global_zinc/latest.json";
    return this.http.get<Price>(url)
  }

  getBaseGlobalZincHistoryInfo() {
    const url = this.history_base_url + "base_global_zinc";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getBaseAluminumPriceInfo() {
    const url = this.base_url + "base-us-aluminum/latest.json";
    return this.http.get<Price>(url)
  }

  getBaseAluminumHistoryInfo() {
    const url = this.history_base_url + "base-us-aluminum";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getBaseUraniumPriceInfo() {
    const url = this.base_url + "base-us-uranium/latest.json";
    return this.http.get<Price>(url)
  }

  getBaseUraniumHistoryInfo() {
    const url = this.history_base_url + "base-us-uranium";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getBaseSteelCoilPriceInfo() {
    const url = this.base_url + "base-us-steel-coil/latest.json";
    return this.http.get<Price>(url)
  }

  getBaseSteelCoilHistoryInfo() {
    const url = this.history_base_url + "base-us-steel-coil";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getBaseIronOrePriceInfo() {
    const url = this.base_url + "base-us-iron-ore/latest.json";
    return this.http.get<Price>(url)
  }

  getBaseIronOreHistoryInfo() {
    const url = this.history_base_url + "base-us-iron-ore";
    return this.http.get<ChartData>(url)
  }

  //#endregion


  //#region Commodity Market
  getCommodityLondonWheatPriceInfo() {
    const url = this.base_url + "commodity_london_wheat/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityLondonWheatHistoryInfo() {
    const url = this.history_base_url + "commodity_london_wheat";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCommodityUSWheatPriceInfo() {
    const url = this.base_url + "commodity_us_wheat/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityUSWheatHistoryInfo() {
    const url = this.history_base_url + "commodity_us_wheat";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCommodityRoughRicePriceInfo() {
    const url = this.base_url + "commodity_rough_rice/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityRoughRiceHistoryInfo() {
    const url = this.history_base_url + "commodity_rough_rice";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCommodityOatsPriceInfo() {
    const url = this.base_url + "commodity_oats/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityOatsHistoryInfo() {
    const url = this.history_base_url + "commodity_oats";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCommodityCornPriceInfo() {
    const url = this.base_url + "commodity_us_corn/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityCornHistoryInfo() {
    const url = this.history_base_url + "commodity_us_corn";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCommoditySoybeansPriceInfo() {
    const url = this.base_url + "commodity_us_soybeans/latest.json";
    return this.http.get<Price>(url)
  }

  getCommoditySoybeansHistoryInfo() {
    const url = this.history_base_url + "commodity_us_soybeans";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCommoditySoybeanOilPriceInfo() {
    const url = this.base_url + "commodity_us_soybean_oil/latest.json";
    return this.http.get<Price>(url)
  }

  getCommoditySoybeanOilHistoryInfo() {
    const url = this.history_base_url + "commodity_us_soybean_oil";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCommoditySoybeanMealPriceInfo() {
    const url = this.base_url + "commodity_us_soybean_meal/latest.json";
    return this.http.get<Price>(url)
  }

  getCommoditySoybeanMealHistoryInfo() {
    const url = this.history_base_url + "commodity_us_soybean_meal";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCommodityUSSugarPriceInfo() {
    const url = this.base_url + "commodity_us_sugar_no11/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityUSSugarHistoryInfo() {
    const url = this.history_base_url + "commodity_us_sugar_no11";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCommodityLondonSugarPriceInfo() {
    const url = this.base_url + "commodity_london_sugar/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityLondonSugarHistoryInfo() {
    const url = this.history_base_url + "commodity_london_sugar";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCommodityCottonPriceInfo() {
    const url = this.base_url + "commodity_us_cotton_no_2/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityCottonHistoryInfo() {
    const url = this.history_base_url + "commodity_us_cotton_no_2";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCommodityUSCoffeePriceInfo() {
    const url = this.base_url + "commodity_us_coffee_c/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityUSCoffeeHistoryInfo() {
    const url = this.history_base_url + "commodity_us_coffee_c";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCommodityLondonCoffeePriceInfo() {
    const url = this.base_url + "commodity_london_coffee/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityLondonCoffeeHistoryInfo() {
    const url = this.history_base_url + "commodity_london_coffee";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCommodityUSCocoaPriceInfo() {
    const url = this.base_url + "commodity_us_cocoa/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityUSCocoaHistoryInfo() {
    const url = this.history_base_url + "commodity_us_cocoa";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCommodityLondonCocoaPriceInfo() {
    const url = this.base_url + "commodity_london_cocoa/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityLondonCocoaHistoryInfo() {
    const url = this.history_base_url + "commodity_london_cocoa";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCommodityLumberPriceInfo() {
    const url = this.base_url + "commodity_lumber/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityLumberHistoryInfo() {
    const url = this.history_base_url + "commodity_lumber";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCommodityOrangeJuicePriceInfo() {
    const url = this.base_url + "commodity_orange_juice/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityOrangeJuiceHistoryInfo() {
    const url = this.history_base_url + "commodity_orange_juice";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCommodityLiveCattlePriceInfo() {
    const url = this.base_url + "commodity_live_cattle/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityLiveCattleHistoryInfo() {
    const url = this.history_base_url + "commodity_live_cattle";
    return this.http.get<ChartData>(url)
  }
  
  
  

  
  
  



  
  getCommodityFeedCattlePriceInfo() {
    const url = this.base_url + "commodity_feed_cattle/latest.json";
    return this.http.get<Price>(url)
  }

  getCommodityFeedCattleHistoryInfo() {
    const url = this.history_base_url + "commodity_feed_cattle";
    return this.http.get<ChartData>(url)
  }

  //#endregion



}
